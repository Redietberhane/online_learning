import React, { useEffect } from "react";
import success from "../assets/success.png";
import { Link } from "react-router-dom";
import axios from "axios";
const Success = () => {
  const queryString = window.location.search;

  // Create an object to store the parameters
  const params = new URLSearchParams(queryString);

  // Get the value of param1
  const param1Value = params.get("user_id");

  useEffect(() => {
    const url = `http://localhost:8800/api/cart/payback`;
    const data = { user_id: param1Value };
    axios
      .post(url, data)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [param1Value]);

  return (
    <div
      className="grid place-items-center w-full lg:h-screen h-full
     font-raleway bg-[#F7F7F7]"
    >
      <div className="max-w-5xl rounded flex flex-col">
        <span className="text-green-600 text-5xl">Payment successful</span>
        <span className="text-yellow-600 text-center mt-8 text-2xl font-bold">
          Your order is in our system
        </span>
        <div className="flex justify-end items-center mx-auto my-24 w-60">
          <img src={success} alt="" />
        </div>
        <div className="my-10 mx-auto">
          <Link to="/" className="underline text-xl underline-offset-4">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
