
import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useGetVendor from "../hooks/useGetVendor";
import GstnNumber from "../components/settings/GstnNumber";
import Avatar from '@mui/material/Avatar';
import ResetPasswordSettings from "../components/settings/ResetPasswordSettings";
import FssaiPhoto from "../components/gallery/FssaiPhoto";
import PanCard from "../components/gallery/PanCard";
import AadharCard from "../components/gallery/AadharCard";

const Settings = () => {
  const vendorBusinessProfile = useGetVendor();

  return (
    <>
      <TopHeader title="Settings" description="Manage all your personal settings here" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-5 py-4 mb-4'>
          <div className='mt-3 bg-primary'>
          </div>
          <Grid container spacing={2} className='box-negative'>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className="ct-box ct-box-padding">
                <div className="px-4">

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2}>
                      <Avatar sx={{ bgcolor: '#C33332' }}>{vendorBusinessProfile?.vendor_service_name?.slice(0, 1)}</Avatar>
                      <div>
                        <h3 className="settings-user-name"> {vendorBusinessProfile?.vendor_service_name} </h3>
                        <p className="settings-user-number"> {vendorBusinessProfile?.phone_number} </p>
                      </div>
                    </Stack>
                    <EditIcon style={{ color: '#c33332', fontSize: '18px' }} />
                  </Stack>

                  <h2 className="company-id mt-3">Company ID - {vendorBusinessProfile?.company_id} </h2>
                  <p className="company-change-password mt-2 mb-3">Change Login Password below</p>

                  <ResetPasswordSettings />

                  <Divider
                    className='mt-3'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px'
                    }}
                  />

                  <p className="company-change-password mt-3 mb-3">Documents</p>

                  
                  <AadharCard />
                  

                  <PanCard />

                  <GstnNumber />

                  

                  <FssaiPhoto />

                  <Divider
                    className='mt-3'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px'
                    }}
                  />

                  <p className="company-change-password mt-3 mb-3">Links</p>

                  <Link to="/dashboard/about-us" className="text-decoration-none">
                    <Stack className="setting-link-box" direction="row" justifyContent="space-between" alignItems="center">
                      <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}>About Us</p>
                      <KeyboardArrowRightIcon style={{ fontSize: '18px', color: '#57636c' }} />
                    </Stack>
                  </Link>

                  <Link to="/dashboard/faq" className="text-decoration-none">
                    <Stack className="setting-link-box mt-3" direction="row" justifyContent="space-between" alignItems="center">
                      <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}>FAQ's</p>
                      <KeyboardArrowRightIcon style={{ fontSize: '18px', color: '#57636c' }} />
                    </Stack>
                  </Link>

                  <Divider
                    className='mt-3'
                    variant="middle"
                    style={{
                      backgroundColor: '#c33332',
                      margin: '0px'
                    }}
                  />

                  <p className="company-change-password mt-3 mb-3">Help Desk / Support</p>

                  <Link to="/dashboard/raise-ticket">
                    <Button variant="contained" className="cuisines-list-btn" style={{ width: '100%', fontWeight: '500' }}> Raise a Ticket </Button>
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

export default Settings