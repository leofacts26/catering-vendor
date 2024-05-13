import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    userData: {},
    loginUserData: {},
    vendorId: {},
    accessToken: "",
    refreshToken: "",
    multiImageDelete: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setData: (state, action) => {
            state.userData = action.payload;
        },
        setLoginUserData: (state, action) => {
            state.loginUserData = action.payload;
        },
        setVendorId: (state, action) => {
            state.vendorId = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        logoutUser: (state) => {
            state.userData = initialState.userData;
            state.loginUserData = initialState.loginUserData;
            state.vendorId = initialState.vendorId;
            state.accessToken = initialState.accessToken;
            state.refreshToken = initialState.refreshToken;
        },
        setMultiImageDelete: (state, action) => {
            state.multiImageDelete = action.payload;
        }
    }
})

export const { setIsLoading, setData, setLoginUserData, setVendorId, setAccessToken, setRefreshToken, logoutUser, setMultiImageDelete } = userSlice.actions;
export default userSlice.reducer