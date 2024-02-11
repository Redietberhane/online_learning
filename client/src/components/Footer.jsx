import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import instagramIcon from "../assets/instagram.svg";
import fbIcon from "../assets/facebook.svg";
import linkedinIcon from "../assets/linkedin.svg";
import emailIcon from "../assets/email.svg";
import twitterIcon from "../assets/twitter.svg";
import { FormProvider, useForm } from "react-hook-form";
import { GoMail } from "react-icons/go";
import { email_validation } from "../utils/inputValidations";
import InputError from "./InputError";
import { AnimatePresence, motion } from "framer-motion";
import InputComponent from "./InputComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import FaqandHelp from "../pages/FaqandHelp";
import { Route } from "react-router-dom";
import { useEffect } from "react";

function Footer() {
  const methods = useForm();
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("get-current-year");
    if (yearElement) {
      yearElement.textContent = currentYear;
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success_msg, setMsg] = useState("");

  const handleClick = handleSubmit((data) => {
    console.log("handleClick");
    axios
      .post("/auth/login", data)
      .then((res) => {
        setSubmitSuccess(true);
        setMsg(res.data.message);
        setFailure(false);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        setSubmitSuccess(true);
        setMsg(error.response.data.message);
        setFailure(true);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 2000);
      });
  });

  return (
    <footer className="items-center py-8 px-4 bg-light-purple rounded-t-3xl">
      <div className="container mx-auto px-4 py-4  flex-wrap  ">
        <div className=" flex  justify-center items-center ">
          <div className="w-full lg:w-1/3  ">
            <div className="flex gap-1 items-center pb-3">
              <img src={Logo} alt="Logo" width={40} />
              <a href="/" className="text-3xl text-subscribe-purple font-bold">
                Logo
              </a>
            </div>
            <h5 className="text-md mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <ul className="flex gap-3">
                <li className="mb-1 hover:text-medium-purple">
                  <a href="/">
                    <img
                      src={linkedinIcon}
                      alt="linkedin_logo"
                      className="w-7 h-7 mt-2 transform hover:scale-125 transition-transform duration-500 ease-in-out"
                    />
                  </a>
                </li>
                <li className="mb-1 hover:text-medium-purple">
                  <a href="/">
                    {" "}
                    <img
                      src={emailIcon}
                      alt="email_logo"
                      className="w-7 h-7 mt-2 transform hover:scale-125 transition-transform duration-500 ease-in-out"
                    />
                  </a>
                </li>
                <li className="mb-1 hover:text-medium-purple">
                  <a href="/">
                    {" "}
                    <img
                      src={fbIcon}
                      alt="fb_logo"
                      className="w-7 h-7 mt-2 transform hover:scale-125 transition-transform duration-500 ease-in-out"
                    />
                  </a>
                </li>
                <li className="mb-1 hover:text-medium-purple">
                  <a href="/">
                    {" "}
                    <img
                      src={instagramIcon}
                      alt="insta_logo"
                      className="w-7 h-7 mt-2 transform hover:scale-125 transition-transform duration-500 ease-in-out"
                    />
                  </a>
                </li>
                <li className="mb-1 hover:text-medium-purple">
                  <a href="/">
                    {" "}
                    <img
                      src={twitterIcon}
                      alt="twitter_logo"
                      className="w-7 h-7 mt-2 transform hover:scale-125 transition-transform duration-500 ease-in-out"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-2/3 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-1/3  ml-auto">
                <span className="block font-semibold text-blueGray-500 text-sm mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="/faq-and-help"
                      className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm">
                      FAQ & Help
                    </a>
                  </li>
                  <li>
                    <a
                      href="/books"
                      className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm">
                      Books{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-1/3 ml-auto">
                <h1 className="text-blueGray-600 font-semibold text-lg pb-2 ">
                  Contact Us
                </h1>
                <FormProvider {...methods}>
                  <form>
                    <div className="mb-0.1">
                      <InputComponent
                        logo={
                          <GoMail className="relative top-7 left-3 text-gray-500" />
                        }
                        label="Email"
                        name="login_email"
                        placeholder="Enter your email"
                        type="email"
                        required="required"
                        submitClicked={handleClick}
                        {...email_validation}
                      />
                    </div>
                    <div className="flex flex-col flex-nowrap w-10/12 m-auto mb-1 mt-0.1">
                      <AnimatePresence mode="wait" initial={false}>
                        {errors.description && (
                          <InputError
                            message={errors.description.message}
                            key={errors.description.message}
                          />
                        )}
                      </AnimatePresence>
                      <label
                        htmlFor="description"
                        className="text-subscribe-purple"
                      >
                        Description
                        <textarea
                          id="description"
                          name="description"
                          className="w-full font-sans font-thin text-sm bg-opacity-10 border-2 border-gray-200 pt-1 pb-1 pr-3 pl-9 mb-0.1 px-4 py-2 rounded-lg bg-white-700 border-b"
                          placeholder="Enter your description"
                          rows="2"
                          {...register("description", {
                            required: "required",
                          })}
                        />
                      </label>
                      <button
                        onClick={handleClick}
                        className="button-component mt-3 self-start w-2/12 my-0.1 py-1 px-4"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 py-1">
              Copyright © <span id="get-current-year">2021</span>
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Notus JS by
                <a
                  href="https://www.creative-tim.com?ref=njs-profile"
                  className="text-blueGray-500 hover:text-blueGray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creative Tim
                </a>
                .
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
