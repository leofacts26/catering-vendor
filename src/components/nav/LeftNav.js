import { Link, NavLink } from "react-router-dom"
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Stack from '@mui/material/Stack';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import Drawer from '@mui/material/Drawer';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import WebAssetRoundedIcon from '@mui/icons-material/WebAssetRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import StackedBarChartRoundedIcon from '@mui/icons-material/StackedBarChartRounded';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PersonIcon from '@mui/icons-material/Person';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SettingsIcon from '@mui/icons-material/Settings';
import { api, BASE_URL } from "../../api/apiConfig";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import useGetVendor from "../../hooks/useGetVendor";


const leftnav = [
  { "title": "Manage Your Account" },
  { "id": "1", "name": "Dashboard", "icon": <StackedBarChartRoundedIcon className="ln-icon" />, "url": "/" },
  { "id": "2", "name": "inquiries", "icon": <EditNoteIcon className="ln-icon" />, "url": "/dashboard/inquiries" },
  { "id": "3", "name": "reviews", "icon": <AnnouncementIcon className="ln-icon" />, "url": "/dashboard/reviews" },

  { "title": "Services" },
  { "id": "4", "name": "Cuisines", "icon": <RestaurantRoundedIcon className="ln-icon" />, "url": "/dashboard/cuisines" },
  { "id": "5", "name": "occasions", "icon": <CelebrationRoundedIcon className="ln-icon" />, "url": "/dashboard/occasions" },
  { "id": "6", "name": "packages", "icon": <WebAssetRoundedIcon className="ln-icon" />, "url": "/dashboard/packages" },

  { "title": "Profiles" },
  { "id": "7", "name": "business Profile", "icon": <PersonIcon className="ln-icon" />, "url": "/dashboard/businesss-profile" },
  { "id": "8", "name": "Photo gallery", "icon": <PhotoLibraryRoundedIcon className="ln-icon" />, "url": "/dashboard/photo-gallery" },
  { "id": "9", "name": "branches", "icon": <BusinessRoundedIcon className="ln-icon" />, "url": "/dashboard/branches" },

  { "title": "Manage App" },
  { "id": "10", "name": "Subscription", "icon": <SubscriptionsIcon className="ln-icon" />, "url": "/dashboard/subscription" },
  { "id": "11", "name": "Settings", "icon": <SettingsIcon className="ln-icon" />, "url": "/dashboard/settings" }
];


const LeftNav = () => {
  // const classes = useStyles();
  const { vendorBusinessProfile } = useGetVendor();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <div className="nav-bg">
      <div className="red-nav-bg">
        <Stack direction='row' alignItems="center" spacing={0} className="left-nav-title">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} className="mobile-menu">
            <MenuIcon />
          </IconButton>
          <RestaurantMenuIcon style={{ color: '#fff' }} />  <h2 className="ln-title ms-2">Catering Service</h2>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" className="mobile-none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: '#C33332' }}>{vendorBusinessProfile?.point_of_contact_name?.slice(0, 1)}</Avatar>
            <div>
              <h2 className="m-0 text-white nav-username">{vendorBusinessProfile?.point_of_contact_name}</h2>
              <p className="m-0 text-white nav-gmail">{vendorBusinessProfile?.phone_number}</p>
            </div>
          </Stack>
          <Stack>
            <Link to="/dashboard/notification"> <NotificationsNoneIcon style={{ color: '#fff' }} /> </Link>
          </Stack>
        </Stack>
      </div>

      <div className="nav-bottom mobile-none">
        {leftnav.map((item, index) => {
          if (item.title) {
            return <Stack key={index} direction="row" sx={{ width: '100%' }} className="ps-3 pb-2">
              <p className="ln-sub-title">{item.title}</p>
            </Stack>
          } else {
            return (
              <NavLink className="text-white nav-links" to={item.url} key={index}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', margin: '0px', padding: '0px' }}>
                  <span className="left-line"></span> <span>{item.icon} </span> <span className="nav-name">{item.name}</span>
                </Stack>
              </NavLink>
            )
          }
        })}
        {/* <button className="logout-btn">logout</button> */}
      </div>

      {/* Mobile Drawer  */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer} >
        <div style={{ backgroundColor: '#C33332' }} className="pt-4 ps-2">
          {leftnav.map((item, index) => {
            if (item.title) {
              return <Stack key={index} direction="row" sx={{ width: '100%' }} className="ps-3 pb-2">
                <p className="ln-sub-title">{item.title}</p>
              </Stack>
            } else {
              return (
                <NavLink onClick={handleCloseDrawer} className="text-white nav-links" to={item.url} key={index}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                    <span className="left-line"></span> <span>{item.icon} </span> <span className="nav-name">{item.name}</span>
                  </Stack>
                </NavLink>
              )
            }
          })}
        </div>
      </Drawer>


    </div>
  )
}

export default LeftNav
