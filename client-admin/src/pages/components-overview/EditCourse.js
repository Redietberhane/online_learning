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
import React, {
  useEffect,
  useRef,
  // useState,
  // useState
} from "react";
import {
  // Field, ErrorMessage,
  useFormik,
} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  useNavigate,
  useParams,
} from "../../../node_modules/react-router/dist/index";

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const idRef = useRef(id);

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
    course_thumbnail: Yup.mixed(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (
      values
      // { setSubmitting }
    ) => {
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
        .put(`/courses/updateCourse/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data);
          // setSubmitting(false);
          navigate("../");
        })
        .catch((error) => {
          // console.error(error);
          // setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    // let course_id = id;
    axios
      .get(
        `/courses/getSingleCourse`,
        { params: { courseID: idRef.current } },
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        // console.log(res.data[0]);
        const fetchedData = res.data[0];
        const mappedInitialValues = {
          course_title: fetchedData.course_title || "",
          course_details: fetchedData.course_details || "",
          course_level: fetchedData.course_level || "",
          course_price: fetchedData.course_price || "",
          course_instructor: fetchedData.course_instructor || "",
          course_total_hour: fetchedData.course_total_hour || "",
          course_thumbnail: null,
        };
        // console.log(mappedInitialValues);
        isMounted && formik.setValues(mappedInitialValues);
      })
      .catch((error) => {
        // console.error(error);
      });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h4">Edit Course</Typography>
        <Typography variant="p">This section is to modify a course.</Typography>
      </Box>

      <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
        <Box mb={2}>
          <TextField
            fullWidth
            id="course_title"
            name="course_title"
            label="Course Title"
            value={formik.values.course_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.course_title && Boolean(formik.errors.course_title)
            }
            helperText={
              formik.touched.course_title && formik.errors.course_title
            }
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            id="course_details"
            name="course_details"
            label="Course Details"
            multiline
            value={formik.values.course_details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.course_details &&
              Boolean(formik.errors.course_details)
            }
            helperText={
              formik.touched.course_details && formik.errors.course_details
            }
          />
        </Box>

        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel id="course_level-label">Course Level</InputLabel>
            <Select
              id="course_level"
              name="course_level"
              labelId="course_level-label"
              value={formik.values.course_level}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.course_level &&
                Boolean(formik.errors.course_level)
              }>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            id="course_price"
            name="course_price"
            label="Course Price"
            type="number"
            value={formik.values.course_price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.course_price && Boolean(formik.errors.course_price)
            }
            helperText={
              formik.touched.course_price && formik.errors.course_price
            }
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            id="course_instructor"
            name="course_instructor"
            label="Course Instructor"
            value={formik.values.course_instructor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.course_instructor &&
              Boolean(formik.errors.course_instructor)
            }
            helperText={
              formik.touched.course_instructor &&
              formik.errors.course_instructor
            }
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            id="course_total_hour"
            name="course_total_hour"
            label="Course Total Hour"
            type="number"
            value={formik.values.course_total_hour}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.course_total_hour &&
              Boolean(formik.errors.course_total_hour)
            }
            helperText={
              formik.touched.course_total_hour &&
              formik.errors.course_total_hour
            }
          />
        </Box>

        <Box mb={2}>
          <Typography>Course Thumbnail</Typography>
          <input
            id="course_thumbnail"
            name="course_thumbnail"
            type="file"
            onChange={(event) =>
              formik.setFieldValue("course_thumbnail", event.target.files[0])
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.course_thumbnail &&
              Boolean(formik.errors.course_thumbnail)
            }
          />
          {formik.touched.course_thumbnail &&
            formik.errors.course_thumbnail && (
              <div>{formik.errors.course_thumbnail}</div>
            )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            mt: 2,
          }}>
          <Button
            variant="outlined"
            type="reset"
            onClick={() => navigate("../")}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
