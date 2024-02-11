import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
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

export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    axios
      .get("/courses/getCourses")
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
  }, []);
  const deleteCourse = (data) => {
    // console.log(data);
    axios
      .delete("/courses/deleteCourse", { data: { id: data } })
      .then((res) => {
        // console.log(res.data);
        axios
        .get("/courses/getCourses")
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
      })
      .catch((err) => {
        // console.error(err);
      });
  };
  const navigate = useNavigate();
  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    responsive: "standard",
    elevation: 0,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      // console.log(rowData[4]);
      // fetchSections(rowData[4]);
      // sectionList.pop();

      return (
        <tr>
          <td colSpan={colSpan}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: 2,
                mx: 2,
                alignItems: "center",
              }}>
              <Typography variant="h5">Sections</Typography>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(`/coursemanagement/coursesections/${rowData[4]}`)
                }>
                Update
              </Button>
            </Box>
            <Box sx={{ m: 2 }}>
              <SectionTable courseId={rowData[4]} />
            </Box>
          </td>
        </tr>
      );
    },
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
        filter: false,

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
              <Tooltip title="Edit">
                <Button
                  onClick={() => {
                    // console.log(data);
                    navigate(`/coursemanagement/editcourse/${data}`);
                  }}>
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  color="error"
                  onClick={() => {
                    deleteCourse(data);
                  }}>
                  <DeleteOutlineIcon />
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
        <Typography variant="h4">Courses</Typography>
        <Typography variant="p">
          This section is to create and modify courses.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/coursemanagement/addcourse");
          }}>
          Add Course
        </Button>
      </Box>
      <Box>
        <StyledMUIDataTable
          title={""}
          data={courseList}
          columns={columns}
          options={options}
        />
      </Box>
    </>
  );
}
