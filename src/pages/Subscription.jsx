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



const Subscription = () => {
  const { activeSubscriptionList } = useSelector((state) => state.subscription)
  const dispatch = useDispatch();

  // const {activeSubscription} = activeSubscriptionList;
  console.log(activeSubscriptionList?.activeSubscription, "activeSubscription activeSubscription");


  useEffect(() => {
    dispatch(fetchActiveSubscription())
  }, [])

  // console.log(activeSubscription, "activeSubscription activeSubscription");

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
                      <DoneIcon style={{ fontSize: '18px', color: '#459412' }} /> <h4 className="subscription-green">
                        {activeSubscriptionList?.activeSubscription?.status} </h4>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Plan:</p>
                    <Button variant="contained" className="subscribe-btn"> {activeSubscriptionList?.activeSubscription?.subscription_name} </Button>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Type:</p>
                    <h4 className="subscription-dark"> {activeSubscriptionList?.activeSubscription?.subscription_pattern} </h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Subscription Charges:</p>
                    <h4 className="subscription-dark"> {activeSubscriptionList?.activeSubscription?.final_amount} </h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Date of Subscription:</p>
                    <h4 className="subscription-dark"> {startFormattedDate} </h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                    <p className="subscription-type">Expiry Date:</p>
                    <h4 className="subscription-dark">{starendFormattedDate}</h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3 mb-4">
                    <p className="subscription-type">Remaining Days:</p>
                    <h4 className="subscription-dark">235 Days</h4>
                  </Stack>


                  <Link to="/dashboard/subscription-plan" className="text-decoration-none">
                    <Button variant="contained" className="inquiries-btn mx-auto taxt-center"> Upgrade Subscription </Button>
                  </Link>



                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>

    </>
  )
}

export default Subscription