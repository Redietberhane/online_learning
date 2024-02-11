import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
// import SectionTable from "components/SectionTable";

export default function QuizList() {
  const [quizList, setQuizList] = useState([]);
  useEffect(() => {
    axios
      .get("/sections/getQuizSections")
      .then((res) => {
        console.log(res.data);
        setQuizList(
          res.data.map((item) => [
            item.course_title,
            item.section_title,
            item.course_level,
            item.section_value,
            item.section_id,
          ])
        );
      })
      .catch((error) => {
        // console.error(error);
      });
  }, []);
  const navigate = useNavigate();
  const options = {
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
      name: "Course Title",
      options: {
        filter: false,
      },
    },
    {
      name: "Section Title",
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
      name: "Value",
      options: {
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
                    navigate(`/quizquestions/questions/${data}`);
                  }}>
                  <EditIcon />
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
        <Typography variant="h4">Quiz List</Typography>
        {/* <Typography variant="p">
          This section is to create and modify quiz questions.
        </Typography> */}
      </Box>
      <Box>
        <StyledMUIDataTable
          title={""}
          data={quizList}
          columns={columns}
          options={options}
        />
      </Box>
    </>
  );
}
