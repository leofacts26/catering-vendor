import React from "react";
import Box from "@mui/material/Box";

const LoadingAnimation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#5469d4", // Stripe blue
            animation: "stripe-bounce 1.2s infinite ease-in-out",
            animationDelay: "0s",
          }}
        ></Box>
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#5469d4",
            animation: "stripe-bounce 1.2s infinite ease-in-out",
            animationDelay: "0.3s",
          }}
        ></Box>
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#5469d4",
            animation: "stripe-bounce 1.2s infinite ease-in-out",
            animationDelay: "0.6s",
          }}
        ></Box>
      </Box>
      <style>
        {`
        @keyframes stripe-bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}
      </style>
    </Box>
  );
};

export default LoadingAnimation;
