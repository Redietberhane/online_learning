import React from "react";
// import star from "../assets/star.png";
import FullStar from "../assets/icons/full_star.svg";
import EmptyStar from "../assets/icons/empty_star.svg";

const Pricecard = ({
  course_price,
  course_instructor,
  course_rate,
  course_total_hour,
  course_sections,
  course_quizzes,
  course_answer,
  course_languges,
  course_access,
}) => {
  const numbers = [1, 2, 3, 4, 5];
  const cert = course_answer ? "yes" : "no";
  return (
    <div className="flex flex-col md:p-8 w-full">
      <div className=" text-sm text-midnightblue-200 font-poppins bg-white rounded-lg shadow-md p-6 w-full">
        <div className="grid gap-y-4 space-y-0 w-full">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-dimgray-100 ">Price</div>
            <div className="  font-black text-red-500  ml-10 text-right">
              {course_price} $
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex-1  text-dimgray-100">Instructor</div>
            <div className="font-black ml-10 underline text-right whitespace-no-wrap">
              {course_instructor}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-1  text-dimgray-100">Ratings</div>
            <p className="ml-5 text-sm text-right">{course_rate}</p>
            {numbers.map((number) => {
              const chosenIcon =
                number <= Math.floor(course_rate) ? FullStar : EmptyStar;
              return (
                <img
                  key={number}
                  src={chosenIcon}
                  alt="empty star icon"
                  className="w-4 h-4 ml-0.5"
                />
              );
            })}
          </div>
          <div className="flex items-center">
            <div className="flex-1  text-dimgray-100">Durations</div>
            <div className="flex   font-black text-right">
              {course_total_hour} hours
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-1  text-dimgray-100">Lessons</div>
            <div className="  font-black text-right">{course_sections}</div>
          </div>
          <div className="flex items-center">
            <div className="flex-1  text-dimgray-100">Quizzes</div>
            <div className="  font-black text-right">{course_quizzes}</div>
          </div>
          <div className="flex items-center">
            <div className="flex-1  text-dimgray-100">Certificate</div>
            <div className="  font-black text-right">{cert}</div>
          </div>

          <div className="flex items-center">
            <div className="flex-1  text-dimgray-100">Access</div>
            <div className="  font-black text-right">{course_access}</div>
          </div>
          <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded-10 mr-0 mt-4">
            <a href="/coursepreview">Purchase Course</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricecard;
