import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
// import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Typography,
  Box,
  Button,
  Tooltip,
  // ButtonBase,
} from "@mui/material";
import { useNavigate } from "../../../node_modules/react-router/dist/index";
import axios from "axios";
import SectionTable from "components/SectionTable";
async function undeleteCourseById(itemId) {
  try {
    // Replace the URL with your API endpoint and the desired item ID
    const apiUrl = `http://localhost:8800/api/courses/getUndeletedCourses/${itemId}`;

    // Send a DELETE request to delete the item by ID
    const response = await axios.get(apiUrl);

    // Check if the item was deleted successfully
    if (response.status === 200) {
      //   alert(`Item with ID ${itemId} deleted successfully`);
    } else {
      // console.error("Error deleting item");
    }
  } catch (error) {
    // console.error("Error:", error.message);
  }
}
async function deletePermanentCourseById(itemId) {
  try {
    // Replace the URL with your API endpoint and the desired item ID
    const apiUrl = `http://localhost:8800/api/courses/deletedPermanentCourse/${itemId}`;

    // Send a DELETE request to delete the item by ID
    const response = await axios.delete(apiUrl);

    // Check if the item was deleted successfully
    if (response.status === 200) {
      //   alert(`Item with ID ${itemId} deleted successfully`);
    } else {
      // console.error("Error deleting item");
    }
  } catch (error) {
    // console.error("Error:", error.message);
  }
}

export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [state, setState] = useState(true);
  useEffect(() => {
    axios
      .get("/courses/getDeletedCourses")
      .then((res) => {
        setCourseList(
          res.data.map((item) => [
            item.course_title,
            item.course_instructor,
            item.course_level,
            item.course_price,
            item.course_id,
            item.course_rating,
            item.course_sections,
            item.course_students,
            item.course_id,
          ])
        );
      })
      .catch((error) => {
        // console.error(error);
      });
  }, [state]);

  const navigate = useNavigate();
  const options = {
    // filterType: "checkbox",
    elevation: 0,
    selectableRows: "none",
  };
  // const fetchSections = (courseId) => {
  //   let sections = [];
  //   axios
  //     .get(`/sections/getCourseSections/${courseId}`)
  //     .then((response) => {
  //       // setSections(response.data);
  //       sections = response.data;
  //       console.log(sections);
  //       setSectionList(response.data?.map(section => [section.section_title, section.section_type, section.section_value, section.section_content]));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
    background: theme.palette.background.default,
  }));
  const columns = [
    {
      name: "Title",
      options: {
        filter: false,
      },
    },
    {
      name: "Instructor",
      options: {
        filter: false,
      },
    },
    {
      name: "Level",
      options: {
        filter: true,
      },
    },
    {
      name: "Price",
      options: {
        filter: false,
      },
    },
    {
      name: "ID",
      options: {
        sort: false,
        display: false,
        filter: false,
      },
    },
    {
      name: "Rating",
      options: {
        display: true,
        filter: false,
      },
    },
    {
      name: "Sections",
      options: {
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: "Students",
      options: {
        display: true,
      },
    },
    {
      label: "ACTION",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          let data = value;
          return (
            <>
              <Tooltip title="Delete">
                <Button
                  color="error"
                  onClick={() => {
                    deletePermanentCourseById(data);
                    setState((s) => !s);
                  }}
                >
                  <DeleteOutlineIcon />
                </Button>
              </Tooltip>
              <Tooltip title="restore">
                <Button
                  onClick={() => {
                    // deleteCourse(data);

                    undeleteCourseById(data);
                    setState((s) => !s);
                  }}
                >
                  <RestoreIcon />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
      name: "update",
    },
  ];
  return (
    <>
      <Box sx={{ ml: 2 }}>
        {/* <Typography variant="h4">Courses</Typography>
        <Typography variant="p">
          This section is to create and modify courses.
        </Typography> */}
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/coursemanagement/addcourse");
          }}
        >
          Add Course
        </Button>
      </Box> */}
      <Box>
        <StyledMUIDataTable
          title={""}
          data={courseList}
          columns={columns}
          options={options}
          //   options={null}
        />
      </Box>
    </>
  );
}
