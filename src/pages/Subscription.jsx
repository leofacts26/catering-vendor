import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';

const Subscription = () => {


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
                     <DoneIcon style={{fontSize: '18px', color: '#459412'}} /> <h4 className="subscription-green"> Active</h4>
                     </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                      <p className="subscription-type">Subscription Plan:</p>
                      <Button variant="contained" className="subscribe-btn">Branded</Button>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                      <p className="subscription-type">Subscription Type:</p>
                      <h4 className="subscription-dark">Annual</h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                      <p className="subscription-type">Subscription Charges:</p>
                      <h4 className="subscription-dark">12,000</h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                      <p className="subscription-type">Date of Subscription:</p>
                      <h4 className="subscription-dark">Jun 24, 2024</h4>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-3">
                      <p className="subscription-type">Expiry Date:</p>
                      <h4 className="subscription-dark">Oct 12, 2025</h4>
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