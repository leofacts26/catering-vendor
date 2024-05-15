import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useEffect, useRef, useState } from 'react';
import LoaderSpinner from '../LoaderSpinner';
import { api, BASE_URL } from '../../api/apiConfig';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { DATA_VALIDATION_ERROR, datavalidationerror, successToast } from '../../utils';
import axios from 'axios';
import MyLocationIcon from '@mui/icons-material/MyLocation';


const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #F0F1F3',
            borderRadius: '99px'
        },
        '&:hover fieldset': {
            border: '2px solid #F0F1F3',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #c33332',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '12px',
        padding: '15px 20px',
    },
}));

const initialState = {
    street_name: '',
    area: '',
    pincode: '',
    latitude: '',
    longitude: '',
    address: '',
    city: '',
    state: '',
    country: '',
    formatted_address: '',
    place_id: '',
}

// CL 
const options = {
    enableHighAccuracy: true,
    timeout: 10000,
};

const EnterLocationManually = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const [locationValues, setLocationValues] = useState(initialState)
    const [locationPlaceId, setLocationPlaceId] = useState(null)
    const [manualLocation, setManualLocation] = useState("")
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(false)
    const { accessToken } = useSelector((state) => state.user)
    const inputElement = useRef();

    useEffect(() => {
        inputElement.current.focus()
    }, [])


    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.REACT_APP_GOOGLE,
        options: {
            componentRestrictions: { country: 'in' }
        }
    });

    useEffect(() => {
        if (placePredictions.length)
            placesService?.getDetails(
                {
                    placeId: locationPlaceId,
                },
                (placeDetails) => savePlaceDetailsToState(placeDetails)
            );
    }, [placePredictions, locationPlaceId]);


    const savePlaceDetailsToState = (places) => {
        const { formatted_address, name } = places;
        const { address_components } = places;

        const country = address_components?.find(c => c?.types?.includes('country')) || {};
        const state = address_components?.find(c => c?.types?.includes('administrative_area_level_1')) || {};
        // const city = address_components?.find(c => c?.types?.includes('administrative_area_level_3')) || {};
        const city = address_components?.find(c => c?.types?.includes('locality')) || {};
        const pincode = address_components?.find(c => c?.types?.includes('postal_code')) || {};
        const area = address_components?.find(c => c?.types?.includes('locality')) || {};
        const street_name = address_components?.find(c => c?.types?.includes('locality')) || {};

        const { geometry: { location } } = places;
        const { lat, lng } = location;

        setLocationValues({
            ...locationValues,
            street_name: street_name  || "",
            area: area,
            pincode: pincode?.long_name,
            latitude: lat(),
            longitude: lng(),
            address: name,
            city: city,
            state: state,
            country: country,
            formatted_address: formatted_address,
            place_id: places?.place_id
        })
    }


    const selectLocation = (item) => {
        setSelectedLocation(item);
        setManualLocation(item.description);
        setLocationPlaceId(item?.place_id)
    }

    // CL 
    const getAddressComponent = (addressComponents, type) => {
        const component = addressComponents.find(component => component.types.includes(type));
        return component ? component.long_name : '';
    };

    // CL 
    const successCallback = async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE}`);
            const results = response.data.results;
            let maxAddressComponentsLength = -1;
            let selectedAddress = null;

            results.forEach(result => {
                const addressComponentsLength = result.address_components.length;
                if (addressComponentsLength > maxAddressComponentsLength) {
                    maxAddressComponentsLength = addressComponentsLength;
                    selectedAddress = result;
                }
            });

            if (selectedAddress) {
                const addressComponents = selectedAddress.address_components;
                const addressData = {
                    street_name: getAddressComponent(addressComponents, 'route'),
                    area: getAddressComponent(addressComponents, 'sublocality_level_1'),
                    pincode: getAddressComponent(addressComponents, 'postal_code'),
                    latitude: latitude,
                    longitude: longitude,
                    address: getAddressComponent(addressComponents, 'administrative_area_level_3'),
                    city: getAddressComponent(addressComponents, 'locality'),
                    state: getAddressComponent(addressComponents, 'administrative_area_level_1'),
                    country: getAddressComponent(addressComponents, 'country'),
                    formatted_address: response.data.results[0].formatted_address,
                    place_id: response.data.results[0].place_id,
                };
                handleCurrentLocationSubmit(addressData);
            } else {
                console.log("No suitable address found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // CL 
    const errorCallback = (error) => {
        console.log(error);
    };


    // CL 
    const getCurrentLocation = () => {
        const id = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
        navigator.geolocation.clearWatch(id);
    };

    // CL 
    const handleCurrentLocationSubmit = async (addressData) => {
        const data = {
            street_name: addressData?.street_name || addressData?.area || "",
            area: addressData?.area || "",
            pincode: addressData?.pincode || "",
            latitude: addressData?.latitude || "",
            longitude: addressData?.longitude || "",
            address: addressData?.address || "",
            city: addressData?.city || "",
            state: addressData?.state || "",
            country: addressData?.country || "",
            formatted_address: addressData?.formatted_address || "",
            place_id: addressData?.place_id || ''
        }
        setLoading(true)
        try {
            const response = await api.post(`${BASE_URL}/update-vendor-location`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            toast.success(successToast(response))
            navigate('/profile-steps')
        } catch (error) {
            console.log(error, "error");
            toast.error(datavalidationerror(error))
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            street_name: locationValues?.street_name?.long_name || "",
            area: locationValues?.area?.long_name || "",
            pincode: locationValues?.pincode || "",
            latitude: locationValues?.latitude || "",
            longitude: locationValues?.longitude || "",
            address: locationValues?.address || "",
            city: locationValues?.city?.long_name || "",
            state: locationValues?.state?.long_name || "",
            country: locationValues?.country?.long_name || "",
            formatted_address: locationValues?.formatted_address || "",
            place_id: locationValues?.place_id || ''
        }
        setLoading(true)
        try {
            const response = await api.post(`${BASE_URL}/update-vendor-location`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            toast.success(successToast(response))
            navigate('/profile-steps')
        } catch (error) {
            console.log(error, "error");
            toast.error(datavalidationerror(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Container maxWidth="lg">
                <div className='mt-3 bg-primary'>
                    <h1 className='ct-heading'>catering Service</h1>
                </div>
                <Grid container spacing={2} className='box-negative'>
                    <Grid item xs={12} sm={6.5} md={4.5} lg={4.5}>
                        <form onSubmit={handleSubmit}>
                            <div className="ct-box ct-box-padding">
                                <div className="px-4">
                                    <h4 className='ct-box-loc-title'>Enter your area or address</h4>

                                    <CssTextField
                                        inputRef={inputElement}
                                        required
                                        onChange={(evt) => {
                                            setSelectedLocation(null);
                                            setManualLocation(evt.target.value);
                                            getPlacePredictions({ input: evt.target.value });
                                        }}
                                        value={manualLocation}
                                        loading={isPlacePredictionsLoading}
                                        id="outlined-number"
                                        variant="outlined"
                                        label="Try A2B, Mg road, Bangalore, etc."
                                        className='mt-3 mb-2'
                                        style={{ width: '100%' }}
                                        InputLabelProps={{
                                            style: { color: '#777777', fontSize: '12px' },
                                        }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '8px',
                                                backgroundColor: '#FFFFFF',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end" style={{ color: '#00000' }}>
                                                    <SearchIcon style={{ fontSize: '16px' }} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                    <Button variant="contained" className='ct-box-btn-current-loc' disabled={loading} onClick={() => getCurrentLocation()}>
                                        <MyLocationIcon style={{ marginRight: '5px', fontSize: '15px' }} /> {loading ? 'Loading...' : `Use my current location`}
                                    </Button>

                                    <div className='mb-3' style={{ marginTop: '20px', borderTop: '2px solid #c33332' }}>
                                        <Divider />
                                    </div>

                                    {placePredictions.length > 0 && <p className='ct-box-search-loc mb-1'>Search Results</p>}

                                    {isPlacePredictionsLoading ? (
                                        <LoaderSpinner />
                                    ) : (
                                        selectedLocation ? (
                                            <h2 className='ct-box-search-results' onClick={() => setSelectedLocation(null)}>{selectedLocation.description}</h2>
                                        ) : (
                                            placePredictions?.map((item, index) => (
                                                <>
                                                    <h2 className='ct-box-search-results' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                                                    <hr className='mt-1 mb-0' />
                                                </>
                                            ))
                                        )
                                    )}

                                    <Stack direction="column" className='mt-4'>
                                        <Button type='submit' variant="contained" className='ct-box-btn-catering' disabled={loading}> {loading ? 'Loading...' : 'Next'}</Button>
                                    </Stack>



                                </div>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default EnterLocationManually