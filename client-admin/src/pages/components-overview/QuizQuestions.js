import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "../../../node_modules/react-router/dist/index";
import { Box, Button, Card, Typography } from "@mui/material";
import QuestionCard from "components/QuestionCard";
import axios from "axios";
import AddQuestion from "components/AddQuestion";

export default function QuizQuestions() {
  const navigate = useNavigate();

  const { id } = useParams();
  const idRef = useRef(id);
  const [questionList, setQuestionList] = useState([]);
  const [addQuestion, setAddQuestion] = useState(false);
  const handleAddQuestion = (data) => {
    setAddQuestion(data)
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    axios
      .get(`/questions/getQuizQuestions/${idRef.current}`, {
        signal: controller.signal,
      })
      .then((response) => {
        // console.log(response.data);
        isMounted && setQuestionList(response.data);
      })
      .catch((error) => {
        // console.error(error);
      });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const fetchQuestions = (sectionId) => {
    axios
      .get(`/questions/getQuizQuestions/${sectionId}`)
      .then((response) => {
        // console.log(response.data);
        setQuestionList(response.data);
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  return (
    <Box sx={{ mx: 2 }}>
      <Box>
        <Typography variant="h4">Questions</Typography>
        <Typography variant="p">
          This is to manage the questions of a quiz.
        </Typography>
      </Box>
      <Box>
        {questionList.map((Question) => (
          <QuestionCard key={Question?.question_id} question={Question} fetchQuestions={() => fetchQuestions(id)} />
        ))}
        {questionList.length === 0 && !addQuestion && (
          <Card elevation={0} sx={{ my: 2, py: 4 }}>
            <Typography sx={{ textAlign: "center" }}>
              You have no questions here yet
            </Typography>
          </Card>
        )}
      </Box>
      <Box sx={{ my: 3 }}>
        {!addQuestion && (
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button variant="contained" color="error" onClick={() => setAddQuestion(true)}>
              Add Question
            </Button>
          </Box>
        )}
        {addQuestion && <AddQuestion fetchQuestions={() => fetchQuestions(id)} id={id} handleAddQuestion={handleAddQuestion} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        {/* <Button variant="outlined" sx={{ mr: 2}} >Cancel</Button> */}
        <Button variant="contained" onClick={() => navigate('../')}>Save</Button>
      </Box>
    </Box>
  );
}
