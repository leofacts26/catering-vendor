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
import { format, parse, isValid } from 'date-fns';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { api, BASE_URL } from "../api/apiConfig";
import LoaderSpinner from "../components/LoaderSpinner";
import { useLocation } from "react-router-dom";
import { MenuItem, Select } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

// working_days_hours : "2024-05-17 00:20:00 - 2024-05-24 12:20:00"

const BusinesssProfile = () => {
  const [values, setValues] = useState({})
  const { accessToken } = useSelector((state) => state.user)
  const { vendor_id } = useSelector((state) => state?.user?.vendorId)
  const [loading, setLoading] = useState(false)
  const [data, updateBusinessProfile, fetchBusinessProfile] = useBusinessProfile('/get-vendor-business-profile', accessToken)


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  // const [formattedStartTime, setFormattedStartTime] = useState('');
  // const [formattedEndTime, setFormattedEndTime] = useState('');

  // const formatTime = (time) => {
  //   return time ? dayjs(time).format('hh:mm:ss A') : null;
  // };


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
      street_address: data?.street_address || "NA",
      business_email: data?.business_email,
      business_phone_number: data?.business_phone_number?.slice(4, 14),
      landline_number: data?.landline_number,
      whatsapp_business_phone_number: data?.whatsapp_business_phone_number?.slice(4, 14),
      website_link: data?.website_link,
      twitter_id: data?.twitter_id,
      instagram_link: data?.instagram_link,
      facebook_link: data?.facebook_link,

      city_id: data?.city_id || "",
      pincode: data?.pincode || "",
      latitude: data?.latitude || "",
      longitude: data?.longitude || "",
      area: data?.area || "",
      street_name: data?.street_name || "",
      country: data?.country || "",
      state: data?.state || "",
      formatted_address: data?.formatted_address || "",
      city: data?.city || "",
      place_id: data?.place_id || "",
    }));
  }, [data]);

  // validation schema 
  const schema = Yup.object().shape({
    vendor_service_name: Yup.string().required('Name is required.'),
    point_of_contact_name: Yup.string().required('Contact person name is required.'),
    business_phone_number: Yup.string()
      .required('Business phone number is required')
      .matches(/^[+]?[0-9-]+$/, 'Phone number must contain only digits, +, or -')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must not exceed 15 digits'),
    whatsapp_business_phone_number: Yup.string()
      .matches(/^[+]?[0-9-]+$/, 'Phone number must contain only digits, +, or -')
      .min(10, 'Phone number must be at least 10 digits')
      .max(10, 'Phone number must not exceed 15 digits'),
  });

  useEffect(() => {
    if (data) {
      setStartDate(data?.start_day);
      setEndDate(data?.end_day);
      setStartTime(data.start_time ? dayjs(data.start_time, 'HH:mm:ss') : null);
      setEndTime(data.end_time ? dayjs(data.end_time, 'HH:mm:ss') : null);
    }
  }, [data])
  console.log(data, "startTime, endTime");

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

      const formattedStartTime = startTime ? dayjs(startTime).format('hh:mm:ss A') : '';
      const formattedEndTime = endTime ? dayjs(endTime).format('hh:mm:ss A') : '';


      const data = {
        ...values,
        working_hours_start: formattedStartTime || startTime,
        working_hours_end: formattedEndTime || endTime,
        working_days_start: startDate,
        working_days_end: endDate,
      }
      console.log(data, "data 666");
      await updateBusinessProfile(data, vendor_id);
      setLoading(false);
      fetchBusinessProfile()
    } catch (error) {
      setLoading(false);
      console.error('Error while updating business profile:', error);
    }
  }


  // useEffect(() => {
  //   if (data) {
  //     setStartDate(data?.start_day);
  //     setEndDate(data?.end_day);

  //     // Helper function to parse and format time
  //     const formatTime = (timeString) => {
  //       const parsedTime = parse(timeString, 'hh:mm:ss a', new Date());
  //       if (isValid(parsedTime)) {
  //         return format(parsedTime, 'hh:mm:ss a');
  //       } else {
  //         console.error('Invalid time format', timeString);
  //         return '';
  //       }
  //     };

  //     // Set the original times and format them
  //     if (data?.start_time) {
  //       setStartTime(data?.start_time);
  //       setFormattedStartTime(formatTime(data?.start_time));
  //     } else {
  //       setStartTime('');
  //       setFormattedStartTime('');
  //     }

  //     if (data?.end_time) {
  //       setEndTime(data?.end_time);
  //       setFormattedEndTime(formatTime(data?.end_time));
  //     } else {
  //       setEndTime('');
  //       setFormattedEndTime('');
  //     }
  //   }
  // }, [data])





  // location start
  const [locationPlaceId, setLocationPlaceId] = useState(null)
  const [manualLocation, setManualLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null);
  // location end 


  // const handleStartTimeChange = (newValue, setTime) => {
  //   if (newValue && newValue.isValid()) { // Check if newValue exists and is valid
  //     const formattedTime = formatTime(newValue);
  //     setTime(formattedTime);
  //   } else {
  //     setTime(null); // Set null if newValue is invalid
  //   }
  // };

  // const handleEndTimeChange = (newValue, setTime) => {
  //   if (newValue && newValue.isValid()) { // Check if newValue exists and is valid
  //     const formattedTime = formatTime(newValue);
  //     setTime(formattedTime);
  //   } else {
  //     setTime(null); // Set null if newValue is invalid
  //   }
  // };

  const handleStartChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  // console.log({ startDate, startTime, endDate, endTime }, "startDate, startTime, endDate, endTime");
  // console.log({ formattedEndTime, formattedStartTime }, "formattedEndTime, formattedStartTime");


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
    const city = address_components?.find(c => c?.types?.includes('locality')) || {};
    const pincode = address_components?.find(c => c?.types?.includes('postal_code')) || {};
    const area = address_components?.find(c => c?.types?.includes('locality')) || {};
    const street_name = address_components?.find(c => c?.types?.includes('locality')) || {};

    // console.log(pincode, "pincode pincode 123");

    const { geometry: { location } } = places;
    const { lat, lng } = location;

    setValues({
      ...values,
      street_name: street_name?.long_name || "NA",
      // area: area?.long_name || "",
      area: name || "NA",
      pincode: pincode?.long_name || "NA",
      latitude: lat() || "NA",
      longitude: lng() || "NA",
      address: name || "NA",
      city: city?.long_name || "NA",
      state: state?.long_name || "NA",
      country: country?.long_name || "NA",
      formatted_address: manualLocation || "NA",
      place_id: locationPlaceId
    })
  }

  const selectLocation = (item) => {
    console.log(item, "Item");
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
            <form className='card-box-shadow px-5 py-4 mb-4' onSubmit={handleSubmit} autocomplete="off">
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
                </Grid>



                <Grid item xs={6}>
                  <div className="mt-0">
                    <p className="business-profile-name">Name</p>
                    <CssTextField
                      value={values.point_of_contact_name}
                      onChange={handleChange}
                      name="point_of_contact_name"
                      variant="outlined"
                      placeholder="Enter Contact person name"
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
              </Grid>


              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >

                  <div className="mt-5">
                    <p className="business-profile-name">Working days/hours</p>

                    <Stack direction="row" justifyContent="start" alignItems="center" spacing={2}>
                      <Box>
                        <FormControl>
                          {/* <InputLabel id="demo-simple-select-label">Monday</InputLabel> */}
                          <Select
                            style={{ width: '150px' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={startDate}
                            // label="startDate"
                            onChange={handleStartChange}
                          >
                            <MenuItem value="Monday">Monday</MenuItem>
                            <MenuItem value="Tuesday">Tuesday</MenuItem>
                            <MenuItem value="Wednesday">Wednesday</MenuItem>
                            <MenuItem value="Thursday">Thursday</MenuItem>
                            <MenuItem value="Friday">Friday</MenuItem>
                            <MenuItem value="Saturday">Saturday</MenuItem>
                            <MenuItem value="Sunday">Sunday</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box sx={{ width: '150px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            // label="Select Time"
                            value={startTime ? dayjs(startTime, 'hh:mm:ss A') : null}
                            onChange={(newValue) => {
                              handleStartTimeChange(newValue, setStartTime);
                            }}
                            renderInput={(params) => <TextField
                              {...params}
                            />}
                          />
                        </LocalizationProvider>
                      </Box>

                      <span>-</span>

                      <Box>
                        <FormControl>
                          {/* <InputLabel id="demo-simple-select-label1">Monday</InputLabel> */}
                          <Select
                            style={{ width: '150px' }}
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={endDate}
                            // label="endDate"
                            onChange={handleEndChange}
                          >
                            <MenuItem value="Monday">Monday</MenuItem>
                            <MenuItem value="Tuesday">Tuesday</MenuItem>
                            <MenuItem value="Wednesday">Wednesday</MenuItem>
                            <MenuItem value="Thursday">Thursday</MenuItem>
                            <MenuItem value="Friday">Friday</MenuItem>
                            <MenuItem value="Saturday">Saturday</MenuItem>
                            <MenuItem value="Sunday">Sunday</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box sx={{ width: '150px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            // label="Select Time"
                            value={endTime ? dayjs(endTime, 'hh:mm:ss A') : null}
                            onChange={(newValue) => {
                              handleEndTimeChange(newValue, setEndTime);
                            }}
                            renderInput={(params) => <TextField
                              {...params}
                              sx={{ gridColumn: "span 1" }}
                            />}
                          />
                        </LocalizationProvider>
                      </Box>

                    </Stack>
                  </div>
                </Grid>
              </Grid>




              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div style={values.working_days_hours ? { marginTop: '50px' } : { marginTop: '50px' }}>
                    <p className="business-profile-name">Total No. of Staffs Approx</p>
                    <CssTextField
                      value={values.total_staffs_approx}
                      onChange={handleChange}
                      name="total_staffs_approx"
                      variant="outlined"
                      placeholder="E.g.. 15"
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



              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div className="mt-5">
                    <p className="business-profile-name">Select your Area</p>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <textarea
                        autocomplete="false"
                        required
                        style={{ height: '65px' }}
                        onChange={(evt) => {
                          setSelectedLocation(null);
                          setManualLocation(evt.target.value);
                          getPlacePredictions({ input: evt.target.value });
                          handleChange(evt); // This line ensures Formik's handleChange is called
                        }}
                        value={manualLocation ? manualLocation : values.formatted_address}
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


              <Grid className="mb-4" container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div style={values.working_days_hours ? { marginTop: '50px' } : { marginTop: '50px' }}>
                    <p className="business-profile-name">Pincode</p>
                    <CssTextField
                      value={values.pincode}
                      onChange={handleChange}
                      name="pincode"
                      variant="outlined"
                      placeholder="Enter Pincode"
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


              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div style={values.working_days_hours ? { marginTop: '50px' } : { marginTop: '50px' }}>
                    <p className="business-profile-name">Street Address</p>

                    <CssTextField
                      value={values.street_address}
                      onChange={handleChange}
                      name="street_address"
                      variant="outlined"
                      placeholder="E.g.. 15"
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

                    {/* <CssTextField
                      value={values.street_address}
                      onChange={handleChange}
                      name="street_address"
                      variant="outlined"
                      placeholder="Enter Street Address"
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
                  </div>
                </Grid>
              </Grid>




              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }} className={`${!selectedLocation && 'mt-5'}`}>
                <Grid item xs={8} >
                  <div className={selectedLocation ? 'mt-4' : 'mt-0'}>
                    <p className="business-profile-name">About</p>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <textarea value={values.about_description}
                        onChange={handleChange}
                        name="about_description" rows="20" id="comment_text" cols="40"
                        className="job-textarea" autoComplete="off" role="textbox"
                        aria-autocomplete="list" aria-haspopup="true"></textarea>
                    </Box>
                    {/* {errors.about_description && <small className='text-danger mt-2 ms-1'>{errors.about_description}</small>} */}
                  </div>
                </Grid>
              </Grid>


              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8} >
                  <div className="mt-5">
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
                      type="number"
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
                    {/* {errors.working_since && <small className='text-danger mt-2 ms-1'>{errors.working_since}</small>} */}
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
                    {/* {errors.business_email && <small className='text-danger mt-2 ms-1'>{errors.business_email}</small>} */}
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
                      InputProps={{
                        style: {
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                        }
                      }}
                    />
                    {errors.business_phone_number && <small className='text-danger mt-2 ms-1'>{errors.business_phone_number}</small>}
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
                      inputProps={{ maxLength: 10 }}
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
                    {errors.whatsapp_business_phone_number && <small className='text-danger mt-2 ms-1'>{errors.whatsapp_business_phone_number}</small>}
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