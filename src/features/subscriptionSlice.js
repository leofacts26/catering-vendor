import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL } from "../api/apiConfig";
import toast from "react-hot-toast";
import { datavalidationerror } from "../utils";

const initialState = {
  isLoading: false,
  subscriptionData: [],
};

export const fetchSubscriptionTypes = createAsyncThunk(
  "homepage/fetchSubscriptionTypes",
  async (user, thunkAPI) => {
    try {
      const response = await api.get(
        `${BASE_URL}/rz-get-razorpay-plans?vendor_type=Caterer`,
        {
          headers: {
            authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
          },
        }
      );      
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSubscriptionTypes
      .addCase(fetchSubscriptionTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubscriptionTypes.fulfilled, (state, { payload }) => {        
        state.isLoading = false;
        state.subscriptionData = payload;
      })
      .addCase(fetchSubscriptionTypes.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      });
  },
});

export const {} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
