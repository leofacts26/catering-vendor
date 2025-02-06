
import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setIsLoading } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { api, BASE_URL } from "../api/apiConfig";
import toast from "react-hot-toast";
import { datavalidationerror, successToast } from "../utils";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import { sendUpdateProfileOTP, sendUpdateUserProfile, setEditProfile } from "../features/settingSlice";
import { useNavigate } from "react-router-dom";
import useGetVendor from "../hooks/useGetVendor";



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
        padding: '15px 20px',
    },
}));


const OtpInput = ({ length = 6 }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);
    const { editProfileData } = useSelector((state) => state.settings)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { loading, verifyLoginOtp } = useRegistration();

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp]
        //allow only one input
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        // submit trigger 
        // const combinedOtp = newOtp.join("");
        // console.log(combinedOtp, "combinedOtp");
        // console.log(combinedOtp.length === length, "combinedOtp.length === length");
        // if (combinedOtp.length === length) onOtpSubmit(combinedOtp)


        // Focus on the next input box if available
        if (value !== '' && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }

    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)

        // optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Moving focus on pressing back space 
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    }

    // onOtpSubmit 
    // console.log('Login Successfully', otp.join(""));
    const onOtpSubmit = async (e) => {
        e.preventDefault()
        // console.log(otp, "otp otp otp");
        // console.log(editProfileData, "editProfileData editProfileData editProfileData");
        const data = {
            editProfileData,
            otp,
        }
        await dispatch(sendUpdateUserProfile(data))
        await navigate('/dashboard/settings')
        // verifyLoginOtp(otp.join(""), loginUserData, setOtp, setShowOtp);
    }

    return (
        <div className='otp-input-fields-box'>
            <Stack display="flex" justifyContent="center" className="w-100">
            <form onSubmit={onOtpSubmit} className="w-100">
                <div>
                    {
                        otp.map((value, index) => {
                            return <input
                                required
                                ref={(input) => (inputRefs.current[index] = input)}
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='otp__digit-settings mb-4 me-1'
                            />
                        })
                    }
                </div>
                <Button variant="contained" type="submit" className='ct-box-btn-catering mb-3' style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                    Submit
                </Button>
            </form>
            </Stack>
        </div>
    )
}



const initialState = {
    username: '',
    phone_number: '',
    phone_extension: '+91',
}


const UpdatePhoneNumber = () => {

    const dispatch = useDispatch();
    const { showOtp, isLoading } = useSelector((state) => state.settings)
    // const { userDetails } = useSelector((state) => state.user)
    const [values, setValues] = useState(initialState)
    const { fetchVendorData, vendorBusinessProfile } = useGetVendor();

    const navigate = useNavigate();

    useEffect(() => {
        setValues({
            ...values,
            username: vendorBusinessProfile?.point_of_contact_name || '',
            phone_number: vendorBusinessProfile?.phone_number || "",
        })
    }, [vendorBusinessProfile])


    // validation schema
    const schema = Yup.object().shape({
        username: Yup.string().required('Name is required.'),
        phone_number: Yup.string()
            .required('Phone number is required.')
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 digits')
            .max(10, 'Phone number must not exceed 15 digits'),
    });



    const handleSubmit = async (data, resetForm) => {
        // console.log(data, "data"); 
        await dispatch(setEditProfile(data))
        await dispatch(sendUpdateProfileOTP(data))
        await dispatch(fetchVendorData())
        resetForm(values);
    }

    const handleBack = () => {
        navigate(-1);
    };


    return (
        <>
            <TopHeader title="Chane Phone Number" description="" />

            <Container maxWidth="lg">
                <div className='card-box-shadow px-5 py-4 mb-4'>
                    <div className='mt-3 bg-primary'>
                    </div>
                    <Grid container spacing={2} className='box-negative'>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <div className="ct-box ct-box-padding">
                                <div className="px-4">
                                    <Stack direction="row" alignItems="center" className="mb-3">
                                        <ArrowBackIcon className="cursor-pointer" style={{ fontSize: '18px', color: '#c33332' }} onClick={handleBack} /> <h3 className="faq-heading ms-2">Update Phone Number</h3>
                                    </Stack>
                                    {/* <h2 className="rt-heading mb-4 mt-5">Update Phone Number</h2> */}
                                    {
                                        showOtp ? (
                                            <Formik enableReinitialize={true} initialValues={values} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                                                {({ values, errors, handleChange, handleSubmit }) => (
                                                    <form onSubmit={handleSubmit} className="px-3" autocomplete="off">
                                                        {/* <h2 className="user-profile-title" style={{ fontSize: '1.8em', color: '#57636c' }}>
                                                            Edit Profile
                                                        </h2> */}
                                                        <Grid container spacing={2}>
                                                            <Stack direction="row" justifyContent="center" alignItems="center" className='w-100 mt-3'>
                                                                <div className='p-5'>
                                                                    <Grid item xs={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12}>
                                                                                <CssTextField
                                                                                    name="username"
                                                                                    value={values?.username}
                                                                                    onChange={handleChange}
                                                                                    id="outlined-number"
                                                                                    placeholder="Enter Name Here..."
                                                                                    variant="outlined"
                                                                                    label="Enter Name Here..."
                                                                                    className='mt-0'
                                                                                    style={{ width: '100%' }}
                                                                                    InputLabelProps={{
                                                                                        style: { color: '#777777', fontSize: '14px' },
                                                                                    }}
                                                                                    InputProps={{
                                                                                        style: {
                                                                                            borderRadius: '8px',
                                                                                            backgroundColor: '#FFFFFF',
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                {errors.username && <small className='text-red mb-2 ms-1'>{errors.username}</small>}
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <CssTextField
                                                                                    name='phone_number'
                                                                                    value={values?.phone_number}
                                                                                    onChange={handleChange}
                                                                                    id="outlined-number"
                                                                                    placeholder="Phone Number..."
                                                                                    variant="outlined"
                                                                                    label="Phone Number..."
                                                                                    className='mt-0'
                                                                                    style={{ width: '100%' }}
                                                                                    InputLabelProps={{
                                                                                        style: { color: '#777777', fontSize: '14px' },
                                                                                    }}
                                                                                    inputProps={{ maxLength: 10 }}
                                                                                    InputProps={{
                                                                                        style: {
                                                                                            borderRadius: '8px',
                                                                                            backgroundColor: '#FFFFFF',
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                {errors.phone_number && <small className='text-red mb-2 ms-1'>{errors.phone_number}</small>}
                                                                            </Grid>

                                                                            <Stack style={{ width: '100%' }} direction="row" justifyContent="end" alignItems="center" className='mt-3 w-100'>
                                                                                <Button type="submit" size="small" variant="contained" sx={{
                                                                                    width: 'auto', fontWeight: '600', padding: '5px 20px', fontSize: '14px',
                                                                                    backgroundColor: '#c33332', borderRadius: '8px', textTransform: 'capitalize',
                                                                                    '&:hover': {
                                                                                        backgroundColor: '#c33332',
                                                                                    },
                                                                                }}>
                                                                                    Submit
                                                                                </Button>
                                                                            </Stack>

                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </Stack>
                                                        </Grid>
                                                    </form>
                                                )}
                                            </Formik >
                                        ) : (
                                            <>
                                                <div className='p-3'>
                                                    <p className='text-center text-dark mt-5 mb-2'>Please enter Your OTP below </p>
                                                    <div className="otp-input-fields otp-input-fields-settings mb-3 my-4">
                                                        <OtpInput length={6} />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>

                            </div>


                        </Grid>
                    </Grid>









                </div>
            </Container>
        </>
    )
}

export default UpdatePhoneNumber