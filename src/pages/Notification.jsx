import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { api, BASE_URL } from "../api/apiConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from "../features/settingSlice";


const Notification = () => {

  const dispatch = useDispatch()
  const { notificationList } = useSelector((state) => state.settings)

  // const [notifications, setNotifications] = useState([]);
  // const [unreadCount, setUnreadCount] = useState(0);

  // useEffect(() => {
  //   setNotifications(notificationList);
  //   setUnreadCount(notificationList.filter(n => !n.read).length);
  // }, []);

  //     < div style = {{ position: "relative" }
  // }>
  //   <NotificationsIcon style={{ fontSize: "30px" }} />
  // {
  //   unreadCount > 0 && (
  //     <span style={{
  //       position: "absolute",
  //       top: 0,
  //       right: 0,
  //       width: "10px",
  //       height: "10px",
  //       borderRadius: "50%",
  //       background: "red"
  //     }}></span>
  //   )
  // }
  // </ >

  // Mark as Read when User Opens
  // const handleOpenNotifications = () => {
  //   setNotifications(prev =>
  //     prev.map(n => ({ ...n, read: true }))
  //   );
  //   setUnreadCount(0);
  // };





  useEffect(() => {
    dispatch(fetchNotification())
  }, [])



  return (
    <>
      <TopHeader title="Notifications" description="Below is your All Notifications" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-3 py-4 mb-4'>

          {/* <Stack direction="row" justifyContent="end">
            <p className="mark-read">Mark all as read</p>
          </Stack> */}

          {notificationList?.length > 0 ? (
            notificationList.map((item) => (
              <div key={item.id} style={{ padding: '0px 10px' }}>
                <Stack direction="row" justifyContent="space-between" spacing={0}>

                  <Stack sx={{ width: '80%' }}>
                    <p className='notification-para'>
                      <strong>{item.title}</strong>
                    </p>

                    <p className='notification-para'>
                      {item.message}
                    </p>
                  </Stack>


                  <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '10%' }}>
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