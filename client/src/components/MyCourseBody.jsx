import { React, useEffect, useState } from "react";
import CourseRecommendationCard from "./CourseRecommendationCard";
import PopularBookImg from "../assets/PopularBookImg.png";
import PopularCoursesCard from "./PopularCourseCard";

import MyCoursesSearch from "./MyCoursesSearch";
import courseData from "./courseData";
import axios from "axios";

function MyCourseBody() {
  const [courses, setCourses] = useState([...courseData]);
  const [popCourses, setPopCourses] = useState([...courseData]);

  useEffect(() => {
    axios
      .get("/courses/getCourses")
      .then((res) => {
        setPopCourses([...res.data]);
        setCourses([...res.data]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // navigate("/");
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row flex-nowrap w-full px-">
      <div className="w-full md:w-1/4 text-xs md:text-sm px-8 md:px-2 pt-2 my-4 flex flex-col justify-start items-center">
        <div className="flex flex-col flex-nowrap ">
          <div className="my-2 shadow-md">
            <h2 className="rounded-tl-lg rounded-tr-lg text-center bg-[#796bd4] px-3.5 py-2.5 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Recommended Courses
            </h2>
            <div className="flex flex-col flex-nowrap items-center max-h-[700px] overflow-y-auto pt-5">
            {popCourses.map((course, index) => (
                <PopularCoursesCard
                  key={course.course_id}
                  courseId={course.course_id}
                  title={course.course_title}
                  instructor={course.course_instructor}
                  time={course.course_total_hour}
                  rating={course.course_rating}
                  price={course.course_price}
                  courseImagePath={course.courseImagePath}
                />
              ))}
             
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4 text-xs md:text-base px-4 md:px-8 my-4 flex flex-col justify-start items-center">
        <div className="flex  w-full m-2 my-3 flex-col sm:flex-row  items-start sm:justify-between">
          <MyCoursesSearch searchData={courses} />
        </div>
      </div>
    </div>
  );
}
export default MyCourseBody;
