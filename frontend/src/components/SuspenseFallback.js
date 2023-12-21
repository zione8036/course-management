import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SuspenseFallback = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}
    >
      <CircularProgress size={80} />
    </div>
  );
};

export default SuspenseFallback;
