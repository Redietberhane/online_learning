import React from "react";
import CourseHeroImage from "../assets/booksheroimage.jpg";
import { useNavigate } from "react-router-dom";

function CoursesHero() {
  const navigate = useNavigate();

  return (
    <div className="mx-8 bg-white rounded-3xl px-8 py-2 my-8 ">
      <div className="flex items-center justify-around py-4 flex-wrap-reverse lg:flex-nowrap">
        <>
          <span className="flex gap-4">
            <h2 className="text-4xl sm:text-6xl font-bold text-center my-2">
              <span className="text-medium-purple">Your</span> Courses
            </h2>
          </span>
        </>
        <img
          src={CourseHeroImage}
          alt=""
          className="w-96 rounded-2xl bg-off-white"
        />
      </div>
    </div>
  );
}

export default CoursesHero;
