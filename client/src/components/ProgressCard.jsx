import React, { useEffect, useState } from "react";
import axios from "axios";
function ProgressCard(props) {
  const { courseId } = props;
  const [quiz, setQuiz] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [mid, setMid] = useState("");
  const [final, setFinal] = useState("");
  const [courseData, setCourseData] = useState(null);
 
  useEffect(() => {
    // Make a GET request to fetch course progress data from the database
    axios
      .get(`/api/courseProgress/${courseId}`) // Replace with your API endpoint
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course progress data:", error);
      });
  }, [courseId]);

  useEffect(() => {
    if (courseData) {
      // Make a GET request to fetch data from the database
      axios
        .get(`/api/courseData/${courseId}`) // Replace with your API endpoint
        .then((response) => {
          const courseData = response.data;

          // Extract data from the response and set it in the component state
          setQuiz(courseData.quiz);
          setAssignment(courseData.assignment);
          setMid(courseData.mid);
          setFinal(courseData.final);
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
        });
    }
  }, [courseData, courseId]);

// Calculate the total as you did before
  const quizSum = quiz.map(Number).reduce((a, b) => a + b, 0);
  const assignSum = assignment.map(Number).reduce((a, b) => a + b, 0);
  const total = quizSum + Number(mid) + Number(final) + assignSum;

  if (quiz.length === 0 || assignment.length === 0 || !mid || !final) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white rounded-lg p-4   w-[580px] shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-purple-500 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold text-lg">
            CN
          </div>
          <h2 className="text-xl font-bold ml-2">{courseId}</h2>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <span className="font-bold text-gray-700 mr-2">Progress:</span>
          <div className="bg-gray-200 h-2 flex-grow rounded-full">
            <div
              className="bg-medium-purple h-2 rounded-full"
              style={{ width: `${props.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="font-bold text-gray-700">Assessments</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan="2">Quizzes</th>
              </tr>
              <tr>
                <th>Type</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {quiz.map((quizValue, index) => (
                <tr key={index}>
                  <td>Quiz {index + 1}</td>
                  <td className="text-center">{quizValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan="2">Assignments</th>
              </tr>
              <tr>
                <th>Type</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {assignment.map((assignValue, index) => (
                <tr key={index}>
                  <td>Assignment {index + 1}</td>
                  <td className="text-center">{assignValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-gray-700">Results</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            {/* <p className="font-bold">Mid Results:</p> */}
            <p className="font-bold">Mid Results: {mid}</p>

            {/* <ul>
              {quiz.length > 0 && (
                <li>
                  Mid:
                  {quiz.map((quizValue, index) => (
                    <span key={index}>
                      {index + 1}: {quizValue}
                      {index < quiz.length - 1 && ", "}
                    </span>
                  ))}
                </li>
              )}
            </ul> */}
          </div>
          <div>
            <p className="font-bold">Final Results: {final}</p>
            {/* <ul>
              {assignment.map((assignValue, index) => (
                <li key={index}>

                  Final {index + 1}: {assignValue}

                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <p className="mt-4 text-center">Total Score: {total}</p>
      </div>
    </div>
  );
}

export default ProgressCard;
