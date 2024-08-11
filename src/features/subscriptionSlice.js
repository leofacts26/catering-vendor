import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL } from "../api/apiConfig";
import toast from "react-hot-toast";
import { datavalidationerror } from "../utils";

const initialState = {
  isLoading: false,
  subscriptionData: [],
  couponCode: '',
  checkedSubscriptionIds: [],
  selectedSubscription: null,
  discoundedData: null,
  subscribeData: null,
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

export const calculateOrderTotal = createAsyncThunk(
  "homepage/calculateOrderTotal",
  async (data, thunkAPI) => {
    const { couponCode } = thunkAPI.getState().subscription;
    const { subscriptionTypeId } = data;
    const subscriptionDuration = "monthly";
    const updatedData = {
      subscriptionTypeId,
      subscriptionDuration,
      couponCode
    }
    try {
      const response = await api.post(`/rz-calculate-order-total`, updatedData, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
        },
      });
      toast.success(`${response.data.status ? response.data.status : response.data.couponCode !== null && 'Coupon Code Applied'} `)
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(datavalidationerror(error))
    }
  }
);


export const createOneTimePayment = createAsyncThunk(
  "homepage/createOneTimePayment",
  async (data, thunkAPI) => {
    const { couponCode } = thunkAPI.getState().subscription.discoundedData;
    const { subscriptionTypeId } = thunkAPI.getState().subscription.subscribeData;
    const id = Number(subscriptionTypeId)
    const subscriptionDuration = "monthly";
    const updatedData = {
      subscriptionTypeId: id,
      subscriptionDuration,
      couponCode: couponCode
    }
    try {
      const response = await api.post(`/rz-create-one-time-payment`, updatedData, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
        },
      });
      toast.success(`${response.data.status ? response.data.status : response.data.couponCode !== null && 'Coupon Code Applied'} `)
      console.log(response, "responseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse");
      return response;
    } catch (error) {
      console.log(error);
      toast.error(datavalidationerror(error))
    }
  }
);


export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    setSelectedSubscription: (state, action) => {
      state.selectedSubscription = action.payload;
    },
    setDiscountedData: (state, action) => {
      state.discoundedData = action.payload;
    },
    setSubscribeData: (state, action) => {
      state.subscribeData = action.payload;
    },
    toggleSubscriptionCheck: (state, action) => {
      const subscriptionId = action.payload;
      // If the subscriptionId is already checked, uncheck it
      if (state.checkedSubscriptionIds.includes(subscriptionId)) {
        state.checkedSubscriptionIds = [];
      } else {
        // Otherwise, only keep the new subscriptionId
        state.checkedSubscriptionIds = [subscriptionId];
      }
    }
  },
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

export const { setCouponCode, toggleSubscriptionCheck, setSelectedSubscription, setDiscountedData, setSubscribeData } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
