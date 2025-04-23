import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux'
import LoginVendor from './LoginVendor';
import useRegistration from '../../hooks/useRegistration';
import { inputNumberLimit, vendor_type } from '../../constant';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
    phone_number: '',
    // phone_number_extension: '+91',
    vendor_type: vendor_type
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
                        required
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



const LoginVendorResetCreds = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);

    const [value, setValue] = useState('1');
    const [showOtp, setShowOtp] = useState(true)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const user = useSelector((state) => state.user.userData)
    const { loading, loginVendorResetCreds, verifyResetCredsOtp, resendOtp } = useRegistration();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    // validation schema 
    const schema = Yup.object().shape({
        phone_number: Yup.string()
            .required('Phone number is required.')
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 digits')
            .max(15, 'Phone number must not exceed 15 digits'),
    });

    // onHandleRegisterSubmit 
    const handleSubmit = async (regData, resetForm) => {
        loginVendorResetCreds(regData, setShowOtp, initialState);
        resetForm(initialState);
    }



    // onOtpSubmit 
    const onOtpSubmit = (otp) => {
        verifyResetCredsOtp(otp, user, setOtp, setValue);
        console.log('Login Successfully', otp);
    }


    // resendOtp 
    const handleResendOtp = async () => {
        try {
            setMinutes(0);
            setSeconds(30);
            await resendOtp(user);
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


    return (
        <>
            <Container maxWidth="lg">
                <div className='mt-3 bg-primary'>
                    <h1 className='ct-heading'>catering Service</h1>
                </div>
                <Grid container spacing={2} className='box-negative'>
                    <Grid item xs={12} sm={6.5} md={4.5} lg={4.5}>
                        <div className="ct-box">
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }} className="custom-tab-list">
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Create Account" value="1" sx={{ fontSize: '12px', '&.Mui-selected': { color: '#14181b' } }} />
                                            <Tab label="Log In" value="2" sx={{ fontSize: '12px', '&.Mui-selected': { color: '#14181b' } }} />
                                        </TabList>
                                    </Box> */}
                                    <TabPanel value="1" style={{ padding: '0px' }} className='mt-4'>
                                        <div>
                                            {showOtp ?
                                                <>
                                                    <Formik initialValues={initialState} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                                                        {({ values, errors, handleChange, handleSubmit }) => (
                                                            <form onSubmit={handleSubmit} className="px-4">
                                                                <h4 className='ct-create-account'>Get Account Credentials</h4>
                                                                <CssTextField
                                                                    variant="outlined"
                                                                    label="Enter your Phone Number"
                                                                    className='mt-3'
                                                                    style={{ width: '100%' }}
                                                                    name='phone_number'
                                                                    value={values?.phone_number}
                                                                    onChange={handleChange}
                                                                    InputLabelProps={{
                                                                        style: { color: '#777777', fontSize: '12px' },
                                                                    }}
                                                                    inputProps={{ maxLength: inputNumberLimit }}
                                                                    InputProps={{
                                                                        style: {
                                                                            borderRadius: '8px',
                                                                            backgroundColor: '#FFFFFF',
                                                                        }
                                                                    }}
                                                                />
                                                                {errors.phone_number && <small className='text-danger mt-2 ms-1'>{errors.phone_number}</small>}

                                                                <div className="mt-4">
                                                                    <Button disabled={loading} variant="contained" type='submit' className='ct-box-btn-catering ' style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                                                                        {loading ? 'Loading...' : 'Get OTP'}
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        )}
                                                    </Formik>
                                                </>
                                                : <form>
                                                    <p className='text-center mb-3 enter-otp'>Please enter Your OTP below</p>
                                                    <div className="otp-input-fields mb-3">
                                                        <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
                                                    </div>

                                                    <Button disabled={loading} variant="contained" type='submit' className='ct-box-btn-catering' style={{ textTransform: 'capitalize', margin: '0px auto', display: 'block' }}>
                                                        {loading ? 'Loading...' : 'Submit'}
                                                    </Button>
                                                    {/* <p className='ct-box-both' onClick={handleResendOtp}>resend otp in : 30</p> */}

                                                    {/* <div className="countdown-text">
                                                        {seconds > 0 || minutes > 0 ? (
                                                            <p className='ct-box-both'>
                                                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                                                {seconds < 10 ? `0${seconds}` : seconds}
                                                            </p>
                                                        ) : (
                                                            <p className='ct-box-both'>Didn't Receive code?</p>
                                                        )}

                                                        <Box style={{ width: '100%', textAlign: 'center' }}>
                                                            <button
                                                                disabled={seconds > 0 || minutes > 0}
                                                                style={{
                                                                    color: seconds > 0 || minutes > 0 ? "#57636c" : "#c33332",
                                                                    margin: '0px auto', textAlign: 'center', border: 'none',
                                                                    background: '#fff', cursor: 'pointer'
                                                                }}
                                                                onClick={handleResendOtp}
                                                            >
                                                                Resend OTP
                                                            </button>
                                                        </Box>
                                                    </div> */}

                                                </form>}

                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2" style={{ padding: '0px' }} className='mt-4'>
                                        <LoginVendor />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default LoginVendorResetCreds