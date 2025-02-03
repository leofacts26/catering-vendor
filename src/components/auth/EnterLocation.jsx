import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { api, BASE_URL } from '../../api/apiConfig';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../../utils';

const options = {
    enableHighAccuracy: true,
    timeout: 10000,
};

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

const EnterLocation = () => {

    const [loading, setLoading] = useState(false)
    const { accessToken } = useSelector((state) => state.user)

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

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
                    // formatted_address: response.data.results[0].formatted_address,
                    formatted_address: [
                        getAddressComponent(addressComponents, 'administrative_area_level_3'),
                        response.data.results[0].formatted_address
                    ].filter(Boolean).join(", "),
                    place_id: response.data.results[0].place_id,
                };
                handleSubmit(addressData);
            } else {
                console.log("No suitable address found");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const errorCallback = (error) => {
        console.log(error);
    };

    const getAddressComponent = (addressComponents, type) => {
        const component = addressComponents.find(component => component.types.includes(type));
        return component ? component.long_name : '';
    };


    const getCurrentLocation = () => {
        const id = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
        navigator.geolocation.clearWatch(id);
    };

    const handleSubmit = async (addressData) => {
        const data = {
            street_name: addressData?.street_name || addressData?.area || "",
            // area: addressData?.area || "",
            area: addressData?.address,
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


    return (
        <>
            <Container maxWidth="lg">
                <div className='mt-3 bg-primary'>
                    <h1 className='ct-heading'>catering Service</h1>
                </div>
                <Grid container spacing={2} className='box-negative'>
                    <Grid item xs={12} sm={6.5} md={4.5} lg={4.5}>
                        <div className="ct-box ct-box-padding">
                            <div className="px-4">
                                <h4 className='ct-box-loc-title mb-2'>Whats's your location?</h4>
                                <p className='ct-box-loc-desc'>Could you please share your company location to receive personalized promotions</p>
                                <img style={{ width: '300px' }} src="/img/allowlocation.jpg" alt="" className="img-fluid mx-auto" />

                                <Stack direction="column">
                                    <>
                                        <Button variant="contained" className='ct-box-allow-location' onClick={() => getCurrentLocation()}>
                                            {loading ? 'Loading...' : 'Allow Location Access'}
                                        </Button>
                                        <div style={{ width: '100%', textAlign: 'center' }}>
                                            <Link to="/enter-location-manually" className="text-decoration-none text-center">
                                                <Button variant="contained" className='ct-box-loc'>Enter Location Manually</Button>
                                            </Link>
                                        </div>
                                    </>
                                </Stack>

                                <KeyboardArrowLeftIcon style={{ color: '#57636c', marginTop: '30px', cursor: 'pointer' }} onClick={handleBack} />


                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default EnterLocation