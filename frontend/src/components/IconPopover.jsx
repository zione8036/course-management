import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Popover, Typography } from "@mui/material";

const IconPopover = ({ anchorEl, handleClose, handleClick }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
        <SettingsIcon />
      </IconButton>{" "}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>Logout</Typography>
      </Popover>
    </>
  );
};

export default IconPopover;
