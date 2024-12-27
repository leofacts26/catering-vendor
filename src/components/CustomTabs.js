import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const CustomTabs = ({ activeTab, setActiveTab, handleTabChange }) => {


  return (
    <Box sx={{ width: "100%", marginBottom: '15px' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{
          style: {
            display: "none", // Remove the default indicator
          },
        }}
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "0px",
          },
        }}
      >
        {/* <div className="" style={{backgroundColor: 'rgb(0 0 0 / 4%)'}}> */}
          <Tab
            label="monthly"
            className={activeTab === 0 ? "custom-tab active-tab" : "custom-tab"}
            onClick={() => setActiveTab(0)}
          />
          <Tab
            label="yearly"
            className={activeTab === 1 ? "custom-tab active-tab" : "custom-tab"}
            onClick={() => setActiveTab(1)}
          />
        {/* </div> */}
      </Tabs>

    </Box>
  );
};

export default CustomTabs;
