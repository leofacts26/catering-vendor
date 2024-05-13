import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';


const Notification = () => {
  return (
    <>
      <TopHeader title="Notifications" description="Below is your All Notifications" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-3 py-4 mb-4'>

          <Stack direction="row" justifyContent="end">
            <p className="mark-read">Mark all as read</p>
          </Stack>

          {[1, 2, 3, 4, 5].map((item) => (
            <div style={{ padding: '0px 10px' }}>

              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{ width: 30, height: 30 }}
                  />
                  <Stack direction="row" flexDirection="column">
                    <p className='text-dark notification-name'>Andrew Hernandez</p>
                    <p className='notification-username'>@username</p>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <p className='notification-date'>Jan. 28th, 4:30pm</p> <span className="notification-red-dot"></span>
                </Stack>
              </Stack>
              <p className='notification-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum error distinctio eligendi! Dolores iure odio in voluptatibus natus officiis repellendus.</p>
          <div className='mb-3' style={{ marginTop: '20px', borderTop: '1px solid #e0e3e7' }}>
            <Divider />
          </div>
            </div>
          ))}



        </div>
      </Container>

    </>
  )
}

export default Notification