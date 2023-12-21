import { Link, Typography } from "@mui/material";
import { title } from "../constants";

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        {title.toUpperCase()}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
