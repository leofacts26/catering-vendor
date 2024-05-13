import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import useBusinessProfile from "../hooks/useBusinessProfile";
import { vendor_type } from "../constant";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { api, BASE_URL } from "../api/apiConfig";
import LoaderSpinner from "../components/LoaderSpinner";
import { useLocation } from "react-router-dom";
import { MenuItem, Select } from '@mui/material';


import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';


const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #F0F1F3',
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
    fontSize: '16px',
    padding: '10px 20px',
  },
}));

const formatPhoneNumber = (phoneNumber) => {

  let formatedNumber = "";
  if (phoneNumber.startsWith('+91-')) {
    formatedNumber += phoneNumber;
  } else {
    formatedNumber += '+91-' + phoneNumber;
  }
  console.log(formatedNumber, "formatedNumber");
  return formatedNumber

};


// const initialState = {
//   street_name: '',
//   area: '',
//   pincode: '',
//   latitude: '',
//   longitude: '',
//   address: '',
//   city: '',
//   state: '',
//   country: '',
//   formatted_address: '',
//   map_location_link: '',
//   place_id: '',
//   city_id: ''
// }

const BusinesssProfile = () => {
  const [values, setValues] = useState({})
  const { accessToken } = useSelector((state) => state.user)
  const { vendor_id } = useSelector((state) => state?.user?.vendorId)
  const [loading, setLoading] = useState(false)
  // const [date, setDate] = useState(null)
  const [data, updateBusinessProfile] = useBusinessProfile('/get-vendor-business-profile', accessToken)
  const [value, setValue] = useState([
    dayjs(''),
    dayjs(''),
  ]);
  const formattedValues = value?.map(date => date?.format('YYYY-MM-DD HH:mm:ss'));
  const working_days_hours_time = formattedValues?.join(' - ');


  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      vendor_service_name: data?.vendor_service_name,
      vendor_type: vendor_type,
      point_of_contact_name: data?.point_of_contact_name,
      working_days_hours: data?.working_days_hours,
      working_since: data?.working_since || "",
      about_description: data?.about_description,
      total_staffs_approx: data?.total_staffs_approx,
      business_email: data?.business_email,
      business_phone_number: data?.business_phone_number,
      landline_number: data?.landline_number,
      whatsapp_business_phone_number: data?.whatsapp_business_phone_number,
      website_link: data?.website_link,
      twitter_id: data?.twitter_id,
      instagram_link: data?.instagram_link,
      facebook_link: data?.facebook_link,

      city_id: data?.city_id,
      pincode: data?.pincode,
      latitude: data?.latitude,
      longitude: data?.longitude,
      area: data?.area,
      street_name: data?.street_name,
      country: data?.country,
      state: data?.state,
      formatted_address: data?.formatted_address,
      city: data?.city,
      place_id: data?.place_id,
    }));
  }, [data]);

  // validation schema 
  const schema = Yup.object().shape({
    vendor_service_name: Yup.string().required('Name is required.'),
    point_of_contact_name: Yup.string().required('contact person name is required.'),
    // working_days_hours: Yup.string().required('working days hours is required.'),
    total_staffs_approx: Yup.string().required('total staffs approx is required.'),
    about_description: Yup.string().required('about description is required.'),
    business_email: Yup.string().required('Business email is required.'),
    working_since: Yup.string()
      .matches(/^\d{4}$/, 'Year must be exactly 4 digits Eg: 2024')
      .required('Working since is required.'),
  });

  const handleSubmit = async (values, resetForm) => {
    console.log(values, "values");
    const formattedBusinessPhoneNumber = formatPhoneNumber(values.business_phone_number);
    const formattedwhatsapp_business_phone_number = values.whatsapp_business_phone_number ? formatPhoneNumber(values.whatsapp_business_phone_number) : '';

    try {
      setLoading(true);
      if (values.whatsapp_business_phone_number) {
        values.whatsapp_business_phone_number = formattedwhatsapp_business_phone_number;
      }
      if (values.business_phone_number) {
        values.business_phone_number = formattedBusinessPhoneNumber;
      }
      const data = {
        ...values,
        working_days_hours: working_days_hours_time
      }
      await updateBusinessProfile(data, vendor_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error while updating business profile:', error);
    }
  }

  // location start
  // const [locationValues, setLocationValues] = useState(initialState)
  const [locationPlaceId, setLocationPlaceId] = useState(null)
  const [manualLocation, setManualLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null);
  // location end 

  // console.log(locationPlaceId, "locationPlaceId");
  // console.log(selectedLocation, "selectedLocation");
  // console.log(values, "values");

  // loc start
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
    const city = address_components?.find(c => c?.types?.includes('administrative_area_level_3')) || {};
    const pincode = address_components?.find(c => c?.types?.includes('postal_code')) || {};
    const area = address_components?.find(c => c?.types?.includes('locality')) || {};
    const street_name = address_components?.find(c => c?.types?.includes('locality')) || {};

    // console.log(pincode, "pincode pincode 123");

    const { geometry: { location } } = places;
    const { lat, lng } = location;

    setValues({
      ...values,
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
      place_id: locationPlaceId
    })
  }

  const selectLocation = (item) => {
    setSelectedLocation(item);
    setManualLocation(item.description);
    setLocationPlaceId(item?.place_id)
  }
  // loc end 



  return (
    <>
      <TopHeader title="Business Profile" description="below is a business overview" />

      <Container maxWidth="lg">
        {/*   */}
        <Formik enableReinitialize={true} initialValues={values} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <form className='card-box-shadow px-5 py-4 mb-4' onSubmit={handleSubmit}>
              <p className='cuisines-title text-center'>BUSINESS INFORMATION</p>
              <Divider
                className='mt-2'
                variant="middle"
                style={{
                  backgroundColor: '#c33332',
                  margin: '0px',
                  width: '35%',
                  margin: '0px auto'
                }}
              />


              <Grid container spacing={2} className="mt-4">
                <Grid item xs={6}>
                  <div>
                    <p className="business-profile-name">Catering Name</p>
                    <CssTextField
                      value={values.vendor_service_name}
                      onChange={handleChange}
                      name="vendor_service_name"
                      variant="outlined"
                      placeholder="Enter Your Catering Service Name"
                      className='mt-0'
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
                    {errors.vendor_service_name && <small className='text-danger mt-2 ms-1'>{errors.vendor_service_name}</small>}
                  </div>

                  <div className="mt-5">
                    <p className="business-profile-name">Conatct person Name</p>
                    <CssTextField
                      value={values.point_of_contact_name}
                      onChange={handleChange}
                      name="point_of_contact_name "
                      variant="outlined"
                      placeholder="Enter Conatct person name"
                      className='mt-0'
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
                    {errors.point_of_contact_name && <small className='text-danger mt-2 ms-1'>{errors.point_of_contact_name}</small>}
                  </div>
                </Grid>


                <Grid item xs={6}>
                  <div className="">
                    <p className="business-profile-name">Working days/hours</p>
                    {/* <CssTextField
                      value={values.working_days_hours}
                      onChange={handleChange}
                      name="working_days_hours"
                      variant="outlined"
                      placeholder="Eg. Monday - Saturday (9A - 10PM) - Date and Time Picker"
                      className='mt-0'
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
                    /> */}

                    <div className="business-date-picker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeRangePicker', 'DateTimeRangePicker']}>
                          <DateTimeRangePicker
                            required
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {values.working_days_hours && values.working_days_hours}
                    </div>
                    {/* {errors.working_days_hours && <small className='text-danger mt-2 ms-1'>{errors.working_days_hours}</small>} */}
                  </div>

                  <div style={values.working_days_hours ? { marginTop: '30px' } : {}}>
                    <p className="business-profile-name">Total No. of Staffs Approx</p>
                    <CssTextField
                      value={values.total_staffs_approx}
                      onChange={handleChange}
                      name="total_staffs_approx"
                      variant="outlined"
                      placeholder="Eg. 10 - 15"
                      className='mt-0'
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
                    {errors.total_staffs_approx && <small className='text-danger mt-2 ms-1'>{errors.total_staffs_approx}</small>}
                  </div>

                  {/* <div>
                    <p className="business-profile-name">Street Name</p>
                    <CssTextField
                      value={values.street_name}
                      onChange={handleChange}
                      name="street_name"
                      variant="outlined"
                      placeholder="Eg. 8th Cross Street"
                      className='mt-0'
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
                    {errors.street_name && <small className='text-danger mt-2 ms-1'>{errors.street_name}</small>}
                  </div> */}

                  {/* <div className="mt-3">
                    <p className="business-profile-name">Area</p>
                    <CssTextField
                      value={values.area}
                      onChange={handleChange}
                      name="area"
                      variant="outlined"
                      placeholder="Eg. Near Kalyan Nagar post"
                      className='mt-0'
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
                    {errors.area && <small className='text-danger mt-2 ms-1'>{errors.area}</small>}
                  </div> */}

                  {/* <div className="mt-3">
                    <p className="business-profile-name">City</p>
                    <CssTextField
                      value={values.city}
                      onChange={handleChange}
                      name="city"
                      variant="outlined"
                      placeholder="Eg. Bangalore"
                      className='mt-0'
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
                    {errors.city && <small className='text-danger mt-2 ms-1'>{errors.city}</small>}
                  </div> */}

                  {/* <div className="mt-3">
                    <p className="business-profile-name">Pin Code</p>
                    <CssTextField
                      value={values.pincode}
                      onChange={handleChange}
                      name="pincode"
                      variant="outlined"
                      placeholder="Eg. 624 301"
                      className='mt-0'
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
                    {errors.pincode && <small className='text-danger mt-2 ms-1'>{errors.pincode}</small>}
                  </div> */}


                </Grid>
              </Grid>


              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div className="mt-5">
                    <p className="business-profile-name">Address</p>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <textarea
                        required
                        style={{ height: '65px' }}
                        onChange={(evt) => {
                          setSelectedLocation(null);
                          setManualLocation(evt.target.value);
                          getPlacePredictions({ input: evt.target.value });
                          handleChange(evt); // This line ensures Formik's handleChange is called
                        }}
                        value={values.formatted_address}
                        name="formatted_address" // Make sure the name matches the field name in initialValues
                        rows="20" id="comment_text" cols="40"
                        className="job-textarea" autoComplete="off" role="textbox"
                        aria-autocomplete="list" aria-haspopup="true"
                      ></textarea>
                    </Box>
                  </div>

                  {placePredictions?.length > 0 && !selectedLocation && (
                    <p className='ct-box-search-loc mb-1'>Search Results</p>
                  )}

                  {isPlacePredictionsLoading ? (
                    <LoaderSpinner />
                  ) : (
                    !selectedLocation && (
                      placePredictions?.map((item, index) => (
                        <h2 className='ct-box-search-results cursor-pointer' key={index} onClick={() => selectLocation(item)}>{item?.description}</h2>
                      ))
                    )
                  )}



                </Grid>
              </Grid>



              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }} className={`${!selectedLocation && 'mt-5'}`}>
                <Grid item xs={8} >
                  <div className="mt-5">
                    <p className="business-profile-name">About</p>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <textarea value={values.about_description}
                        onChange={handleChange}
                        name="about_description" rows="20" id="comment_text" cols="40"
                        className="job-textarea" autoComplete="off" role="textbox"
                        aria-autocomplete="list" aria-haspopup="true"></textarea>
                    </Box>
                    {errors.about_description && <small className='text-danger mt-2 ms-1'>{errors.about_description}</small>}
                  </div>
                </Grid>
              </Grid>


              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div className="mt-3">
                    <p className="business-profile-name">Working Since</p>
                    {/* <select name="working_since" id="working_since" onChange={handleChange} value={values.working_since} className="select-box">
                    <option value="">Select Year</option> 
                      {years.map((year) => (
                         <option key={year} value={year}>{year+1}</option>
                      ))}
                    </select> */}
                    <CssTextField
                      value={values.working_since}
                      onChange={handleChange}
                      placeholder="Enter Year"
                      name="working_since"
                      variant="outlined"
                      className='mt-0'
                      style={{ width: '100%' }}
                      InputLabelProps={{
                        style: { color: '#777777', fontSize: '10px' },
                      }}
                      inputProps={{ maxLength: 4 }}
                      InputProps={{
                        style: {
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                        }
                      }}
                    />
                    {errors.working_since && <small className='text-danger mt-2 ms-1'>{errors.working_since}</small>}
                  </div>
                </Grid>
              </Grid>

              <p className='cuisines-title text-center mt-5'>CONTACT DETAILS</p>

              <Divider
                className='mt-2 mb-5'
                variant="middle"
                style={{
                  backgroundColor: '#c33332',
                  margin: '0px',
                  width: '35%',
                  margin: '0px auto'
                }}
              />

              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div>
                    <p className="business-profile-name">Business Email Id</p>
                    <CssTextField
                      value={values.business_email}
                      onChange={handleChange}
                      name="business_email"
                      variant="outlined"
                      className='mt-0'
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
                    {errors.business_email && <small className='text-danger mt-2 ms-1'>{errors.business_email}</small>}
                  </div>

                  <div className="mt-3">
                    <p className="business-profile-name">Business Phone Number</p>
                    <CssTextField
                      value={values.business_phone_number}
                      onChange={handleChange}
                      placeholder="Enter your business number"
                      name="business_phone_number"
                      variant="outlined"
                      className='mt-0'
                      style={{ width: '100%' }}
                      InputLabelProps={{
                        style: { color: '#777777', fontSize: '10px' },
                      }}
                      inputProps={{ maxLength: 14 }}
                      InputProps={{
                        style: {
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                        }
                      }}
                    />
                  </div>

                  <div className="mt-3">
                    <p className="business-profile-name">Alternative Phone Number / Landline Number</p>
                    <CssTextField
                      value={values.landline_number}
                      onChange={handleChange}
                      name="landline_number"
                      variant="outlined"
                      className='mt-0'
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
                  </div>

                  <div className="mt-3">
                    <p className="business-profile-name">Whatsapp Business Number</p>
                    <CssTextField
                      value={values.whatsapp_business_phone_number}
                      onChange={handleChange}
                      placeholder="Enter Your Number"
                      name="whatsapp_business_phone_number"
                      variant="outlined"
                      className='mt-0'
                      inputProps={{ maxLength: 14 }}
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
                  </div>
                </Grid>
              </Grid>

              <p className='cuisines-title text-center mt-5'>OTHERS</p>

              <Divider
                className='mt-2 mb-5'
                variant="middle"
                style={{
                  backgroundColor: '#c33332',
                  margin: '0px',
                  width: '35%',
                  margin: '0px auto'
                }}
              />

              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8}>


                  <div>
                    <p className="business-profile-name">Website link(optional)</p>
                    <CssTextField
                      value={values.website_link}
                      onChange={handleChange}
                      name="website_link"
                      variant="outlined"
                      className='mt-0'
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
                  </div>

                  <div className="mt-3">
                    <p className="business-profile-name">Twitter Id (optional)</p>
                    <CssTextField
                      value={values.twitter_id}
                      onChange={handleChange}
                      name="twitter_id"
                      variant="outlined"
                      className='mt-0'
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
                  </div>

                  <div className="mt-3">
                    <p className="business-profile-name">Instagram Link (optional)</p>
                    <CssTextField
                      value={values.instagram_link}
                      onChange={handleChange}
                      name="instagram_link"
                      variant="outlined"
                      className='mt-0'
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
                  </div>

                  <div className="mt-3">
                    <p className="business-profile-name">Facebook link (optional)</p>
                    <CssTextField
                      value={values.facebook_link}
                      onChange={handleChange}
                      name="facebook_link"
                      variant="outlined"
                      className='mt-0'
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
                  </div>
                </Grid>
              </Grid>


              <Stack direction="row" justifyContent="center" className="mt-4">
                <Button type="submit" variant="contained" className="inquiries-red-btn" disabled={loading}>
                  {loading ? 'Loading...' : 'Update'}  </Button>
              </Stack>

            </form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default BusinesssProfile