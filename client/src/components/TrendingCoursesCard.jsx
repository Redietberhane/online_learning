import React, { useEffect, useState } from "react";
import axios from "axios";
import ResponseMessage from "./ResponseMessage";

const TrendingCoursesCardCopy = ({
  courseId,
  course_name,
  course_description,
  courseImagePath,
  authorName,
  rating,
  price,
}) => {
  const images = require.context("../../../server/courses/thumbnails");
  // console.log(courseImagePath, "courseImagePath");
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

  const [failure, setFailure] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [resMsg, setResMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      axios
        .post("/cart/checkcourse", {
          course_id: courseId,
          user_id: localStorage.getItem("user_id"),
        })
        .then((res) => {
          if (res.data.message) {
            setAddSuccess(true);
            setFailure(false);
            setResMsg("Already in cart");
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, [courseId]);

  const addToCart = () => {
    axios
      .post("/cart/addToCart", {
        course_id: courseId,
        user_id: localStorage.getItem("user_id"),
        course_id: null,
      })
      .then((res) => {
        setAddSuccess(true);
        setFailure(false);
        setResMsg(res.data.message);
      })
      .catch((error) => {
        setResMsg(error.response.data.message);
        setAddSuccess(true);
        setFailure(true);
      });
  };
  return (
    <div>
      <div class="py-1 flex flex-col gap-4 items-center justify-center bg-white">
        <a
          href="#"
          class="w-[30rem] border-2 border-b-4 border-medium-purple rounded-xl hover:bg-white"
        >
          <div class="grid grid-cols-6 p-5 gap-y-2">
            <div>
              <img
                src="https://picsum.photos/seed/2/200/200"
                class="max-w-16 max-h-16 rounded-full"
              />
            </div>

            <div class="col-span-5 md:col-span-4 ml-4">
              <p class="text-gray-600 font-bold">Title: {course_name}</p>
              <p class="text-dark-purple font-bold text-xs">
                {" "}
                Author: {authorName}{" "}
              </p>
              <p class="text-gray-400"> Rating: {rating} </p>

              <p class="text-gray-400"> Price: {price} </p>
            </div>
          </div>
          <div class="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-center">
            {addSuccess && (
              <ResponseMessage failure={failure} message={resMsg} />
            )}

            {(!addSuccess || failure) &&
              localStorage.getItem("username") &&
              localStorage.getItem("user_id") && (
                <button
                  className="rounded-lg text-dark-purple font-bold bg-light-purple  py-1 px-3 text-sm w-fit h-fit mb-3"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              )}
          </div>
        </a>
      </div>
    </div>
  );
};

export default TrendingCoursesCardCopy;
