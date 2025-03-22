// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Alert, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const QuickCreateAlert = ({ onConfirm }) => {
//   const { listVendorQuickCreateData } = useSelector((state) => state.subscription);
//   const navigate = useNavigate()


//   const handleConfirm = () => {
//     navigate("/dashboard/subscription-quick-create")
//   };

//   const handleClose = () => {
//   };

//   return (
//     <>
//       {listVendorQuickCreateData && (
//         <Box sx={{ margin: 2 }}>
//           <Alert severity="info" action={
//             <>
//               <Button color="inherit" size="small" onClick={handleConfirm}>
//                 Yes
//               </Button>
//               <Button color="inherit" size="small" onClick={handleClose}>
//                 No
//               </Button>
//             </>
//           }>
//             You have a quick link to create. Do you want to proceed?
//           </Alert>
//         </Box>
//       )}
//     </>
//   );
// };

// export default QuickCreateAlert;
