import React, { useState, useEffect } from "react";
import ProgressCard from "./ProgressCard";
import axios from "axios";

function Dashboard() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch the list of courses or course data from the database
    axios
      .get("/api/courses") // Replace with your API endpoint
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col flex-wrap  items-center gap-3 mx-auto pt-5 pb-96">
      {courseData.map((course) => (
        <ProgressCard
          key={course.id}
          courseId={course.id}
          // Pass the course-specific data to ProgressCard as props
          assignment={course.assignment}
          quiz={course.quiz}
          mid={course.mid}
          final={course.final}
          totalCourseContents={course.totalCourseContents}
        />
      ))}
    </div>
  );
}

export default Dashboard;
