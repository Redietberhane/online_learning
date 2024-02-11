import React, { useEffect, useState } from 'react'
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { styled } from "@mui/system";

const SectionTable = React.memo(({ courseId }) => {
    const [sectionList, setSectionList] = useState([]);
    const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
        background: theme.palette.background.default,
      }));
    useEffect(() => {
      axios
        .get(`/sections/getCourseSections/${courseId}`)
        .then((response) => {
          // setSections(response.data);
        //   console.log(response.data);
          setSectionList(
            response.data?.map((section) => [
              section.section_title,
              section.section_type,
              section.section_value,
              section.section_content,
            ])
          );
        })
        .catch((error) => {
          // console.error(error);
        });
    }, [courseId]);
    // fetchSections(courseId)
    const sectionOptions = {
      selectableRows: "none",
      responsive: "standard",
      elevation: 1,
    };
    const sectionColumns = [
      {
        name: "Title",
        options: {
          filter: false,
        },
      },
      {
        name: "Type",
        options: {
          filter: true,
        },
      },
      {
        name: "Value",
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: "Content",
        options: {
          filter: false,
          sort: false,
        },
      },
    ];
    return (
      <StyledMUIDataTable
        title={""}
        data={sectionList}
        options={sectionOptions}
        columns={sectionColumns}
      />
    );
})

export default SectionTable;