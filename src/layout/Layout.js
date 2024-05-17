import { Outlet, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import LeftNav from "../components/nav/LeftNav";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Layout = () => {
  const { accessToken } = useSelector((state) => state.user);
  const navigate = useNavigate();

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
      console.log(decodedToken.exp < currentTime, "decodedToken.exp < currentTime");
      if (decodedToken.exp < currentTime) {
        navigate("/create-account");
      }
    }
  }, [accessToken, navigate]);


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
    </>
  )
};

export default Layout;
