import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import { api, BASE_URL } from '../../api/apiConfig';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Formik } from 'formik';
import * as Yup from 'yup';
import useLogin from '../../hooks/useLogin';


const CssTextField = styled(TextField)(({ theme }) => ({
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
        padding: '12.5px 20px',
    },
}));

const initialState = {
    company_id: '358868',
    password: 'Virat@2026'

    // company_id: '372313',
    // password: 'Y6ZhP0EU'
}


const OtpInput = ({ length = 6, onOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

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
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp)


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

    return (
        <div className='otp-input-fields'>
            {
                otp.map((value, index) => {
                    return <input
                        ref={(input) => (inputRefs.current[index] = input)}
                        key={index}
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className='otp__digit'
                    />
                })
            }
        </div>
    )
}



const LoginVendor = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);


    const [value, setValue] = useState('1');
    const [showPassword, setShowPassword] = useState(false);
    const { loading, loginVendor, verifyOtp, resendOtp } = useLogin();
    const [showOtp, setShowOtp] = useState(true)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const user = useSelector((state) => state.user.userData)
    const loginUserData = useSelector((state) => state.user.loginUserData)
    const { accessToken } = useSelector((state) => state.user)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const { userData } = useSelector((state) => state.user)

    // validationSchema 
    const validationSchema = Yup.object().shape({
        company_id: Yup.string()
            .required('Company ID is required'),
        password: Yup.string()
            .required('Password is required')
    });


    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = (logData, resetForm) => {
        loginVendor(logData, setShowOtp, initialState);
        resetForm()
    }

    // resendOtp 
    const handleResendOtp = async () => {
        try {
            setMinutes(0);
            setSeconds(30);
            await resendOtp(loginUserData);
        } catch (error) {
            console.error('Error while resending OTP:', error);
        }
    }

    // Timer 
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);


    // onOtpSubmit 
    const onOtpSubmit = (otp) => {
        verifyOtp(otp, loginUserData, setOtp, setValue);
        console.log('Login Successfully', otp);
    }


    // login creds 
    // const fetchLoginCreds = async () => {
    //     const data = {
    //         phone_number: parseInt(user?.phone_number)
    //     };
    //     try {
    //         const response = await api.get(`${BASE_URL}/get-vendor-creds`, {
    //             phone_number: parseInt(user?.phone_number),
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         });
    //         console.log(response.data, "response 123");
    //     } catch (error) {
    //         console.error('Error fetching login credentials:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchLoginCreds();
    // }, []);


    return (
        <div>
            <div className="px-4">
                <h4 className='ct-create-account'>Welcome Back</h4>

                {showOtp ? (

                    <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                        {({ values, errors, handleChange, handleSubmit, isValid }) => (
                            <form onSubmit={handleSubmit}>

                                <CssTextField
                                    value={values.company_id}
                                    onChange={handleChange}
                                    name="company_id"
                                    id="outlined-number"
                                    variant="outlined"
                                    label="Business ID"
                                    className='mt-3 mb-0'
                                    style={{ width: '100%' }}
                                    InputLabelProps={{
                                        style: { color: '#777777', fontSize: '12px' },
                                    }}
                                    InputProps={{
                                        style: {
                                            borderRadius: '8px',
                                            backgroundColor: '#FFFFFF',
                                        }
                                    }}
                                />
                                {errors.company_id && <small className='text-danger mb-2 ms-1'>{errors.company_id}</small>}


                                <CssTextField
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                    id="outlined-number"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
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
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility style={{ fontSize: '16px' }} /> : <VisibilityOff style={{ fontSize: '16px' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.password && <small className='text-danger mb-2 ms-1'>{errors.password}</small>}


                                {/* <Link to="/enter-location" className='text-decoration-none'> */}
                                <div className="mt-3">
                                    <Button type='submit' variant="contained" className='ct-box-btn-catering'
                                        style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                                        {loading ? 'Loading...' : 'Get Otp'}
                                    </Button>
                                </div>
                                {/* </Link> */}
                            </form>
                        )}
                    </Formik>
                ) : (
                    <form>
                        <p className='text-center mb-2 enter-otp mt-3'>Please enter Your OTP below</p>
                        <div className="otp-input-fields mb-3">
                            <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
                        </div>

                        <Button disabled={loading} variant="contained" type='submit' className='ct-box-btn-catering' style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                            {loading ? 'Loading...' : 'Submit'}
                        </Button>
                        {/* <p className='ct-box-both' onClick={handleResendOtp}>resend otp in : 30</p> */}

                        <div className="countdown-text">
                            {seconds > 0 || minutes > 0 ? (
                                <p className='ct-box-both'>
                                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                            ) : (
                                <p className='ct-box-both'>Didn't recieve code?</p>
                            )}

                            <button
                                disabled={seconds > 0 || minutes > 0}
                                style={{
                                    color: seconds > 0 || minutes > 0 ? "#c33332" : "#c33332",
                                    margin: '0px auto', textAlign: 'center', border: 'none', width: '100%',
                                    background: '#fff', cursor: 'pointer'
                                }}
                                onClick={handleResendOtp}
                            >
                                Resend OTP
                            </button>
                        </div>


                    </form>
                )}


                {/* <p className='ct-box-both' style={{ fontWeight: '600', color: '#14181b' }}>Forgot Password?</p> */}

                {/* <KeyboardArrowLeftIcon style={{ color: '#57636c', cursor: 'pointer' }} onClick={handleBack} /> */}
            </div>
        </div >
    )
}

export default LoginVendor;
