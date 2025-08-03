import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../utils';
import { api, BASE_URL } from '../api/apiConfig';
// import { setAccessToken } from './user/userSlice';
// import { fetchUserData } from './userSlice';

const initialState = {
    isLoading: true,
    editProfileData: null,
    showOtp: true,
}




export const sendUpdateProfileOTP = createAsyncThunk(
    'user/sendUpdateProfileOTP',
    async (data, thunkAPI) => {
        const newData = {
            ...data,
            phone_extension: '+91'
        }
        // console.log(newData, "newData");
        try {
            const response = await api.post(`${BASE_URL}/send-update-vendor-profile-otp`, newData, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            thunkAPI.dispatch(setShowOtp(false));
            toast.success(successToast(response), { duration: 5000 })
        } catch (error) {
            toast.error(datavalidationerror(error), { duration: 5000 })
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const sendUpdateUserProfile = createAsyncThunk(
    'user/sendUpdateUserProfile',
    async (data, thunkAPI) => {
        const { editProfileData, otp } = data;
        const { username, phone_number, phone_extension } = editProfileData;
        const newOTP = otp.join('');
        const updatedData = {
            name: username,
            phone_number: phone_number,
            phone_extension: phone_extension,
            otp: newOTP,
        }
        console.log(updatedData, "5+6956845 newData");
        try {
            const response = await api.post(`${BASE_URL}/update-vendor-phone`, updatedData, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            // console.log(response.data.data.updated_token, "response.data.updated_token response.data.updated_token");
            // thunkAPI.dispatch(setAccessToken(response?.data?.data?.updated_token));
            // console.log(response, "response");

            thunkAPI.dispatch(setShowOtp(true));
            toast.success(response.data.status, { duration: 5000 })
            // thunkAPI.dispatch(fetchUserData());
        } catch (error) {
            toast.error(datavalidationerror(error), { duration: 5000 })
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setEditProfile: (state, { payload }) => {
            state.editProfileData = payload;
        },
        setShowOtp: (state, { payload }) => {
            state.showOtp = payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder


    // }
})


// Action creators are generated for each case reducer function
export const { setEditProfile, setShowOtp } = settingSlice.actions

export default settingSlice.reducer