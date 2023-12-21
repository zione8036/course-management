import React from "react";
import { routes } from "../routes";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const NavbarButton = (
  <>
    {routes.map((item, index) => (
      <ListItemButton key={index} href={item.path}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
  </>
);

export default NavbarButton;
