import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { api, BASE_URL } from '../../api/apiConfig';
import KycUpdate from './KycUpdate';
import { datavalidationerror, successToast } from '../../utils';
import { setIsLoading } from '../../features/user/userSlice';
import { inputNumberLimit } from '../../constant';

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
        fontSize: '16px',
        padding: '12.5px 20px',
    },
}));


const steps = ['Step 1', 'Step 2'];


const initialProfileState = {
    vendor_service_name: '',
    point_of_contact_name: '',
    business_phone_number: '',
    landline_number: '',
    whatsapp_business_phone_number: ''
}




const formatPhoneNumber = (phoneNumber) => {
    const countryCode = '+91';
    const areaCode = phoneNumber.substring(0, 3);
    const firstPart = phoneNumber.substring(3, 6);
    const secondPart = phoneNumber.substring(6);
    return `${countryCode}-${areaCode}${firstPart}${secondPart}`;
};

const formatLandlineNumber = (landlineNumber) => {
    if (!landlineNumber) return '';
    const areaCode = landlineNumber.substring(0, 3);
    const firstPart = landlineNumber.substring(3, 6);
    const secondPart = landlineNumber.substring(6);
    return `${areaCode}-${firstPart}${secondPart}`;
};


const ProfileSteps = () => {
    const { accessToken } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.user);


    // validationSchema 
    const validationSchema = Yup.object().shape({
        vendor_service_name: Yup.string().required('Your name is required'),
        point_of_contact_name: Yup.string().required('Catering service name is required'),
        business_phone_number: Yup.string()
            .required('Business phone number is required')
            .matches(/^[0-9]{10}$/, 'Business phone number must contain exactly 10 digits'),
        whatsapp_business_phone_number: Yup.string()
            .matches(/^[0-9]{10}$/, 'Whatsapp Business number must contain exactly 10 digits')
            .min(10, 'Minimum 10 characters required')
            .max(10, 'Maximum 10 characters allowed'),
        landline_number: Yup.string()
            .required('Landline number is required.')
            .matches(
                /^[0-9]{7,15}$/,
                'Landline number must be between 7 and 15 digits and contain only numbers.'
            ),
    });





    const handleSubmit = async (values, { resetForm }) => {
        dispatch(setIsLoading(true))
        try {
            const { vendor_service_name, point_of_contact_name, business_phone_number, landline_number, whatsapp_business_phone_number } = values;

            const formattedPhoneNumber = formatPhoneNumber(business_phone_number);
            const formattedlandline_number = formatLandlineNumber(landline_number);
            const formattedwhatsapp_business_phone_number = whatsapp_business_phone_number ? formatPhoneNumber(whatsapp_business_phone_number) : '';

            const data = {
                vendor_service_name,
                point_of_contact_name,
                business_phone_number: formattedPhoneNumber,
                landline_number: formattedlandline_number,
                whatsapp_business_phone_number: formattedwhatsapp_business_phone_number
            }

            const response = await api.post(`${BASE_URL}/register-vendor-profile-update`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (response.status === 200) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                toast.success(successToast(response));
            }

        } catch (error) {
            console.error("Error while submitting the form:", error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <>
            <Container maxWidth="lg">
                <div className='mt-3 bg-primary'>
                    <h1 className='ct-heading'>catering Service</h1>
                </div>
                <Grid container spacing={2} className='box-negative'>
                    <Grid item xs={12} sm={6.5} md={4.5} lg={4.5}>
                        <div className="ct-box ct-box-padding">
                            <Box sx={{ width: '100%' }}>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const stepProps = {};
                                        const labelProps = {};
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                {activeStep === steps.length ? (
                                    <>
                                        <Typography sx={{ mt: 2, mb: 1 }} className='ps-2'>
                                            All steps completed - you&apos;re finished
                                        </Typography>
                                        <Link to="/" className='text-decoration-none'>
                                            <Button variant="contained" className='ct-box-btn-catering' style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                                                Go to Dashboard
                                            </Button>
                                        </Link>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Reset</Button>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        {activeStep === 0 && <div className="px-2">
                                            <div className="mx-3">
                                                <h4 className='ct-box-profile-title pb-1'>Profile Update</h4>
                                                <p className='ct-box-loc-desc'>Let's get started by filling out the form below</p>
                                            </div>
                                            <Formik initialValues={initialProfileState} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                                                {({ values, errors, handleChange, handleSubmit, isValid }) => (
                                                    <form onSubmit={handleSubmit} className='mx-3'>
                                                        <CssTextField
                                                            value={values.vendor_service_name}
                                                            onChange={handleChange}
                                                            name="vendor_service_name"
                                                            variant="outlined"
                                                            label="Enter Your Name"
                                                            className='mt-3'
                                                            style={{ width: '100%' }}
                                                            InputLabelProps={{
                                                                style: { color: '#777777', fontSize: '12px' },
                                                            }}
                                                            InputProps={{
                                                                style: {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: '#FFFFFF',
                                                                },
                                                            }}
                                                        />
                                                        {errors.vendor_service_name && <small className='text-danger mt-2 ms-1'>{errors.vendor_service_name}</small>}


                                                        <CssTextField
                                                            value={values.point_of_contact_name}
                                                            onChange={handleChange}
                                                            name="point_of_contact_name"
                                                            variant="outlined"
                                                            label="Enter Catering Service Name / Display Name"
                                                            className='mt-3'
                                                            style={{ width: '100%' }}
                                                            InputLabelProps={{
                                                                style: { color: '#777777', fontSize: '12px' },
                                                            }}
                                                            InputProps={{
                                                                style: {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: '#FFFFFF',
                                                                },
                                                            }}
                                                        />
                                                        {errors.point_of_contact_name && <small className='text-danger mt-2 ms-1'>{errors.point_of_contact_name}</small>}



                                                        <CssTextField
                                                            value={values.business_phone_number}
                                                            onChange={handleChange}
                                                            type='tel'
                                                            name="business_phone_number"
                                                            variant="outlined"
                                                            label="Business Phone Number"
                                                            className='mt-3'
                                                            style={{ width: '100%' }}
                                                            InputLabelProps={{
                                                                style: { color: '#777777', fontSize: '12px' },
                                                            }}
                                                            inputProps={{ maxLength: inputNumberLimit }}
                                                            InputProps={{
                                                                style: {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: '#FFFFFF',
                                                                },
                                                            }}
                                                        />
                                                        {errors.business_phone_number && <small className='text-danger mt-2 ms-1'>{errors.business_phone_number}</small>}



                                                        <CssTextField
                                                            value={values.landline_number}
                                                            onChange={handleChange}
                                                            name="landline_number"
                                                            variant="outlined"
                                                            label="Add landline number / Alternative Business number"
                                                            className='mt-3'
                                                            style={{ width: '100%' }}
                                                            InputLabelProps={{
                                                                style: { color: '#777777', fontSize: '12px' },
                                                            }}
                                                            InputProps={{
                                                                style: {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: '#FFFFFF',
                                                                },
                                                            }}
                                                        />
                                                        {errors.landline_number && <small className='text-danger mt-2 ms-1'>{errors.landline_number}</small>}




                                                        <CssTextField
                                                            value={values.whatsapp_business_phone_number}
                                                            onChange={handleChange}
                                                            name="whatsapp_business_phone_number"
                                                            variant="outlined"
                                                            label="Add Whatsapp Business Number (Optional)"
                                                            className='mt-3'
                                                            style={{ width: '100%' }}
                                                            InputLabelProps={{
                                                                style: { color: '#777777', fontSize: '12px' },
                                                            }}
                                                            inputProps={{ maxLength: inputNumberLimit }}
                                                            InputProps={{
                                                                style: {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: '#FFFFFF',
                                                                },
                                                                minLength: 10
                                                            }}
                                                        />
                                                        {errors.whatsapp_business_phone_number && <small className='text-danger mt-2 ms-1'>{errors.whatsapp_business_phone_number}</small>}


                                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                                                            <Box sx={{ flex: '1 1 auto' }} />

                                                            <Button type='submit' disabled={!isValid || isLoading} className='ct-box-btn-profile-step'>
                                                                {isLoading ? 'Loading...' : 'Next'}
                                                            </Button>
                                                            {/* <Button type='submit' onClick={() => handleNext()} className='ct-box-btn-profile-step'>
                                                                Next
                                                            </Button> */}
                                                        </Box>
                                                    </form>
                                                )}
                                            </Formik>
                                        </div>
                                        }
                                        {activeStep === 1 && <div className="px-2">

                                            <KycUpdate activeStep={activeStep} setActiveStep={setActiveStep} />

                                        </div>
                                        }



                                    </>
                                )}
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ProfileSteps