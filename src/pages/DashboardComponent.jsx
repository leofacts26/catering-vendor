import TopHeader from "../components/global/TopHeader"
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DoneIcon from '@mui/icons-material/Done';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const DashboardComponent = () => {
  return (
    <>
      <TopHeader title="My Dashboard" description="Below is your Business Overview" date="December 25, 2023" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-2 py-4 mb-4'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <div className="dashboard-top">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <p className="sub-status">Your Subscription Status:</p>
                  <Stack direction="row" spacing={1} alignItems="center" className="ms-2">
                    <DoneIcon style={{ fontSize: '18px', color: '#459412' }} /> <h4 className="subscription-green ms-1"> Active</h4>
                  </Stack>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <div className="dashboard-top">
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                  <p className="sub-status">Subscription Type:</p>
                  <Button variant="contained" className="branded-btn">Branded</Button>

                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <div className="dashboard-top">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <p className="sub-status">Subscription Remaining Days:</p>
                  <h2 className="dashboard-days">235 Days</h2>
                </Stack>
              </div>
            </Grid>
          </Grid>


          <Grid container spacing={2} className="mt-3 mb-2">
            <Grid item xs={12} sm={6} md={6} lg={3}  style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="dashboard-red">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <VisibilityIcon style={{ color: '#fff', fontSize: '18px' }} />
                  <div>
                    <p className="dashboard-sub-title">Total number of Views</p>
                    <h2 className="dashboard-numbers">6254</h2>
                  </div>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}  style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="dashboard-red">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EditNoteIcon style={{ color: '#fff', fontSize: '18px' }} />
                  <div>
                    <p className="dashboard-sub-title">Total Inquires</p>
                    <h2 className="dashboard-numbers">54</h2>
                  </div>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}  style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="dashboard-red">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AnnouncementIcon style={{ color: '#fff', fontSize: '18px' }} />
                  <div>
                    <p className="dashboard-sub-title">Total Reviews</p>
                    <h2 className="dashboard-numbers">97</h2>
                  </div>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}  style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="dashboard-red">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarMonthIcon style={{ color: '#fff', fontSize: '18px' }} />
                  <div>
                    <p className="dashboard-sub-title">Expiry Date</p>
                    <h2 className="dashboard-numbers">23/05/2025</h2>
                  </div>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default DashboardComponent