import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "../../../node_modules/react-router/dist/index";

export default function AddBook() {
  const navigate = useNavigate()

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
    book_thumbnail: Yup.mixed().required("Book Thumbnail is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
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
      .post("/books/addBook", values, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Set the Content-Type header to indicate file upload
        },
      }) // Replace with your API endpoint
      .then((response) => {
        // Handle the response
        // console.log(response.data);

        // Reset the form and set submitting state to false
        setSubmitting(false);
        navigate('../')

      })
      .catch((error) => {
        // Handle the error
        // console.error(error);

        // Reset the submitting state to false
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form>
        <Field
          as={TextField}
          required
          fullWidth
          id="book_title"
          label="Book Title"
          name="book_title"
          sx={{ my: 2 }}
        />
        <ErrorMessage name="book_title" component="div" />

        <Field
          as={TextField}
          required
          fullWidth
          id="book_author"
          label="Author Name"
          name="book_author"
          sx={{ my: 2 }}
        />
        <ErrorMessage name="book_author" component="div" />

        <Field
          as={TextField}
          required
          fullWidth
          id="book_details"
          label="Book Description"
          name="book_details"
          multiline
          sx={{ my: 2 }}
        />
        <ErrorMessage name="book_details" component="div" />

        <Field
          as={TextField}
          required
          fullWidth
          type="number"
          id="book_price"
          label="Book Price"
          name="book_price"
        />
        <ErrorMessage name="book_price" component="div" />

        <Box sx={{ my: 2, ml: 0.2 }}>
          <Typography>Book Thumbnail</Typography>
          <Field name="book_thumbnail">
            {({ field, form }) => (
              <div>
                <input
                  id="book_thumbnail"
                  type="file"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.files[0])
                  }
                />
                <ErrorMessage name="book_thumbnail" component="div" />
              </div>
            )}
          </Field>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 2 }}>
          <Button variant="outlined" type="reset" onClick={() => navigate('../')}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </Form>
    </Formik>
  );
}
