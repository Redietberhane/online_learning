import React from "react";
import heroimage from "../assets/heroimage.png";
import backgroundImage from "../assets/hero-bg-1.png";

function LandingHero({ hero_title, hero_detail }) {
  return (
    <div className="relative isolate over px-4 md:px-6 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {/* Hero Section  */}
      <div className="flex sm:flex-wrap-reverse lg:flex-nowrap flex-col md:flex-row lg:justify-between items-center px-4 md:px-24 py-8 md:py-12 lg:py-4">
        <div className=" max-w-2xl py-32 sm:py-12 lg:py-40">
          <div className="">
            <h1 className="text-4xl font-bold tracking-tight text-[#0A033C] sm:text-6xl lg:text-start sm:text-center">
              {hero_title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 lg:text-start sm:text-center">
              {hero_detail}
            </p>
            <div className="mt-10 flex items-center gap-x-6 lg:justify-start sm:justify-center">
              <div className="mt-0 flex max-w-md gap-x-4">
                {/* <button
                  type="submit"
                  className="button-component bg-dark-purple">
                  Sign Up
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-6 md:mb-0">
            <img src={backgroundImage} alt="" className="lg:w-60 sm:w-40" />
          </div>
          <div className="mb-6 md:mb-0">
            <img src={heroimage} alt="" className="lg:w-80 sm:w-64" />
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

export default LandingHero;
