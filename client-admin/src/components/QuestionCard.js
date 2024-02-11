import React, { useState } from "react";
import {
  Typography,
  Card,
  Button,
  Tooltip,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import axios from "axios";

export default function QuestionCard({ question, fetchQuestions }) {
  const [edit, setEdit] = useState(false);
  const options = JSON.parse(question.question_options);
  const formik = useFormik({
    initialValues: {
      question: question.question_name,
      choices: JSON.parse(question.question_options),
    },
    validate: (values) => {
      const errors = {};

      // Validate question title
      if (!values.question) {
        errors.question = "Required";
      }

      // Validate choices
      if (values.choices.length < 2) {
        errors.choices = "At least two choices are required";
      } else {
        let correctChoiceExists = false;
        values.choices.forEach((choice, index) => {
          if (!choice.text) {
            errors[`choices[${index}].text`] = "Required";
          }
          if (choice.isCorrect) {
            correctChoiceExists = true;
          }
        });
        if (!correctChoiceExists) {
          errors.choices = "At least one option must be marked as correct";
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      const questionData = {
        title: values.question,
        choices: values.choices,
      };
      console.log(questionData);
      axios
        .put(`/questions/updateQuestion/${question.question_id}`, questionData)
        .then((response) => {
          // console.log(response.data);
          setEdit(false);
          fetchQuestions();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const deleteQuestion = (data) => {
    axios
      .delete(`/questions/deleteQuestion/${data}`)
      .then((res) => {
        // console.log(res.data);
        fetchQuestions();
      })
      .catch((err) => {
        // console.error(err);
      });
  };
  const handleQuestionChange = (event) => {
    formik.setFieldValue("question", event.target.value);
  };

  const handleChoiceChange = (index, event) => {
    const { choices } = formik.values;
    choices[index].text = event.target.value;
    formik.setFieldValue("choices", choices);
  };

  const handleCorrectAnswerChange = (index) => {
    const { choices } = formik.values;
    choices.forEach((choice, i) => {
      choices[i].isCorrect = i === index;
    });
    formik.setFieldValue("choices", choices);
  };

  const addChoice = () => {
    const { choices } = formik.values;
    formik.setFieldValue("choices", [
      ...choices,
      { text: "", isCorrect: false },
    ]);
  };

  const deleteChoice = (index) => {
    const { choices } = formik.values;
    choices.splice(index, 1);
    formik.setFieldValue("choices", choices);
  };

  return (
    <>
      {!edit && (
        <Card sx={{ p: 2, my: 2, w: "100%" }} elevation={0}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">
              Question: {question.question_name}
            </Typography>
            <Tooltip title="Delete">
              <Button
                color="error"
                onClick={() => {
                  deleteQuestion(question.question_id);
                }}>
                <DeleteOutlineIcon />
              </Button>
            </Tooltip>
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Options
          </Typography>
          {options.map((option, index) => (
            <Typography
              key={index}
              color={option.isCorrect ? "primary" : "initial"}>
              {index + 1}
              {"   "}
              {option.text}
            </Typography>
          ))}

          <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setEdit(true);
              }}>
              Edit Question
            </Button>
          </Box>
        </Card>
      )}
      {edit && (
        <Card sx={{ p: 2, my: 2, w: "100%" }} elevation={0}>
          <TextField
            label="Question Title"
            value={formik.values.question}
            onChange={handleQuestionChange}
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginBottom: "10px" }}
            error={
              formik.touched.question && formik.errors.question ? true : false
            }
            helperText={formik.touched.question && formik.errors.question}
          />
          <Typography sx={{ mb: 2 }} variant="h6">
            Options
          </Typography>

          {formik.values.choices.map((choice, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}>
              <TextField
                label={`Choice ${index + 1}`}
                value={choice.text}
                onChange={(event) => handleChoiceChange(index, event)}
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginRight: "10px" }}
                error={
                  formik.touched.choices &&
                  formik.errors.choices &&
                  formik.touched.choices[index] &&
                  formik.errors.choices[index]
                    ? true
                    : false
                }
                helperText={
                  formik.touched.choices &&
                  formik.errors.choices &&
                  formik.touched.choices[index] &&
                  formik.errors.choices[index]
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={choice.isCorrect}
                    onChange={() => handleCorrectAnswerChange(index)}
                    color="primary"
                  />
                }
                label="Correct"
                style={{ marginRight: "10px" }}
              />
              <IconButton
                onClick={() => deleteChoice(index)}
                size="small"
                color="error"
                aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          {formik.errors.choices &&
            formik.errors.choices !==
              "At least one option must be marked as correct" && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {formik.errors.choices}
              </div>
            )}
          <Button variant="outlined" onClick={addChoice}>
            Add Choice
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={() => setEdit(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={formik.handleSubmit}>
              Submit
            </Button>
          </Box>
        </Card>
      )}
    </>
  );
}
