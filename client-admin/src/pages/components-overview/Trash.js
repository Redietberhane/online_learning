import {
  Box,
  Typography,
  Button,
  // Tab,
} from "../../../node_modules/@mui/material/index";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BookTrash from "./BookTrash";
import CourseTrash from "./CourseTrash";
import {
  Outlet,
  useNavigate,
} from "../../../node_modules/react-router/dist/index";
import { useState } from "react";

function Trash() {
  // return <CourseTrash />;

  const navigate = useNavigate();
  const [selected, setSelected] = useState("Course");

  return (
    <div>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h4">Trash</Typography>
        <Typography variant="p">
          This section is to modify courses and book.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "start", my: 2 }}>
        <Tabs value={selected} onChange={(e) => setSelected(e.target.value)}>
          <Tab
            value="Course"
            label="Course"
            onClick={() => {
              navigate("/trash");
              // setSelected((s) => !s);
            }}
          />

          <Tab
            value="Book"
            label="Book"
            onClick={() => {
              navigate("/trash/book");
              // setSelected((s) => !s);
            }}
          />
        </Tabs>
      </Box>
      {/* <CourseTrash /> */}
      {/* <BookTrash /> */}
      {/* <Button
        variant="outlined"
        onClick={() => {
          // alert("hhg");
        }}
      >
        hhhhhh
      </Button> */}
      <Outlet />
    </div>
  );
}

export default Trash;
