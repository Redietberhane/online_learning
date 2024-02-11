import React from "react";
import Image from "../assets/our goal picture.png";

function OurGoal({goal_detail, goal_title}) {
  return (
    <div className="mb-16">
      <h4 className="text-center text-3xl font-bold  text-[#20053E]">
        {""}
        {goal_title}
      </h4>
      <p className="text-center py-5 self-center lg:w-1/2 sm:w-full mx-auto text-lg">
        {goal_detail}
      </p>

      <div className="flex justify-center items-center px-20 pt-2">
        <a
          // type="submit"
          href="  /courses"
          className="flex-none hover:bg-dark-purple rounded-md bg-medium-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ">
          Visit Courses
        </a>
      </div>
      <div>
        <img src={Image} alt="images" className="rounded-lg w-3/4 mx-auto " />
      </div>
      {/* Colored Buttons 
      <div className="w-full">
        <div className="flex justify-between mx-auto w-full flex-wrap">
          <div className="m-2 flex-wrap md:px-36 lg:px-56">
            <button
              type="submit"
              className="w-full rounded-md bg-red-500 px-5  py-2 text-xs font-semibold text-white shadow-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Audio Classes
            </button>
          </div>
          <div className="m-2 flex-wrap  ">
            <button
              type="submit"
              className="w-full rounded-md bg-green-400 px-5 py-2 text-xs font-semibold text-white shadow-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Live Classes
            </button>
          </div>
          <div className="m-2 flex-wrap md:px-36 lg:px-56">
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Record Class
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default OurGoal;
