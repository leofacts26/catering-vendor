import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL } from "../api/apiConfig";
import toast from "react-hot-toast";
import { datavalidationerror } from "../utils";

const initialState = {
  isLoading: false,
  subscriptionData: [],
  couponCode: '',
  // checkedSubscriptionIds: [],
  selectedSubscription: null,
  discoundedData: null,
  subscribeData: null,
  activeSubscriptionList: null,
  calculaterOrderData: {},
  cancelSubData: {}
  // couponStatus: null,
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
    const { subscriptionTypeId, subscriptionDuration } = data;
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
      // toast.success(response.data.status)
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
      // console.log(response, "responseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse");
      return response;
    } catch (error) {
      console.log(error);
      toast.error(datavalidationerror(error))
    }
  }
);



export const createRecurringTimePayment = createAsyncThunk(
  "homepage/createRecurringTimePayment",
  async (data, thunkAPI) => {
    // console.log(data, "data slice");

    try {
      const response = await api.post(`/rz-create-subscription`, data, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
        },
      });

      // console.log(response, "response createRecurringTimePayment");


      // Display success toast message if the response is successful
      // toast.success(
      //   response.data.status === "success"
      //     ? "Subscription created successfully"
      //     : response.data.couponCode
      //       ? "Coupon Code Applied"
      //       : "Operation successful"
      // );

      return response.data;
    } catch (error) {
      console.error("Error creating subscription:", error.response?.data || error.message);

      // Improved error message
      toast.error(error.response?.data?.message || "Failed to create subscription");

      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const cancelRecurringTimePayment = createAsyncThunk(
  "homepage/cancelRecurringTimePayment",
  async (data, thunkAPI) => {
    console.log("Payload to API:", data);
    try {
      const response = await api.post(`/vendor-rz-cancel-subscription`, data, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error creating subscription:", error.response?.data || error.message);

      // Improved error message
      toast.error(error.response?.data?.message || "Failed to create subscription");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);



export const fetchActiveSubscription = createAsyncThunk(
  "homepage/fetchActiveSubscription",
  async (user, thunkAPI) => {
    const { vendor_id } = thunkAPI.getState().user.vendorId;
    // console.log(vendor_id, "vendorIdvendorIdvendorId");
    try {
      const response = await api.get(
        `${BASE_URL}/rz-get-current-active-and-queued-subscriptions?vendorId=${vendor_id}`,
        {
          headers: {
            authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
          },
        }
      );
      return response?.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
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
    // setCouponStatus: (state, action) => {
    //   state.couponStatus = action.payload;
    // },
    // toggleSubscriptionCheck: (state, action) => {
    //   const subscriptionId = action.payload;
    //   // If the subscriptionId is already checked, uncheck it
    //   if (state.checkedSubscriptionIds.includes(subscriptionId)) {
    //     state.checkedSubscriptionIds = [];
    //   } else {
    //     // Otherwise, only keep the new subscriptionId
    //     state.checkedSubscriptionIds = [subscriptionId];
    //   }
    // }
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
      })
      // fetchActiveSubscription 
      .addCase(fetchActiveSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActiveSubscription.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.activeSubscriptionList = payload;
      })
      .addCase(fetchActiveSubscription.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // calculateOrderTotal 
      .addCase(calculateOrderTotal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateOrderTotal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.calculaterOrderData = payload;
      })
      .addCase(calculateOrderTotal.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createRecurringTimePayment 
      .addCase(createRecurringTimePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecurringTimePayment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createRecurringTimePayment.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // cancelRecurringTimePayment 
      .addCase(cancelRecurringTimePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelRecurringTimePayment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cancelSubData = payload;
      })
      .addCase(cancelRecurringTimePayment.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      });
  },
});

export const { setCouponCode, setSelectedSubscription, setDiscountedData, setSubscribeData } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
