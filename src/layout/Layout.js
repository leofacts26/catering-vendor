import { Outlet, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import LeftNav from "../components/nav/LeftNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { listVendorQuickCreate } from "../features/subscriptionSlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const Layout = () => {
  const { accessToken } = useSelector((state) => state.user);
  const { listVendorQuickCreateData } = useSelector((state) => state.subscription);
  // console.log(listVendorQuickCreateData, "listVendorQuickCreateData");


  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false);

  // if accesstoken is not there redirect to login page 
  useEffect(() => {
    if (!accessToken) {
      navigate("/create-account");
    }
  }, [])



  // if accesstoken expired redirect to login page 
  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      // console.log(decodedToken.exp < currentTime, "decodedToken.exp < currentTime");
      if (decodedToken.exp < currentTime) {
        navigate("/create-account");
      }
    }
  }, [accessToken, navigate]);


  useEffect(() => {
    dispatch(listVendorQuickCreate())
  }, [])

  // Open modal only if listVendorQuickCreateData exists and status is "active"
  useEffect(() => {
    if (listVendorQuickCreateData && listVendorQuickCreateData.status?.toLowerCase() === "active") {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [listVendorQuickCreateData]);



  const handleConfirm = () => {
    navigate("/dashboard/subscription-quick-create");
    setOpenModal(false);
  };



  return (
    <>
      <div className="dashboard-container">
        <Grid container spacing={0} >
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <LeftNav />
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <div className="outlet-container mx-0">
              <Outlet />
            </div>
          </Grid>
        </Grid>
      </div>


      {/* Modal Popup */}
      <Dialog open={openModal}>
        <DialogTitle>Quick Create Alert</DialogTitle>
        <DialogContent>
          You have a quick link to create. Do you want to proceed?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default Layout;
