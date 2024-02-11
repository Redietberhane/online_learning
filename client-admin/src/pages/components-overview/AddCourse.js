import {
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "../../../node_modules/react-router/dist/index";

export default function AddCourse() {
  const navigate = useNavigate()
  const initialValues = {
    course_title: "",
    course_details: "",
    course_level: "",
    course_price: "",
    course_instructor: "",
    course_total_hour: "",
    course_thumbnail: null,
  };

  const validationSchema = Yup.object({
    course_title: Yup.string().required("Course Title is required"),
    course_details: Yup.string().required("Course Details is required"),
    course_level: Yup.string().required("Course Level is required"),
    course_price: Yup.number().required("Course Price is required"),
    course_instructor: Yup.string().required("Course Instructor is required"),
    course_total_hour: Yup.number().required("Course Total Hours is required"),
    course_thumbnail: Yup.mixed().required("Course Thumbnail is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // console.log(values);
    const formData = new FormData();

    formData.append("course_title", values.course_title);
    formData.append("course_details", values.course_details);
    formData.append("course_level", values.course_level);
    formData.append("course_price", parseFloat(values.course_price));
    formData.append("course_instructor", values.course_instructor);
    formData.append("course_total_hour", parseInt(values.course_total_hour));
    formData.append("course_thumbnail", values.course_thumbnail);
    // console.log(formData);

    axios
      .post("/courses/addCourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setSubmitting(false);
        navigate('../')
      })
      .catch((error) => {
        // console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h4">Add Course</Typography>
        <Typography variant="p">
          This section is to create a course.
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            required
            fullWidth
            id="course_title"
            label="Course Title"
            name="course_title"
            sx={{ my: 2 }}
          />
          <ErrorMessage name="course_title" component="div" />

          <Field
            as={TextField}
            required
            fullWidth
            id="course_details"
            label="Course Details"
            name="course_details"
            multiline
            sx={{ my: 2 }}
          />
          <ErrorMessage name="course_details" component="div" />

          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="course_level_label">Course Level</InputLabel>
            <Field
              as={Select}
              required
              fullWidth
              id="course_level"
              name="course_level"
              labelId="course_level_label">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Field>
            <ErrorMessage name="course_level" component="div" />
          </FormControl>

          <Field
            as={TextField}
            required
            fullWidth
            type="number"
            id="course_price"
            label="Course Price"
            name="course_price"
          />
          <ErrorMessage name="course_price" component="div" />

          <Field
            as={TextField}
            required
            fullWidth
            id="course_instructor"
            label="Course Instructor"
            name="course_instructor"
            sx={{ my: 2 }}
          />
          <ErrorMessage name="course_instructor" component="div" />

          <Field
            as={TextField}
            required
            fullWidth
            type="number"
            id="course_total_hour"
            label="Course Total Hour"
            name="course_total_hour"
          />
          <ErrorMessage name="course_total_hour" component="div" />

          <Box sx={{ my: 2, ml: 0.2 }}>
            <Typography>Course Thumbnail</Typography>
            <Field name="course_thumbnail">
              {({ field, form }) => (
                <div>
                  <input
                    id="course_thumbnail"
                    type="file"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.files[0])
                    }
                  />
                  <ErrorMessage name="course_thumbnail" component="div" />
                </div>
              )}
            </Field>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 2,
            }}>
            <Button variant="outlined" type="reset" onClick={() => navigate('../')}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Box>
        </Form>
      </Formik>
    </>
  );
}
