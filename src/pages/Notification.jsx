import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { api, BASE_URL } from "../api/apiConfig";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from "../features/settingSlice";


const Notification = () => {

  const dispatch = useDispatch()
  const { notificationList } = useSelector((state) => state.settings)


  useEffect(() => {
    dispatch(fetchNotification())
  }, [])



  return (
    <>
      <TopHeader title="Notifications" description="Below is your All Notifications" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-3 py-4 mb-4'>

          <Stack direction="row" justifyContent="end">
            <p className="mark-read">Mark all as read</p>
          </Stack>

          {notificationList?.length > 0 ? (
            notificationList.map((item) => (
              <div key={item.id} style={{ padding: '0px 10px' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                      alt={item.vendor_service_name || "Notification"}
                      src="https://mui.com/static/images/avatar/1.jpg" // You can replace this with dynamic image if available
                      sx={{ width: 30, height: 30 }}
                    />
                    <Stack direction="row" flexDirection="column">
                      <p className='text-dark notification-name'>{item.vendor_service_name}</p>
                      <p className='notification-username'>@{item.vendor_type}</p>
                    </Stack>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <p className='notification-date'>
                      {new Date(item.created_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}
                    </p>
                    {item.is_read === 0 && <span className="notification-red-dot"></span>}
                  </Stack>
                </Stack>

                <p className='notification-para'>
                  <strong>{item.title}:</strong> {item.message}
                </p>

                <div className='mb-3' style={{ marginTop: '20px', borderTop: '1px solid #e0e3e7' }}>
                  <Divider />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No notifications found</p>
          )}




        </div>
      </Container>

    </>
  )
}

export default Notification