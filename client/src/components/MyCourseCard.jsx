import React, { useEffect, useState } from "react";
import TimerIcon from "../assets/icons/timer.svg";
import PersonIcon from "../assets/icons/person.svg";
import NoteIcon from "../assets/icons/stickynote.svg";
import DollarIcon from "../assets/icons/dollar.svg";
import EmptyStarIcon from "../assets/icons/empty_star.svg";
import { Link } from "react-router-dom";
import FullStarIcon from "../assets/icons/full_star.svg";
import axios from "axios";
import ResponseMessage from "./ResponseMessage";

function MyCourseCard({
  courseId,
  course_name,
  courseImagePath,
  course_description,
  teacherName,
  rating,
  hoursNeeded,
  level,
}) {
  const images = require.context("../../../server/courses/thumbnails");

  let course_image;
  try {
    if (courseImagePath !== null) {
      // console.log("is not null")
      course_image = images(`./${courseImagePath}`);
    } else {
      course_image = images("./default_course_image.png");
    }
  } catch (error) {
    course_image = images("./default_course_image.png");
  }
  const numbers = [1, 2, 3, 4, 5];
  const partialDesc = course_description ? course_description.slice(0, 80) : "";

  return (
    <div
      className="relative bg-white rounded-lg border-t-8 border-x-2 min-h-[180px] lg:min-h-[380px] h-fit
         md:w-full border-medium-purple p-2 shadow-md transition-transform duration-300 ease-in-out
         hover:scale-[1.04] hover:-translate-y-1 hover:z-10 hover:drop-shadow-[0 35px 35px rgba(0, 0, 0, 1)]">
      <Link to={`/learning/${courseId}`} className=" cursor-pointer">
        <div className="flex flex-col px-1 items-center justify-center mb-2">
          <span className="self-start mb-2 text-sm lg:text-xl font-semibold font-sans">
            {course_name}
          </span>
          <span className="self-start text-[10px] lg:text-sm font-light font-sans">
            {partialDesc} . . .
          </span>

          <img
            src={course_image}
            alt="Course thumbnail"
            className="my-4 h-32 md:h-48 lg:h-52 w-auto"
          />
        </div>
        <div className="grid px-2 md:grid-cols-2 lg:gap-2 text-xs lg:text-sm">
          <div className="flex flex-row flex-nowrap items-center justify-start mb-2">
            <img src={TimerIcon} alt="icon" className="h-4 w-auto" />
            <span className="ml-2">{hoursNeeded}</span>
          </div>
          <div className="flex flex-row flex-nowrap items-center justify-start mb-2">
            {rating}&nbsp;
            {numbers.map((number) => {
              const chosenIcon =
                number <= Math.floor(rating) ? FullStarIcon : EmptyStarIcon;
              return (
                <img
                  key={number}
                  src={chosenIcon}
                  alt="full star icon"
                  className="h-3 md:h-4 w-auto mr-1"
                />
              );
            })}
          </div>
          <div className="flex flex-row flex-nowrap items-center justify-start mb-2">
            <img src={PersonIcon} alt="icon" className="h-4 w-auto" />
            <span className="ml-2">{teacherName}</span>
          </div>

          <div className="flex flex-row flex-nowrap items-center justify-start mb-2">
            <img src={NoteIcon} alt="icon" className="h-4 w-auto" />
            <span className="ml-2">level {level}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default MyCourseCard;
