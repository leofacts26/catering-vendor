import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { api } from '../../api/apiConfig';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CssTextFieldTwo = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #F0F1F3',
            borderRadius: '8px'
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
        padding: '6px 20px',
    },
}));

const initialKycState = {
    aadhar_card_number: '',
    pan_number: '',
    gstin_number: '',
    fssai_document_filename: ''
}



const KycUpdate = ({ activeStep, setActiveStep }) => {
    const { accessToken } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // validationSchema 
    const validationSchema = Yup.object().shape({
        // aadhar_card_number: Yup.string()
        //     .required('Aadhar card number is required')
        //     .matches(/^\d*$/, 'Invalid Number')
        //     .matches(/^\d{12}$/, 'Aadhar card number must be exactly 12 digits'),
        // gstin_number: Yup.string()
        //     .matches(/^[A-Z0-9]*$/, 'GSTIN number must contain only uppercase letters and numbers')
        //     .min(15, 'GSTIN number must be at least 15 characters long')
        //     .max(15, 'GSTIN number must not exceed 15 characters'),
        // pan_number: Yup.string()
        // .required('PAN number is required')
        // .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'PAN number must be in the format AAAAA9999A and in uppercase')
        // .length(10, 'PAN number must be exactly 10 characters long'),
        fssai_document_filename: Yup.string()
            .matches(/^[A-Z0-9]*$/, 'FSSAI number must contain only uppercase letters and numbers')
            .min(14, 'FSSAI must be at least 14 characters long')
            .max(14, 'FSSAI must not exceed 14 characters')
    });



    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const {
                // aadhar_card_number, pan_number, gstin_number, 
                fssai_document_filename } = values;
            const data = {
                // aadhar_card_number,
                // pan_number,
                // gstin_number,
                fssai_document_filename
            };
            const response = await api.post('/register-vendor-kyc-update', data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            toast.success(response?.data?.message);
            setLoading(false);
            if (response?.data) {
                navigate("/");
            }
            toast.success('Login Details have been sent to the registered Phone number');
        } catch (error) {
            setLoading(false);
            console.log(error, " error");
            toast.error(error?.response?.data?.message);
            // toast.error(error?.response?.data?.data_validation_errors[0].msg);
        }
    };


    const handleBack = () => {
        navigate('/')
    }



    return (
        <>
            <Formik initialValues={initialKycState} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                {({ values, errors, handleChange, handleSubmit, isValid }) => (
                    <form onSubmit={handleSubmit} className='mx-3'>
                        {/* <h4 className='ct-box-profile-title mt-1'>Please Enter Your Aadhar Card Number *</h4>
                        <CssTextFieldTwo
                            value={values.aadhar_card_number}
                            name="aadhar_card_number"
                            onChange={handleChange}
                            variant="outlined"
                            className='mt-2'
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '12px' },
                            }}
                            inputProps={{ maxLength: 12 }}
                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                },
                            }}
                        />
                        {errors.aadhar_card_number && <small className='text-danger mt-2 ms-0'>{errors.aadhar_card_number}</small>}

                        <h4 className='ct-box-profile-title mt-1'>Please Enter Your PAN Number *</h4>
                        <CssTextFieldTwo
                            value={values.pan_number}
                            name="pan_number"
                            onChange={handleChange}
                            variant="outlined"
                            className='mt-2'
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '12px' },
                            }}
                            inputProps={{ maxLength: 10 }}
                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                },
                            }}
                        />
                        {errors.pan_number && <small className='text-danger mt-2 ms-0'>{errors.pan_number}</small>}

                        <h4 className='ct-box-profile-title mt-1'>Please Enter Your GSTIN Number</h4>
                        <CssTextFieldTwo
                            value={values.gstin_number}
                            name="gstin_number"
                            onChange={handleChange}
                            variant="outlined"
                            className='mt-2'
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '12px' },
                            }}
                            inputProps={{ maxLength: 15 }}
                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                },
                            }}
                        />
                        {errors.gstin_number && <small className='text-danger mt-2 ms-0'>{errors.gstin_number}</small>} */}

                        <h4 className='ct-box-profile-title mt-4'>Please Enter Your FSSAI Licence Number</h4>
                        <CssTextFieldTwo
                            value={values.fssai_document_filename}
                            name="fssai_document_filename"
                            onChange={handleChange}
                            variant="outlined"
                            className='mt-2'
                            style={{ width: '100%' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '12px' },
                            }}
                            inputProps={{ maxLength: 14 }}
                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                },
                            }}
                        />
                        {errors.fssai_document_filename && <small className='text-danger mt-2 ms-0'>{errors.fssai_document_filename}</small>}

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 3 }}>
                            <Button
                                color="inherit"
                                onClick={handleBack}
                                sx={{ mr: 1, color: '#57636c' }}
                            >
                                Skip
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button type='submit' className='ct-box-btn-profile-step' disabled={loading}>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default KycUpdate