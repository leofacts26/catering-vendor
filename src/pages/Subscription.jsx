import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchActiveSubscription } from "../features/subscriptionSlice";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';


const Subscription = () => {
  const { activeSubscriptionList } = useSelector((state) => state.subscription)
  const dispatch = useDispatch();

  // const {activeSubscription} = activeSubscriptionList;
  // console.log(activeSubscriptionList?.activeSubscription, "activeSubscription activeSubscription");


  useEffect(() => {
    dispatch(fetchActiveSubscription())
  }, [])

  // console.log(activeSubscriptionList?.activeSubscription, "activeSubscriptionList activeSubscriptionList");

  const startFormattedDate = moment(activeSubscriptionList?.activeSubscription?.start_date).format("MMM DD, YYYY");
  const starendFormattedDate = moment(activeSubscriptionList?.activeSubscription?.end_date).format("MMM DD, YYYY");

  return (
    <>
      <TopHeader title="Manage Your Subscription" description="Manage your subscription below" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-5 py-4 mb-4'>
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
                    <Button variant="contained" className="subscribe-btn">
                      {activeSubscriptionList?.activeSubscription?.subscription_name ? activeSubscriptionList?.activeSubscription?.subscription_name : 'N/A'} </Button>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Type:</p>
                    <h4 className="subscription-dark">
                      {activeSubscriptionList?.activeSubscription?.subscription_pattern ? activeSubscriptionList?.activeSubscription?.subscription_pattern : 'N/A'}
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
                    <h4 className="subscription-dark">N/A</h4>
                  </Stack>


                  <Link to="/dashboard/subscription-plan" className="text-decoration-none">
                    <Button variant="contained" className="inquiries-btn mx-auto taxt-center">
                      {activeSubscriptionList?.activeSubscription === null ? 'Create Subscription' : 'Upgrade Subscription'}
                    </Button>
                  </Link>



                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>



      <Container maxWidth="lg">
        {activeSubscriptionList?.queuedSubscriptions?.length > 0 && <hr className="mb-4" />}
        {activeSubscriptionList?.queuedSubscriptions?.length > 0 && <h3 className='top-header-title mb-3'>Queud Subscriptions</h3>}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {
              activeSubscriptionList?.queuedSubscriptions?.length > 0 && activeSubscriptionList?.queuedSubscriptions?.map((itemData) => {
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <div className="ct-box-details ct-box-padding">
                      <div className="px-4">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <p className="subscription-type">Vendor Type:</p>
                          <h4 className="subscription-red"> {itemData?.vendor_type} Service</h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Subscription Type (vendorId):</p>
                          <h4 className="subscription-dark">
                            {itemData?.vendor_id ? itemData?.vendor_id : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3 mb-4">
                          <p className="subscription-type">Subscription Status:</p>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {itemData?.status ? <DoneIcon style={{ fontSize: '18px', color: '#459412' }} /> :
                              <CloseIcon style={{ fontSize: '18px', color: '#a81e1e' }} />}

                            <h4 className={itemData?.status ? 'subscription-green' : 'subscription-red'}>
                              {itemData?.status ? itemData?.status : 'InActive'} </h4>
                          </Stack>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Carried Forward Days:</p>
                          <h4 className="subscription-dark">
                            {itemData?.carried_forward_days ? itemData?.carried_forward_days : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Discount Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.discount_amount ? itemData?.discount_amount : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Payment ID:</p>
                          <h4 className="subscription-dark">
                            {itemData?.payment_id ? itemData?.payment_id : 'N/A'}
                          </h4>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Razorpay Order ID:</p>
                          <h4 className="subscription-dark">
                            {itemData?.razorpay_order_id ? itemData?.razorpay_order_id : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="my-3">
                          <p className="subscription-type">Subscription Type:</p>
                          <h4 className="subscription-dark">
                            {itemData?.subscription_pattern ? itemData?.subscription_pattern : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Payment Status:</p>
                          <h4 className="subscription-dark subscription-green">
                            {itemData?.payment_status ? itemData?.payment_status : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Subscription Display Name:</p>
                          <h4 className="subscription-dark">
                            {itemData?.subscription_display_name ? itemData?.subscription_display_name : 'N/A'}
                          </h4>
                        </Stack>



                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Final Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.final_amount ? itemData?.final_amount : 'N/A'}
                          </h4>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Razorpay Final Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.razorpay_final_amount ? itemData?.razorpay_final_amount : 'N/A'}
                          </h4>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Sub Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.sub_amount ? itemData?.sub_amount : 'N/A'}
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
      </Container>



      <Container maxWidth="lg">
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
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <p className="subscription-type">Vendor Type:</p>
                          <h4 className="subscription-red"> {itemData?.vendor_type} Service</h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Subscription Type (vendorId):</p>
                          <h4 className="subscription-dark">
                            {itemData?.vendor_id ? itemData?.vendor_id : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3 mb-4">
                          <p className="subscription-type">Subscription Status:</p>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {itemData?.status ? <DoneIcon style={{ fontSize: '18px', color: '#459412' }} /> :
                              <CloseIcon style={{ fontSize: '18px', color: '#a81e1e' }} />}

                            <h4 className={itemData?.status ? 'subscription-green' : 'subscription-red'}>
                              {itemData?.status ? itemData?.status : 'InActive'} </h4>
                          </Stack>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Carried Forward Days:</p>
                          <h4 className="subscription-dark">
                            {itemData?.carried_forward_days ? itemData?.carried_forward_days : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Discount Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.discount_amount ? itemData?.discount_amount : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Payment ID:</p>
                          <h4 className="subscription-dark">
                            {itemData?.payment_id ? itemData?.payment_id : 'N/A'}
                          </h4>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Razorpay Order ID:</p>
                          <h4 className="subscription-dark">
                            {itemData?.razorpay_order_id ? itemData?.razorpay_order_id : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="my-3">
                          <p className="subscription-type">Subscription Type:</p>
                          <h4 className="subscription-dark">
                            {itemData?.subscription_pattern ? itemData?.subscription_pattern : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Payment Status:</p>
                          <h4 className="subscription-dark subscription-green">
                            {itemData?.payment_status ? itemData?.payment_status : 'N/A'}
                          </h4>
                        </Stack>


                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Subscription Display Name:</p>
                          <h4 className="subscription-dark">
                            {itemData?.subscription_display_name ? itemData?.subscription_display_name : 'N/A'}
                          </h4>
                        </Stack>



                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Final Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.final_amount ? itemData?.final_amount : 'N/A'}
                          </h4>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Razorpay Final Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.razorpay_final_amount ? itemData?.razorpay_final_amount : 'N/A'}
                          </h4>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                          <p className="subscription-type">Sub Amount:</p>
                          <h4 className="subscription-dark">
                            {itemData?.sub_amount ? itemData?.sub_amount : 'N/A'}
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
      </Container>


    </>
  )
}

export default Subscription