import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cancelRecurringTimePayment, fetchActiveSubscription } from "../features/subscriptionSlice";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import toast from "react-hot-toast";
// import QuickCreateAlert from "../components/QuickCreateAlert";
import { CircularProgress } from '@mui/material'; // import loader


const Subscription = () => {
  const { activeSubscriptionList, cancelSubData } = useSelector((state) => state.subscription)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveSubscription())
  }, [])

  const startFormattedDate = moment(activeSubscriptionList?.activeSubscription?.start_date).format("MMM DD, YYYY");
  const starendFormattedDate = moment(activeSubscriptionList?.activeSubscription?.end_date).format("MMM DD, YYYY");


  const onHandleCancelSubscription = async (subId) => {

    if (!subId) {
      console.error("Subscription ID is required.");
      return;
    }

    const data = {
      subscription_id: subId
    }

    try {
      const response = await dispatch(cancelRecurringTimePayment(data)).unwrap();
      // console.log(response, "chiru");

      // Check if the cancellation was successful
      if (response.status === "cancelled") {
        toast.success("Subscription cancelled successfully!", { duration: 5000 });
      } else {
        console.warn(
          "Subscription not cancelled programmatically. Opening short_url for manual cancellation."
        );

        // Open the short_url for manual handling if available
        if (response?.shortUrl) {
          window.open(response?.shortUrl, "_blank");
        } else {
          console.error("Short URL is not available.");
        }
      }

      await dispatch(fetchActiveSubscription())
    } catch (error) {
      console.error("Error cancelling subscription:", error);

      // Open the short_url as a fallback if API call fails
      if (cancelSubData?.shortUrl) {
        console.warn("Opening short_url for manual cancellation due to error.");
        window.open(cancelSubData?.shortUrl, "_blank");
      } else {
        console.error("Short URL is not available for manual cancellation.");
      }
    }

  }


  const isLoading = activeSubscriptionList === undefined || activeSubscriptionList === null;

  const isPending = activeSubscriptionList?.pendingSubscriptions?.length !== 0;
  const activeSub = activeSubscriptionList?.activeSubscription;
  const pattern = activeSub?.subscription_pattern?.toLowerCase();


  return (
    <>

      <TopHeader title="Manage Your Subscription" description="Manage your subscription below" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-5 py-4 mb-4'>

          {/* <QuickCreateAlert onConfirm={() => console.log("User confirmed! Proceed with action.")} /> */}


          <div className='mt-3 bg-primary'>
          </div>

          <Grid container spacing={2} className='box-negative'>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className="ct-box ct-box-padding">
                <div className="px-4">

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <p className="subscription-type">Vendor Type:</p>
                    <h4 className="subscription-red">Catering Service</h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Status:</p>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {activeSubscriptionList?.activeSubscription?.status ? <DoneIcon style={{ fontSize: '18px', color: '#459412' }} /> :
                        <CloseIcon style={{ fontSize: '18px', color: '#a81e1e' }} />}

                      <h4 className={activeSubscriptionList?.activeSubscription?.status ? 'subscription-green' : 'subscription-red'}>
                        {activeSubscriptionList?.activeSubscription?.status ? activeSubscriptionList?.activeSubscription?.status : 'InActive'} </h4>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Plan:</p>
                    <Button variant="contained" className="subscribe-btn" style={{ backgroundColor: activeSubscriptionList?.activeSubscription?.display_color || '#57636c' }}>
                      {activeSubscriptionList?.activeSubscription?.subscription_name ? activeSubscriptionList?.activeSubscription?.subscription_name : 'N/A'} </Button>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Type:</p>
                    <h4 className="subscription-dark">
                      {activeSubscriptionList?.activeSubscription?.subscription_pattern_display_text ? activeSubscriptionList?.activeSubscription?.subscription_pattern_display_text : 'N/A'}
                    </h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Charges:</p>
                    <h4 className="subscription-dark"> {activeSubscriptionList?.activeSubscription?.final_amount ? activeSubscriptionList?.activeSubscription?.final_amount : 'N/A'} </h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Date of Subscription:</p>
                    <h4 className="subscription-dark"> {activeSubscriptionList?.activeSubscription?.start_date ? startFormattedDate : 'N/A'} </h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Expiry Date:</p>
                    <h4 className="subscription-dark">{activeSubscriptionList?.activeSubscription?.end_date ? starendFormattedDate : 'N/A'}</h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3 mb-4">
                    <p className="subscription-type">Remaining Days:</p>
                    <h4 className="subscription-dark">{activeSubscriptionList?.activeSubscription?.remaining_days ? activeSubscriptionList?.activeSubscription?.remaining_days : 'N/A'}</h4>
                  </Stack>


                  {isLoading ? (
                    <Button
                      variant="contained"
                      className="inquiries-btn mx-auto text-center"
                      disabled
                    >
                      <CircularProgress size={20} sx={{ color: '#fff' }} />
                    </Button>
                  ) : activeSub === null ? (
                    <Link
                      to={isPending ? 'javascript:void(0)' : '/dashboard/subscription-plan'}
                      className="text-decoration-none"
                    >
                      <Button
                        variant="contained"
                        className="inquiries-btn mx-auto text-center"
                        disabled={isPending}
                      >
                        Get Subscription
                      </Button>
                    </Link>
                  ) : pattern === 'one_time_monthly' || pattern === 'one_time_yearly' ? (
                    <Link
                      to="/dashboard/subscription-plan"
                      className="text-decoration-none"
                    >
                      <Button
                        variant="contained"
                        className="inquiries-btn mx-auto text-center"
                      >
                        Upgrade Subscription
                      </Button>
                    </Link>
                  ) : pattern === 'subscription-monthly' || pattern === 'subscription-yearly' ? (
                    <Button
                      variant="contained"
                      className="inquiries-btn mx-auto text-center"
                      onClick={() =>
                        onHandleCancelSubscription(activeSub?.razorpay_subscription_id)
                      }
                    >
                      Cancel Subscription
                    </Button>
                  ) : null}


                  {/* {activeSubscriptionList?.activeSubscription === null ? (
                    <Link
                      to={
                        activeSubscriptionList?.pendingSubscriptions?.length !== 0
                          ? 'javascript:void(0)'
                          : '/dashboard/subscription-plan'
                      }
                      className="text-decoration-none"
                    >
                      <Button
                        variant="contained"
                        className="inquiries-btn mx-auto text-center"
                        disabled={activeSubscriptionList?.pendingSubscriptions?.length !== 0}
                      >
                        Get Subscription
                      </Button>
                    </Link>
                  ) : activeSubscriptionList?.activeSubscription?.subscription_pattern?.toLowerCase() === "one_time_monthly" || "one_time_Yearly" ? (
                    <Link
                      to='/dashboard/subscription-plan'
                      className="text-decoration-none"
                    >
                      <Button
                        variant="contained"
                        className="inquiries-btn mx-auto text-center"
                      >
                        Upgrade Subscription
                      </Button>
                    </Link>
                  ) : activeSubscriptionList?.activeSubscription?.subscription_pattern?.toLowerCase() === "subscription-monthly" || "subscription-yearly" ? (
                    <Button
                      variant="contained"
                      className="inquiries-btn mx-auto text-center"
                      onClick={() => onHandleCancelSubscription(activeSubscriptionList?.activeSubscription?.razorpay_subscription_id)}
                    >
                      Cancel Subscription
                    </Button>
                  ) : null} */}




                </div>
              </div>
            </Grid>
          </Grid>

          <div>
            {activeSubscriptionList?.queuedSubscriptions?.length > 0 && <hr className="mb-4" />}
            {activeSubscriptionList?.queuedSubscriptions?.length > 0 && <h3 className='top-header-title mb-3'>Queued Subscriptions</h3>}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {
                  activeSubscriptionList?.queuedSubscriptions?.length > 0 && activeSubscriptionList?.queuedSubscriptions?.map((itemData) => {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="ct-box-details ct-box-padding">
                          <div className="px-4">

                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3 mb-4">
                              <p className="subscription-type">Status:</p>
                              <Stack direction="row" spacing={1} alignItems="center">
                                {itemData?.status ? <DoneIcon style={{ fontSize: '18px', color: '#459412' }} /> :
                                  <CloseIcon style={{ fontSize: '18px', color: '#a81e1e' }} />}

                                <h4 className={itemData?.status ? 'subscription-green' : 'subscription-red'}>
                                  {itemData?.status ? itemData?.status : 'InActive'} </h4>
                              </Stack>
                            </Stack>


                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                              <p className="subscription-type">Purchased On</p>
                              <h4 className="subscription-dark">
                                {itemData?.start_date ? moment(itemData?.start_date).format('MMMM DD, YYYY') : 'N/A'}
                              </h4>
                            </Stack>


                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                              <p className="subscription-type">Subscription Plan:</p>
                              <h4 className="subscription-dark">
                                {itemData?.subscription_pattern_display_text ? itemData?.subscription_pattern_display_text : 'N/A'}
                              </h4>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="my-3">
                              <p className="subscription-type">Subscription Type:</p>
                              <h4 className="subscription-dark">
                                {itemData?.subscription_pattern ? itemData?.subscription_pattern : 'N/A'}
                              </h4>
                            </Stack>

                          </div>
                        </div>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Box>
          </div>

          <div>
            {activeSubscriptionList?.pendingSubscriptions?.length > 0 && <hr className="mb-4" />}
            {activeSubscriptionList?.pendingSubscriptions?.length > 0 && <h3 className='top-header-title mb-3'>Pending Subscriptions</h3>}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {
                  activeSubscriptionList?.pendingSubscriptions?.length > 0 && activeSubscriptionList?.pendingSubscriptions?.map((itemData) => {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="ct-box-details ct-box-padding">
                          <div className="px-4">


                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3 mb-4">
                              <p className="subscription-type"> Status:</p>
                              <Stack direction="row" spacing={1} alignItems="center">
                                {itemData?.status ? <DoneIcon style={{ fontSize: '18px', color: '#459412' }} /> :
                                  <CloseIcon style={{ fontSize: '18px', color: '#a81e1e' }} />}

                                <h4 className={itemData?.status ? 'subscription-green' : 'subscription-red'}>
                                  {itemData?.status ? itemData?.status : 'InActive'} </h4>
                              </Stack>
                            </Stack>


                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                              <p className="subscription-type">Purchased On</p>
                              <h4 className="subscription-dark">
                                {itemData?.start_date ? moment(itemData?.start_date).format('MMMM DD, YYYY') : 'N/A'}
                              </h4>
                            </Stack>


                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                              <p className="subscription-type">Subscription Plan:</p>
                              <h4 className="subscription-dark">
                                {itemData?.subscription_pattern_display_text ? itemData?.subscription_pattern_display_text : 'N/A'}
                              </h4>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between" alignItems="center" className="my-3">
                              <p className="subscription-type">Subscription Type:</p>
                              <h4 className="subscription-dark">
                                {itemData?.subscription_pattern ? itemData?.subscription_pattern : 'N/A'}
                              </h4>
                            </Stack>

                          </div>
                        </div>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Box>
          </div>


        </div>
      </Container>



    </>
  )
}

export default Subscription