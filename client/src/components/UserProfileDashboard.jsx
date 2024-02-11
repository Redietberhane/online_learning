import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";

function UserProfileDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch the list of enrolled courses from the database
    axios
      .get("/api/enrolledCourses") // Replace with your API endpoint
      .then((response) => {
        setEnrolledCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col flex-nowrap">
      <div className="bg-off-white px-5">
        <div className="flex flex-col flex-nowrap my-3 bg-white rounded-lg shadow-md py-5 w-full justify-center items-center">
          <h2 className="text-center text-subscribe-purple text-2xl font-semibold">
            Enrolled Courses
          </h2>
        </div>
      </div>
      {/* Pass enrolledCourses data to the Dashboard */}
      <Dashboard enrolledCourses={enrolledCourses} />
    </div>
  );
}

export default UserProfileDashboard;
