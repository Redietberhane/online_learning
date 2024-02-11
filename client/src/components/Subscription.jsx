import React, { useEffect, useState } from "react";
import Image1 from "../assets/Subscription Image.png";
import Image2 from "../assets/Subscription Image-1.png";
import Image3 from "../assets/Subscription Image-2.png";
import Image4 from "../assets/Subscription Image-3.png";
import Image5 from "../assets/Subscription Image-4.png";
import Image6 from "../assets/Subscription Image-5.png";
import axios from "axios";

function Subscription() {
  // // Array of image paths
  const imagePaths = [
    require("../assets/Subscription Image.png"),
    require("../assets/Subscription Image-1.png"),
    require("../assets/Subscription Image-2.png"),
    require("../assets/Subscription Image-3.png"),
    require("../assets/Subscription Image-4.png"),
    require("../assets/Subscription Image-5.png"),
  ];

  const [webContent, setWebContent] = useState({});
  useEffect(() => {
    axios
      .get("/webcontent/getContent")
      .then((response) => {
        // console.log(response.data);
        setWebContent({ ...response.data[0] });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  return (
    <div className="mx-8 my-4 rounded-3xl relative isolate overflow-hidden gradient-purple py-16 sm:py-24 lg:py-32 flex justify-center ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div
            className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
            aria-hidden="true">
            {/* <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            /> */}
            <img
              src={Image1}
              alt="Round image_1"
              className="w-16 h-16 rounded-full absolute top-1/2 left-8 transform -translate-y-1/2"
            />
            <img
              src={Image2}
              alt="Round image_2"
              className="w-16 h-16 rounded-full absolute top-1/3 left-1/4 transform -translate-y-1/2"
            />
            <img
              src={Image3}
              alt="Round image_3"
              className="w-16 h-16 rounded-full absolute top-1/3 right-1/4 transform -translate-y-1/2"
            />
          </div>
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {webContent.action_title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              {webContent.action_detail}
            </p>
            <div className="mt-6 flex max-w-md gap-x-4 items-center">
              {/* <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              /> */}
              <button
                type="submit"
                className="flex-none w-3/4 rounded-md bg-medium-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-dark-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Sign up
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10 lg:mt-0">
            {imagePaths.map((imagePath, index) => (
              <div key={index} className="aspect-w-3 aspect-h-2 relative">
                <img
                  src={imagePath}
                  alt={`image_${index + 1}`}
                  className={`rounded-lg object-cover absolute ${
                    index === 0 ? "top-4 right-4" : ""
                  } 
                    ${index === 1 ? "top-1/2 -translate-y-1/2 right-4" : ""} 
                    ${index === 2 ? "bottom-4 right-4" : ""} 
                    ${index === 3 ? "top-4 left-4" : ""} 
                    ${index === 4 ? "top-1/2 -translate-y-1/2 left-4" : ""} 
                    ${index === 5 ? "bottom-4 left-4" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true">
        {/* <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        /> */}
        <img
          src={Image1}
          alt="Round image_1"
          className="w-16 h-16 rounded-full absolute top-1/2 left-8 transform -translate-y-1/2"
        />
        <img
          src={Image2}
          alt="Round image_2"
          className="w-16 h-16 rounded-full absolute top-1/3 left-1/4 transform -translate-y-1/2"
        />
        <img
          src={Image3}
          alt="Round image_3"
          className="w-16 h-16 rounded-full absolute top-1/3 right-1/4 transform -translate-y-1/2"
        />
        <img
          src={Image4}
          alt="Round image_3"
          className="w-16 h-16 rounded-full absolute top-1/2 right-8 transform -translate-y-1/2"
        />
        <img
          src={Image5}
          alt="Round image_3"
          className="w-16 h-16 rounded-full absolute top-1/3 right-1/4 transform -translate-y-1/2"
        />
        <img
          src={Image6}
          alt="Round image_3"
          className="w-16 h-16 rounded-full absolute top-1/3 right-1/4 transform -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export default Subscription;
