import React, { useState } from "react";
import { Typography, Card, Button, Tooltip, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SectionCard({ section, fetchSections }) {
  // console.log(section);
  const initialValues = {
    section_title: section.section_title,
    section_description: section.section_description,
    section_type: section.section_type,
    section_value: section.section_value,
    section_content: section.section_content,
    section_file: null,
  };
  const validationSchema = Yup.object({
    section_title: Yup.string().required("Course Title is required"),
    section_description: Yup.string().required("Course Details is required"),
    section_type: Yup.string().required("Course Level is required"),
    section_value: Yup.number().when("section_type", {
      is: (value) => ["quiz", "assignment"].includes(value),
      then: Yup.number().required("Course Price is required"),
      otherwise: Yup.number(),
    }),
    section_content: Yup.string().when("section_type", {
      is: (value) => ["quiz"].includes(value),
      then: Yup.string().required("Section Content is required"),
      otherwise: Yup.string(),
    }),
    section_file: Yup.mixed().when("section_type", {
      is: (value) => ["video", "assignment", "text"].includes(value),
      then: Yup.mixed().test("fileType", "Invalid file type", function (value) {
        if (["video"].includes(this.parent.section_type)) {
          return !value || (value && value.type.startsWith("video/"));
        } else if (["assignment", "text"].includes(this.parent.section_type)) {
          return !value || (value && value.type === "application/pdf");
        }
        return true;
      }),
      otherwise: Yup.mixed(),
    }),
    // .when("section_type", {
    //   is: (value) => ["video", "assignment", "text"].includes(value),
    //   then: Yup.mixed().required("Section File is required"),
    //   otherwise: Yup.mixed(),
    // }),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();

      formData.append("section_title", values.section_title);
      formData.append("section_description", values.section_description);
      formData.append("section_type", values.section_type);
      formData.append("section_content", values.section_content);
      formData.append("section_value", Number(values.section_value));
      formData.append("section_file", values.section_file);
      // console.log(formData);

      axios
        .put(`/sections/updateSection/${section.section_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data);
          setEdit(false);
          fetchSections();
          // setSubmitting(false);
        })
        .catch((error) => {
          // console.error(error);
          // setSubmitting(false);
        });
    },
  });
  const handleSectionTypeChange = (e) => {
    const selectedSectionType = e.target.value;
    // console.log(selectedSectionType);
    if (selectedSectionType !== formik.values.section_type) {
      formik.setFieldValue("section_type", selectedSectionType);
      if (["text", "video"].includes(selectedSectionType)) {
        formik.setFieldValue("section_content", ""); // Clear the section_content field
        formik.setFieldValue("section_value", ""); // Clear the section_value field
      } else if (["assignment"].includes(selectedSectionType)) {
        formik.setFieldValue("section_content", ""); // Clear the section_content field
      } else if (["quiz"].includes(selectedSectionType)) {
        formik.setFieldValue("section_file", null); // Clear the section_content field
      }
    }
  };
  const deleteSection = (data) => {
    // console.log(data);
    axios
      .delete("/sections/deleteSection", { data: { id: data, course_id: section.course_id } })
      .then((res) => {
        // console.log(res.data);
        fetchSections();
        // axios
        // .get("/courses/getCourses")
        // .then((res) => {
        //   setCourseList(
        //     res.data.map((item) => [
        //       item.course_title,
        //       item.course_instructor,
        //       item.course_level,
        //       item.course_price,
        //       item.course_id,
        //       item.course_rating,
        //       item.course_sections,
        //       item.course_students,
        //       item.course_id,
        //     ])
        //   );
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
      })
      .catch((err) => {
        // console.error(err);
      });
  };
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit && (
        <Card fullWidth sx={{ p: 2, my: 2, w: "100%" }} elevation={0}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" color="primary">
              {section.section_title}{" "}
            </Typography>
            <Tooltip title="Delete">
              <Button
                color="error"
                onClick={() => {
                  deleteSection(section.section_id);
                }}>
                <DeleteOutlineIcon />
              </Button>
            </Tooltip>
          </Box>

          <Typography>
            Type:{" "}
            {section.section_type.charAt(0).toUpperCase() +
              section.section_type.slice(1)}
          </Typography>
          {["quiz", "assignment"].includes(section.section_type) && (
            <Typography>Value: {section.section_value}</Typography>
          )}
          {["quiz"].includes(section.section_type) && (
            <Typography>Content: {section.section_content}</Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setEdit(true);
                // navigate("/coursemanagement/addcourse");
              }}>
              Edit Section
            </Button>
          </Box>
        </Card>
      )}
      {edit && (
        <Card sx={{ p: 2, my: 2, w: "100%" }} elevation={0}>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
            <Typography sx={{ mb: 2 }}>Section</Typography>
            <Box mb={2}>
              <TextField
                fullWidth
                id="section_title"
                name="section_title"
                label="Section Title"
                value={formik.values.section_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.section_title &&
                  Boolean(formik.errors.section_title)
                }
                helperText={
                  formik.touched.section_title && formik.errors.section_title
                }
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="section_description"
                name="section_description"
                label="Section Description"
                multiline
                value={formik.values.section_description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.section_description &&
                  Boolean(formik.errors.section_description)
                }
                helperText={
                  formik.touched.section_description &&
                  formik.errors.section_description
                }
              />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="section_type-label">Section Type</InputLabel>
                <Select
                  id="section_type"
                  name="section_type"
                  labelId="section_type-label"
                  value={formik.values.section_type}
                  onChange={handleSectionTypeChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.section_type &&
                    Boolean(formik.errors.section_type)
                  }>
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="assignment">Assignment</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* {formik.values.section_type === "quiz" } */}
            {["quiz", "assignment"].includes(formik.values.section_type) && (
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="section_value"
                  name="section_value"
                  label="Section Value"
                  type="number"
                  value={formik.values.section_value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.section_value &&
                    Boolean(formik.errors.section_value)
                  }
                  helperText={
                    formik.touched.section_value && formik.errors.section_value
                  }
                />
              </Box>
            )}
            {["video", "assignment", "text"].includes(
              formik.values.section_type
            ) && (
              <Box mb={2}>
                <Typography>Section File</Typography>
                <input
                  id="section_file"
                  name="section_file"
                  type="file"
                  onChange={(event) =>
                    formik.setFieldValue("section_file", event.target.files[0])
                  }
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.section_file &&
                    Boolean(formik.errors.section_file)
                  }
                />
                {formik.touched.section_file && formik.errors.section_file && (
                  <Typography color='error'>{formik.errors.section_file}</Typography>
                )}
              </Box>
            )}

            {["quiz"].includes(formik.values.section_type) && (
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="section_content"
                  name="section_content"
                  label="Section Content"
                  value={formik.values.section_content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.section_content &&
                    Boolean(formik.errors.section_content)
                  }
                  helperText={
                    formik.touched.section_content &&
                    formik.errors.section_content
                  }
                />
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                color="error"
                type="reset"
                onClick={() => setEdit(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="error" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
}
