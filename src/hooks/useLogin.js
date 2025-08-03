import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setData, setVendorId, setAccessToken, setRefreshToken, setLoginUserData } from '../features/user/userSlice';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { vendor_type } from '../constant';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // registerVendor 
    const loginVendor = async (loginData, setShowOtp) => {
        setLoading(true);
        const loginDataWithVendorType = {
            ...loginData,
            vendor_type: vendor_type
        };
        try {
            const response = await api.post('/login-vendor-send-otp', loginDataWithVendorType);
            // console.log(response.data.data, "response");
            dispatch(setVendorId(response.data.data))
            dispatch(setLoginUserData(loginData));
            setShowOtp(false);
            setLoading(false);
            toast.success(response?.data?.message, { duration: 5000 });
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message, { duration: 5000 });
        }
    };

    // verifyOtp 
    const verifyOtp = async (otp, loginUserData, setOtp, setValue) => {
        const data = {
            otp_code: otp,
            company_id: loginUserData?.company_id,
            vendor_type: vendor_type
        };
        setLoading(true);
        try {
            const response = await api.post('/vendor-login-verify-otp', data);
            dispatch(setAccessToken(response?.data?.data?.accessToken));
            dispatch(setRefreshToken(response?.data?.data?.refreshToken));
            navigate('/dashboard/inquiries')
            toast.success(response?.data?.message, { duration: 5000 });
            setLoading(false);
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message, { duration: 5000 });
        }
    };


    // Resend otp 
    const resendOtp = async (loginUserData) => {
        try {
            const data = {
                company_id: loginUserData?.company_id,
                password: loginUserData?.password,
                vendor_type: vendor_type
            }
            const response = await api.post('/login-vendor-resend-otp', data)
            toast.success(response?.data?.message, { duration: 5000 });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message, { duration: 5000 });
        }
    }

    return { loading, loginVendor, verifyOtp, resendOtp };
};

export default useLogin;
