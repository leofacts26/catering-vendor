import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setData, setVendorId, setAccessToken, setRefreshToken } from '../features/user/userSlice';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { datavalidationerror, successToast } from '../utils';

const useRegistration = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

     // login reset creds 
     const loginVendorResetCreds = async (registerData, setShowOtp) => {
        setLoading(true);
        try {
            const response = await api.post('/reset-creds-send-otp', registerData);
            dispatch(setVendorId(response?.data?.data));
            dispatch(setData(registerData));
            setShowOtp(false);
            setLoading(false);
            toast.success(successToast(response));
        } catch (error) {
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };

    // registerVendor 
    const registerVendor = async (registerData, setShowOtp) => {
        setLoading(true);
        try {
            const response = await api.post('/register-vendor-send-otp', registerData);
            dispatch(setVendorId(response?.data?.data));
            dispatch(setData(registerData));
            setShowOtp(false);
            setLoading(false);
            toast.success(successToast(response));
        } catch (error) {
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };

    // verifyOtp 
    const verifyResetCredsOtp = async (otp, user, setOtp, setValue) => {
        const data = {
            phone_number: user?.phone_number,
            otp_code: otp,
            vendor_type: user?.vendor_type
        };
        setLoading(true);
        try {
            const response = await api.post('/reset-creds', data);
            console.log(response, "response");
            dispatch(setAccessToken(response?.data?.data?.accessToken));
            dispatch(setRefreshToken(response?.data?.data?.refreshToken));
            navigate('/create-account', { state: { tab: '2' } });
            setValue('2')
            toast.success(response?.data?.message);
            setLoading(false);
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };

    // verifyOtp 
    const verifyOtp = async (otp, user, setOtp, setValue) => {
        const data = {
            phone_number: user?.phone_number,
            otp_code: otp,
            vendor_type: user?.vendor_type
        };
        setLoading(true);
        try {
            const response = await api.post('/register-vendor-verify-otp', data);
            dispatch(setAccessToken(response?.data?.data?.accessToken));
            dispatch(setRefreshToken(response?.data?.data?.refreshToken));
            navigate('/profile-steps')
            toast.success(successToast(response));
            setLoading(false);
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            setLoading(false);
            toast.error(datavalidationerror(error));
        }
    };


    // Resend otp 
    const resendOtp = async (user) => {
        try {
            const data = {
                phone_number: user?.phone_number,
                vendor_type: user?.vendor_type
            }
            const response = await api.post('register-vendor-resend-otp', data)
            toast.success(successToast(response));
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        }
    }

    return { loading, registerVendor, loginVendorResetCreds, verifyOtp, verifyResetCredsOtp, resendOtp };
};

export default useRegistration;
