import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
// import { useNavigate } from "../../../node_modules/react-router/dist/index";

export default function WebContent() {
  // const navigate = useNavigate()

  const [edit, setEdit] = useState(true);
  const updateContent = async (data) => {
    axios
      .post("http://localhost:8800/api/webcontent/changeContent", data)
      // .then(navigate('../'))
      .catch((error) => {
        // console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      hero_title: "",
      hero_detail: "",
      goal_title: "",
      goal_detail: "",
      lesson_title: "",
      lesson_detail: "",
      mentor_title: "",
      mentor_detail: "",
      action_title: "",
      action_detail: "",
    },
    validationSchema: Yup.object({
      hero_title: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      hero_detail: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      goal_title: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      goal_detail: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      lesson_title: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      lesson_detail: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      mentor_title: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      mentor_detail: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      action_title: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
      action_detail: Yup.string()
        .required("Required field")
        .min(8, "Must be at least 8 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      updateContent(values);
      // resetForm({ values: "" });
      setEdit((s) => !s);
    },
  });
  const handleFetchAndSetData = (data) => {
    formik.setValues(data);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    axios
      .get("http://localhost:8800/api/webcontent/getContent", {
        signal: controller.signal,
      })
      .then((res) => {
        // console.log(res.data[0]);
        isMounted && handleFetchAndSetData(res.data[0]);
      })
      .catch((err) => console.log("Error:", err));
    // }
    // else if (reportState.action === 2) {
    //   api
    //     .get("batchReport/filter", {
    //       params: {
    //         semester: reportState.selectedSemester,
    //         term: reportState.selectedTerm,
    //         department: reportState.selectedDepartment,
    //         college: reportState.selectedCollege,
    //         tab: reportState.tab,
    //       },
    //       signal: controller.signal,
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       isMounted && reportDispatch({ type: "load", payload: res.data });
    //     })
    //     .catch((err) => console.log("Error:", err));
    // }
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h4">Web Content</Typography>
        <Typography variant="p">
          This section is to modify the text on the home page of the website.
        </Typography>
      </Box>
      <Grid container sx={{ pl: 2, pr: 2 }}>
        <Grid item xs={12}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              required
              fullWidth
              disabled={edit}
              id="hero_title"
              label="Hero Title"
              name="hero_title"
              sx={{ my: 2 }}
              value={formik.values.hero_title}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.hero_title) && formik.touched.hero_title
              }
              helperText={formik.touched.hero_title && formik.errors.hero_title}
            />
            <TextField
              required
              disabled={edit}
              fullWidth
              id="hero_detail"
              label="Hero Detail"
              name="hero_detail"
              multiline
              rows={5}
              sx={{ my: 2 }}
              value={formik.values.hero_detail}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.hero_detail) && formik.touched.hero_detail
              }
              helperText={
                formik.touched.hero_detail && formik.errors.hero_detail
              }
            />
            <TextField
              required
              fullWidth
              id="goal_title"
              label="Goal Title"
              name="goal_title"
              disabled={edit}
              sx={{ my: 2 }}
              value={formik.values.goal_title}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.goal_title) && formik.touched.goal_title
              }
              helperText={formik.touched.goal_title && formik.errors.goal_title}
            />
            <TextField
              required
              fullWidth
              id="goal_detail"
              label="Goal_detail"
              name="goal_detail"
              multiline
              rows={5}
              disabled={edit}
              sx={{ my: 2 }}
              value={formik.values.goal_detail}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.goal_detail) && formik.touched.goal_detail
              }
              helperText={
                formik.touched.goal_detail && formik.errors.goal_detail
              }
            />
            <TextField
              required
              fullWidth
              id="lesson_title"
              label="Lesson Title"
              name="lesson_title"
              disabled={edit}
              sx={{ my: 2 }}
              value={formik.values.lesson_title}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.lesson_title) &&
                formik.touched.lesson_title
              }
              helperText={
                formik.touched.lesson_title && formik.errors.lesson_title
              }
            />
            <TextField
              required
              fullWidth
              id="lesson_detail"
              label="Lesson Detail"
              name="lesson_detail"
              disabled={edit}
              multiline
              rows={5}
              sx={{ my: 2 }}
              value={formik.values.lesson_detail}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.lesson_detail) &&
                formik.touched.lesson_detail
              }
              helperText={
                formik.touched.lesson_detail && formik.errors.lesson_detail
              }
            />
            <TextField
              required
              fullWidth
              disabled={edit}
              id="mentor_title"
              label="Mentor Title"
              name="mentor_title"
              sx={{ my: 2 }}
              value={formik.values.mentor_title}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.mentor_title) &&
                formik.touched.mentor_title
              }
              helperText={
                formik.touched.mentor_title && formik.errors.mentor_title
              }
            />
            <TextField
              required
              fullWidth
              disabled={edit}
              id="mentor_detail"
              label="Mentor Detail"
              name="mentor_detail"
              multiline
              rows={5}
              sx={{ my: 2 }}
              value={formik.values.mentor_detail}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.mentor_detail) &&
                formik.touched.mentor_detail
              }
              helperText={
                formik.touched.mentor_detail && formik.errors.mentor_detail
              }
            />
            <TextField
              required
              fullWidth
              disabled={edit}
              id="action_title"
              label="Action Title"
              name="action_title"
              sx={{ my: 2 }}
              value={formik.values.action_title}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.action_title) &&
                formik.touched.action_title
              }
              helperText={
                formik.touched.action_title && formik.errors.action_title
              }
            />
            <TextField
              required
              disabled={edit}
              fullWidth
              id="action_detail"
              label="Action Detail"
              name="action_detail"
              multiline
              rows={5}
              sx={{ my: 2 }}
              value={formik.values.action_detail}
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.action_detail) &&
                formik.touched.action_detail
              }
              helperText={
                formik.touched.action_detail && formik.errors.action_detail
              }
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              {edit ? (
                <Button
                  onClick={() => setEdit((s) => !s)}
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    variant="filled"
                    type="reset"
                    onClick={() => 
                      // formik.resetForm()
                      setEdit(s => !s)
                    }
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit" sx={{ ml: 2 }}>
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
