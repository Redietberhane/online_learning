import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "../../../node_modules/@mui/material/index";
import { useNavigate } from "../../../node_modules/react-router/dist/index";
import axios from "../../../node_modules/axios/index";

function Logout() {
  const navigate = useNavigate();
  const [d, setD] = useState(true);
  function Logout() {
    const response = axios.get("http://localhost:8800/api/auth/logoutAdmin", {
      withCredentials: true,
    });
    setD((s) => !s);
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignCenter: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "#374151" }}>
          Are You sure,
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ color: "#374151" }}>
          You want to Logout ?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignCenter: "center",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              Logout();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Logout;
