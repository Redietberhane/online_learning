import React, { useState } from "react";
import EduviLogo from "../assets/eduvi_logo.svg";
import { useNavigate } from "react-router-dom";
import {
  email_validation,
  name_validation,
  password_validation,
} from "../utils/inputValidations";
import LoginImage from "../assets/login_image.svg";
import DividerVertical from "../assets/divider_line.svg";
import InputComponent from "./InputComponent";
import GoogleIcon from "../assets/google_icon2.svg";
import { GoLock, GoMail, GoPerson } from "react-icons/go";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import InputError from "./InputError";
import ResponseMessage from "./ResponseMessage";
import { BsFillXSquareFill } from "react-icons/bs";

function SignupModal({ toggle, toggleSignin }) {
  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [response_msg, setMsg] = useState("");

  const submitInputs = handleSubmit((data) => {
    axios
      .post("/users/addUser", data)
      .then((res) => {
        setSubmitSuccess(true);
        setMsg(res.data.message);
        setFailure(false);
        setTimeout(() => {
          setSubmitSuccess(false);
          toggleSignin();
        }, 4000);
      })
      .catch((error) => {
        setSubmitSuccess(true);
        setMsg(error.response.data.message);
        setFailure(true);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 4000);
      });
  });

  return (
    <>
      <div className="modal-overlay h-screen w-full bg-black bg-opacity-60 fixed top-0 bottom-0 left-0 right-0 flex flex-col flex-nowrap justify-center items-center z-50">
        <div className="modal-body flex flex-col h-fit bg-white w-10/12 lg:w-8/12 rounded-xl p-2 md:p-4 lg:p-4">
          <BsFillXSquareFill
            onClick={toggle}
            className="self-end text-medium-purple hover:text-dark-purple h-8 md:h-6 w-auto"
          />
          <div className="modal-body flex flex-row">
            <div className=" hidden lg:flex flex-col flex-nowrap justify-center items-left w-1/2 p-8 pl-24 font-sans">
              <img src={EduviLogo} alt="eduvi logo" className="w-2/12" />
              <span className=" leading-normal font-extrabold text-4xl mb-5">
                Welcome to <br /> EthLang online <br /> learning platform
              </span>
              <img
                src={LoginImage}
                alt="login asset"
                className="w-8/12 h-auto m-auto mb-3 mt-3"
              />
            </div>
            <img
              src={DividerVertical}
              alt="vertical divider"
              className="hidden lg:block h-[500px] m-auto"
            />
            <div className="flex flex-col flex-nowrap justify-center items-center w-full lg:w-1/2 p-8 font-sans">
              <a
                className="flex flex-row justify-center items-center font-normal bg-opacity-10 border-2 h-auto p-2 pr-3 pl-3 mt-2 mb-3 w-auto rounded-lg font-sans text-sm text-gray-500 hover:bg-medium-purple hover:text-white"
                href="/">
                <img
                  src={GoogleIcon}
                  alt="google icon"
                  className="h-8 m-auto mr-2"
                />
                Sign Up with Google
              </a>
              <div className="flex flex-row flex-nowrap justify-center items-center w-11/12 text-gray-600 text-sm font-semibold">
                <div className="w-3/12 justify-center items-center px-1 ">
                  &nbsp;
                  <hr className="w-full border-2" />
                </div>
                or sign up with your email
                <div className="w-3/12 justify-center items-center px-1">
                  &nbsp;
                  <hr className="w-full border-2" />
                </div>
              </div>
              {submitSuccess && (
                <ResponseMessage message={response_msg} failure={failure} />
              )}
              <FormProvider {...methods}>
                <form
                  className="signup-form w-full flex flex-col flex-nowrap justify-center items-center"
                  onSubmit={(e) => e.preventDefault()}>
                  <InputComponent
                    logo={
                      <GoPerson className="relative top-7 left-3  text-gray-500" />
                    }
                    label="Full name"
                    name="user_full_name"
                    placeholder="Enter your full name"
                    type="text"
                    required="required"
                    submitClicked={submitInputs}
                    {...name_validation}
                  />
                  <InputComponent
                    logo={
                      <GoMail className="relative top-7 left-3  text-gray-500" />
                    }
                    label="Email"
                    name="user_email"
                    placeholder="Enter your email"
                    type="email"
                    required="required"
                    submitClicked={submitInputs}
                    {...email_validation}
                  />
                  <InputComponent
                    logo={
                      <GoLock className="relative top-7 left-3  text-gray-500" />
                    }
                    label="Password"
                    name="user_password"
                    placeholder="Enter password"
                    type="password"
                    required="required"
                    {...password_validation}
                    submitClicked={submitInputs}
                  />
                  <label className="text-grey-500 text-sm">
                    <AnimatePresence mode="wait" initial={false}>
                      {errors.terms_checkbox && (
                        <InputError
                          message={errors.terms_checkbox.message}
                          key={errors.terms_checkbox.message}
                        />
                      )}
                    </AnimatePresence>
                    <input
                      type="checkbox"
                      name="terms_checkbox"
                      className="mx-3 text-medium-purple"
                      {...register("terms_checkbox", { required: "required" })}
                    />
                    I agreed to the &nbsp;
                    <a href="/" className="font-bold ">
                      terms and conditions
                    </a>
                  </label>
                  <button
                    onClick={submitInputs}
                    className="w-9/12 h-10 my-3 bg-medium-purple hover:bg-medium-purple-hover rounded-md text-white">
                    Sign Up
                  </button>
                </form>
              </FormProvider>

              <span className="text-sm text-grey-500 font-sans">
                Already have an account?
                <span onClick={toggleSignin} className="text-medium-purple ">
                  Sign In
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupModal;
