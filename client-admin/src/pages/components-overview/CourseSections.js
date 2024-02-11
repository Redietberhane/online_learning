import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "../../../node_modules/react-router/dist/index";
import { Box, Button, Card, Typography } from "@mui/material";
import SectionCard from "components/SectionCard";
import axios from "axios";
import AddSection from "components/AddSection";

export default function CourseSections() {
  const navigate = useNavigate();

  const { id } = useParams();
  const idRef = useRef(id);
  const [sectionList, setSectionList] = useState([]);
  const [addSection, setAddSection] = useState(false);
  const handleAddSection = (data) => {
    setAddSection(data)
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    axios
      .get(`/sections/getCourseSections/${idRef.current}`, {
        signal: controller.signal,
      })
      .then((response) => {
        // console.log(response.data);
        isMounted && setSectionList(response.data);
      })
      .catch((error) => {
        // console.error(error);
      });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const fetchSections = (courseId) => {
    axios
      .get(`/sections/getCourseSections/${courseId}`)
      .then((response) => {
        // console.log(response.data);
        setSectionList(response.data);
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  return (
    <Box sx={{ mx: 2 }}>
      <Box>
        <Typography variant="h4">Sections</Typography>
        <Typography variant="p">
          This is to manage the sections of a course.
        </Typography>
      </Box>
      <Box>
        {sectionList.map((section) => (
          <SectionCard key={section?.section_id} section={section} fetchSections={() => fetchSections(id)} />
        ))}
        {sectionList.length === 0 && !addSection && (
          <Card elevation={0} sx={{ my: 2, py: 4 }}>
            <Typography sx={{ textAlign: "center" }}>
              You have no sections here yet
            </Typography>
          </Card>
        )}
      </Box>
      <Box sx={{ my: 3 }}>
        {!addSection && (
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button variant="contained" color="error" onClick={() => setAddSection(true)}>
              Add Section
            </Button>
          </Box>
        )}
        {addSection && <AddSection fetchSections={() => fetchSections(id)} id={id} handleAddSection={handleAddSection} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        {/* <Button variant="outlined" sx={{ mr: 2}} >Cancel</Button> */}
        <Button variant="contained" onClick={() => navigate('../')}>Save</Button>
      </Box>
    </Box>
  );
}
