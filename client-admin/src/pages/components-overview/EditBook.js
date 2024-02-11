import React, { useEffect } from "react";
import { useParams } from "../../../node_modules/react-router/dist/index";
import { useNavigate } from "../../../node_modules/react-router/dist/index";
import { Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    book_title: "",
    book_author: "",
    book_details: "",
    book_price: "",
    book_thumbnail: null,
  };

  const validationSchema = Yup.object({
    book_title: Yup.string().required("Book Title is required"),
    book_author: Yup.string().required("Author Name is required"),
    book_details: Yup.string().required("Book Description is required"),
    book_price: Yup.number().required("Book Price is required"),
    book_thumbnail: Yup.mixed(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Perform form submission logic here
      // console.log(values);
      // Create a new FormData object
      const formData = new FormData();

      // Append form data values to the FormData object
      formData.append("book_title", values.book_title);
      formData.append("book_author", values.book_author);
      formData.append("book_details", values.book_details);
      formData.append("book_price", values.book_price);
      formData.append("book_thumbnail", values.book_thumbnail); // Assuming it's a File object
      // Make an API call using Axios
      // console.log(formData)
      axios
        .put(`/books/updateBook/${id}`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Set the Content-Type header to indicate file upload
          },
        }) // Replace with your API endpoint
        .then((response) => {
          // Handle the response
          // console.log(response.data);

          // Reset the form and set submitting state to false
          navigate('../')

        })
        .catch((error) => {
          // Handle the error
          // console.error(error);

          // Reset the submitting state to false
        });
    },
  });
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    // let course_id = id;
    axios
      .get(`/books/getSingleBook/${id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        const fetchedData = res.data[0];
        const mappedInitialValues = {
          book_title: fetchedData.book_title || "",
          book_author: fetchedData.book_author || "",
          book_details: fetchedData.book_details || "",
          book_price: fetchedData.book_price || "",
          book_thumbnail: null,
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
        <Typography variant="h4">Edit Book</Typography>
        <Typography variant="p">This section is to modify a book.</Typography>
      </Box>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
        <Box mb={2}>
          <TextField
            fullWidth
            id="book_title"
            name="book_title"
            label="Book Title"
            value={formik.values.book_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.book_title && Boolean(formik.errors.book_title)
            }
            helperText={formik.touched.book_title && formik.errors.book_title}
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            id="book_author"
            name="book_author"
            label="Author Name"
            value={formik.values.book_author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.book_author && Boolean(formik.errors.book_author)
            }
            helperText={formik.touched.book_author && formik.errors.book_author}
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            id="book_details"
            name="book_details"
            label="Book Description"
            multiline
            value={formik.values.book_details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.book_details && Boolean(formik.errors.book_details)
            }
            helperText={
              formik.touched.book_details && formik.errors.book_details
            }
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            id="book_price"
            name="book_price"
            label="Book Price"
            type="number"
            value={formik.values.book_price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.book_price && Boolean(formik.errors.book_price)
            }
            helperText={formik.touched.book_price && formik.errors.book_price}
          />
        </Box>

        <Box mb={2}>
          <Typography>Book Thumbnail</Typography>
          <input
            id="book_thumbnail"
            name="book_thumbnail"
            type="file"
            onChange={(event) =>
              formik.setFieldValue("book_thumbnail", event.target.files[0])
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.book_thumbnail &&
              Boolean(formik.errors.book_thumbnail)
            }
          />
          {formik.touched.book_thumbnail && formik.errors.book_thumbnail && (
            <div>{formik.errors.book_thumbnail}</div>
          )}
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 2 }}>
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
