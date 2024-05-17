import React, { useEffect, useRef, useState } from 'react'
import TopHeader from '../components/global/TopHeader'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import InputAdornment from '@mui/material/InputAdornment';
// import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import BranchesCard from '../components/global/BranchesCard';
import { api, BASE_URL } from '../api/apiConfig';
import { useSelector } from 'react-redux';
import { InputAdornment } from '@mui/material';
import LoaderSpinner from '../components/LoaderSpinner';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../utils';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #e0e3e7',
    },
    '&:hover fieldset': {
      border: '2px solid #e0e3e7',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #a81e1e',
    },
  },
  '& input': {
    border: 'none',
    fontSize: '16px',
    padding: '12px 20px',
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
  // map_location_link: '',
  place_id: '',
}

const initialStateBranchState = {
  catering_service_name: '',
  point_of_contact_name: '',
  phone_number: '',
}


const Branches = () => {
  const { accessToken } = useSelector((state) => state.user);
  const [branchesList, setBranchesList] = useState([])
  const [locationPlaceId, setLocationPlaceId] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [locationValues, setLocationValues] = useState(initialState)
  const [values, setValues] = useState(initialStateBranchState)
  const [manualLocation, setManualLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editId, setEditId] = useState(null)

  // console.log(manualLocation, "manualLocation");
  // console.log(selectedLocation, "selectedLocation");

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

  // console.log(placePredictions, "placePredictions placePredictions");

  useEffect(() => {
    if (locationPlaceId && placePredictions.length)
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

    console.log(address_components, "address_components");

    const country = address_components?.find(c => c?.types?.includes('country')) || {};
    const state = address_components?.find(c => c?.types?.includes('administrative_area_level_1')) || {};
    const city = address_components?.find(c => c?.types?.includes('locality')) || {};
    const pincode = address_components?.find(c => c?.types?.includes('postal_code')) || {};
    const area = address_components?.find(c => c?.types?.includes('locality')) || {};
    const street_name = address_components?.find(c => c?.types?.includes('locality')) || {};

    const { geometry: { location } } = places;
    const { lat, lng } = location;

    setLocationValues({
      ...locationValues,
      street_name: street_name?.long_name,
      area: area?.long_name,
      pincode: pincode?.long_name,
      latitude: lat(),
      longitude: lng(),
      address: name,
      city: city?.long_name,
      state: state?.long_name,
      country: country?.long_name,
      formatted_address: formatted_address,
      // map_location_link: formatted_address,
      place_id: places?.place_id
    })
  }

  const selectLocation = (item) => {
    setSelectedLocation(item);
    setManualLocation(item.description);
    setLocationPlaceId(item?.place_id)
  }



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValues(initialStateBranchState);
    setLocationValues(initialState);
    setManualLocation("")
    setEditId(null)
    setSelectedLocation(null)
    setLocationPlaceId(null)
    getPlacePredictions("")
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  const handleToggleStatus = async (branch) => {
    // const newStatus = branch.status ? 1 : 0;
    const newStatus = branch.status === "1" ? 0 : 1;
    const data = {
      branch_id: branch.id,
      status: newStatus
    }
    try {
      const response = await api.post(`${BASE_URL}/update-vendor-branch-status`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      fetchBranches()
      toast.success(successToast(response))
    } catch (error) {
      console.log(error);
      toast.error(datavalidationerror(error))
    }
  }


  const fetchBranches = async () => {
    setLoading(true)
    try {
      const response = await api.get(`${BASE_URL}/get-vendor-branches`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      setBranchesList(response?.data?.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  const onHandleEdit = (item) => {
    setEditId(item.id)

    setValues({
      catering_service_name: item?.catering_service_name || '',
      point_of_contact_name: item?.point_of_contact_name || '',
      phone_number: item?.phone_number || '',
    })

    setLocationValues({
      street_name: item?.street_name || "",
      area: item?.area || "",
      pincode: item?.pincode || "",
      latitude: item?.latitude || "",
      longitude: item?.longitude || "",
      address: item?.address || "",
      city: item?.city || "",
      state: item?.state || "",
      country: item?.country || "India",
      formatted_address: item?.formatted_address || "",
      // map_location_link: item?.formatted_address || "",
      place_id: item?.place_id || "",
    })

    setManualLocation(item?.formatted_address)
    handleClickOpen()
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    handleClickOpen()
    setLoading(true)

    const { catering_service_name, point_of_contact_name, phone_number } = values;

    const data = {
      catering_service_name: catering_service_name,
      point_of_contact_name: point_of_contact_name,
      phone_number: phone_number ? `+91-${phone_number}` : '',
      country: locationValues?.country || "",
      state: locationValues?.state || "",
      latitude: locationValues?.latitude || "",
      longitude: locationValues?.longitude || "",
      street_name: locationValues?.street_name || "",
      formatted_address: locationValues?.formatted_address || "",
      // map_location_link: locationValues?.formatted_address || "",
      city: locationValues?.city || "",
      pincode: locationValues?.pincode || "",
      place_id: locationValues?.place_id || '',
      // branch_type: 'BRANCH'
    }

    const updateData = {
      ...values,
      ...locationValues,
      branch_id: parseInt(editId)
    }
    // console.log(updateData, "updateData");

    try {
      if (editId !== null) {
        const response = await api.post(`${BASE_URL}/update-vendor-branch`, updateData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        fetchBranches()
        handleClose()
        toast.success(successToast(response))
      } else {
        const response = await api.post(`${BASE_URL}/insert-vendor-branch`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        handleClose()
        toast.success(successToast(response))
        fetchBranches()
        setFormSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(datavalidationerror(error))
    } finally {
      setLoading(false)
    }
  }

  console.log(placePredictions, "placePredictions");

  return (
    <>
      <TopHeader title="Manage Your Branches" description="Manage your All business Branches here" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-5 py-4 mb-4'>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <p className='cuisines-title'>Sub Branches</p>
            <Button variant="contained" className="inquiries-btn" onClick={handleClickOpen}> + Add New Branch </Button>
          </Stack>
          <Divider
            className='mt-4'
            variant="middle"
            style={{
              backgroundColor: '#c33332',
              margin: '0px'
            }}
          />


          {
            loading ? (
              <LoaderSpinner />
            ) : (
              <Grid container spacing={2} className='mt-4'>
                {
                  branchesList.length > 0 ? (
                    branchesList.map((item) => {
                      return <BranchesCard branches={item} key={item?.id} onHandleEdit={onHandleEdit} handleToggleStatus={handleToggleStatus} />
                    })
                  ) : (
                    <p className='text-center' style={{ width: '100%' }}> No Branches Found </p>
                  )
                }
              </Grid>
            )
          }

        </div>
      </Container>



      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit} autocomplete="off">
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <h2 className='branches-modal-title'>Enter Your New Branches details</h2>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>


            <CssTextField
              required
              value={values?.catering_service_name}
              onChange={handlechange}
              name='catering_service_name'
              id="outlined-number"
              variant="outlined"
              label="Catering Service Name"
              className='mb-3'
              style={{ width: '100%' }}
              InputLabelProps={{
                style: { color: '#777777', fontSize: '10px' },
              }}
              InputProps={{
                style: {
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                }
              }}
            />

            <CssTextField
              required
              value={values?.point_of_contact_name}
              onChange={handlechange}
              name='point_of_contact_name'
              id="outlined-number"
              variant="outlined"
              label="Contact Person Name - Same as Main Branch"
              className='mb-3'
              style={{ width: '100%' }}
              InputLabelProps={{
                style: { color: '#777777', fontSize: '10px' },
              }}
              InputProps={{
                style: {
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                }
              }}
            />

            <CssTextField
              required
              value={values?.phone_number}
              onChange={handlechange}
              name='phone_number'
              id="outlined-number"
              variant="outlined"
              label="Phone Number"
              className='mb-3'
              style={{ width: '100%' }}
              InputLabelProps={{
                style: { color: '#777777', fontSize: '10px' },
              }}
              inputProps={{ maxLength: 10 }}
              InputProps={{
                style: {
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                }
              }}
            />

            <CssTextField
              autocomplete="false"
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


            {placePredictions.length > 0 && <p className='ct-box-search-loc mb-1'>Search Results</p>}

            {!formSubmitted && (
              <>
                {isPlacePredictionsLoading ? (
                  <LoaderSpinner />
                ) : (
                  selectedLocation ? (
                    <h2 className='ct-box-search-results' onClick={() => setSelectedLocation(null)}>{selectedLocation.description}</h2>
                  ) : (
                    placePredictions?.map((item, index) => (
                      <h2 className='ct-box-search-results' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                    ))
                  )
                )}
              </>
            )}


          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" className="inquiries-btn" type='submit'> {loading ? 'Loading...' : 'Submit'} </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>

    </>
  )
}

export default Branches
