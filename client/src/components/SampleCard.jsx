import React, { useState } from "react";
import BookImg from "../assets/BookImg.png";
import ResponseMessage from "./ResponseMessage";
import axios from "axios";


const SampleCard = ({
  courseId,
  course_title,
  instructor,
  time,
  rating,
  price,
  course_thumbnail,
}) => {
  const [failure, setFailure] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [resMsg, setResMsg] = useState("");
  
  const addToCart = () => {
    axios
      .post("/cart/addToCart", {
        course_id: courseId,
        user_id: localStorage.getItem("user_id"),
        book_id: null,
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
      {/* <!-- component --> */}
      <div className=" flex flex-col gap-4 items-center justify-center ">
        {/* <!-- Card 1 --> */}
        <a
          href="/"
          className="w-full border-2 border-b-4 bg-white border-medium-purple mt-3 rounded-xl hover:bg-gray-50"
        >
          <div className="grid grid-cols-6 p-5 gap-y-2">
            {/* <!-- Profile Picture --> */}
            <div>
              <img
                src={BookImg}
                alt=""
                className="max-w-16 max-h-16 rounded-full"
              />
            </div>

            {/* <!-- Description --> */}
            <div className="col-span-5 md:col-span-4 ml-4">
              <p className="text-dark-purple font-bold text-sm "> Title </p>

              <p className="text-gray-600 font-bold text-xs">Instructor</p>
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-1">
                  <p className="text-gray-400"> Time </p>

                  <p className="text-gray-400">rating </p>
                </div>
                <div className="grid grid-cols-1">
                  <p className="text-gray-400">price </p>
                  <p className="text-gray-400">rating </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-center mb-2">
            {addSuccess && (
              <ResponseMessage failure={failure} message={resMsg} />
            )}

            {(!addSuccess || failure) &&
              localStorage.getItem("username") &&
              localStorage.getItem("user_id") && (
                <button
                  className="rounded-lg text-dark-purple font-bold bg-light-purple  py-1 px-3 text-sm w-fit h-fit"
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

export default SampleCard;
