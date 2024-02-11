import React from "react";
import CourseCard from "./CourseCard";

function CourseList({ lesson_title, lesson_details }) {
  const courseData = [1, 2, 3, 4];

  return (
    <div className="my-4">
      <h3 className="text-center text-5xl text-[#20053E] font-bold mx-2">
        {lesson_title}
      </h3>

      <p className="text-center py-5 px-20 self-center lg:w-1/2 sm:w-full mx-auto text-md my-2 ">
        {lesson_details}
      </p>
      <h4 className="text-center text-4xl font-bold text-[#20053E]">
        Our Top Courses
      </h4>

      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-8 md:px-20 my-8 mx-auto">
        {courseData.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            course_name="Amharic For Beginners"
            course_description="Minim pariatur exercitation est aliquip deserunt id sit tempor voluptate."
            courseImagePath="./Image.png"
            hoursNeeded="2 hours"
            teacherName="Abe Kebe"
            rating="4.7"
            price="40 ETB"
            level="3"
          />
        ))}
      </div>

      <div className="flex justify-center px-4 sm:px-8 md:px-20 my-4">
        <a href="  /courses" className="button-component px-4 py-2">
          View More Courses
        </a>
      </div>
    </div>
  );
}

export default CourseList;
