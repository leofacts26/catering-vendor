import TopHeader from "../components/global/TopHeader";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import YearlyPlan from "../components/global/YearlyPlan";
import { useEffect, useState } from "react";
import MonthlyPlan from "../components/global/MonthlyPlan";
import CustomTabs from "../components/CustomTabs";
import { fetchSubscriptionTypes, setMode } from "../features/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";



const SubscriptionPlan = () => {
  const { mode } = useSelector((state) => state.subscription);
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // const handleModeChange = (e) => {
  //   dispatch(setMode(e.target.value));
  // };


  useEffect(() => {
    dispatch(fetchSubscriptionTypes(mode));
  }, [mode]);


  return (
    <>
      <TopHeader
        title="Business Profile"
        description="below is a business overview"
      />
      <Container maxWidth="lg">
        <div className="card-box-shadow px-5 py-4 mb-4">
          <p className="sub-plan-title text-center">SUBSCRIPTION PLANS</p>
          <p className="branches-desc text-center">
            Choose your subscription types
          </p>

          {/* <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel id="mode-label">Select Mode</InputLabel>
            <Select
              labelId="mode-label"
              id="mode"
              value={mode}
              onChange={handleModeChange}
              label="Select Mode"
            >
              <MenuItem value="live">Live</MenuItem>
              <MenuItem value="test">Test</MenuItem>
            </Select>
          </FormControl> */}


          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className="mt-3 mb-4"
          >
            <CustomTabs activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange} />
          </Stack>
          <br />
          <div className="mt-4">
            {activeTab === 0 && <MonthlyPlan />}
            {activeTab === 1 && <YearlyPlan />}
          </div>

        </div>
      </Container>
    </>
  );
};

export default SubscriptionPlan;
