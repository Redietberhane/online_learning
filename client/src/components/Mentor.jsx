import React, { useState } from "react";
import image from "../assets/MentorImage.png";
import { useNavigate } from "react-router-dom";
import Background2 from "../assets/mentor-bg-3.png";
import { AnimatePresence } from "framer-motion";
import InputComponent from "./InputComponent";
import { GoMail } from "react-icons/go";
import { email_validation } from "../utils/inputValidations";
import { FormProvider, useForm } from "react-hook-form";
import InputError from "./InputError";
import { motion } from "framer-motion";
import axios from "axios";

const Mentor = ({ mentor_title, mentor_detail }) => {
  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success_msg, setMsg] = useState("");

  const [showForm, setShowForm] = useState(false);

  const openContactForm = () => {
    setShowForm(!showForm);
  };

  const handleClick = handleSubmit((data) => {
    axios
      .post("/auth/login", data)
      .then((res) => {
        setSubmitSuccess(true);
        setMsg(res.data.message);
        setFailure(false);
        setTimeout(() => {
          setSubmitSuccess(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setSubmitSuccess(true);
        setMsg(error.response.data.message);
        setFailure(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowForm(!showForm);
        }, 2000);
      });
  });

  return (
    <div className="w-full flex flex-wrap">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center px-8 py-10 w-3/4 mx-auto">
        <img
          src={image}
          alt=""
          className="lg:w-80 sm:w-64 mb-8 lg:mb-0 lg:mr-8"
        />

        <div>
          <h1 className="text-3xl h-fit md:leading-snug font-bold text-writing-dark md:text-6xl md:text-start text-center">
            {mentor_title}
          </h1>
          <p className="mt-6 text-lg  leading-8 text-gray-600 md:text-start text-center">
            {mentor_detail}
          </p>
          {showForm ? (
            <AnimatePresence mode="wait" initial={false}>
              <FormProvider {...methods}>
                <motion.form
                  className="py-10"
                  animate={{
                    z: showForm ? [-800, 0] : [0, -800],
                    opacity: showForm ? [0, 1] : [1, 0],
                  }}
                  transition={{
                    ease: "easeOut",
                    duration: 1.5,
                  }}>
                  <div className="mb-4">
                    <InputComponent
                      logo={
                        <GoMail className="relative top-7 left-3  text-gray-500" />
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
                  <div className="flex flex-col flex-nowrap w-10/12 m-auto mb-2 mt-2">
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
                      className="text-subscribe-purple">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        className="w-full font-sans font-thin text-sm bg-opacity-10 border-2 border-gray-200  pt-2 pb-2 pr-3 pl-9 mb-3 min-h-[100px] max-h-80 max-w-xl h-28 px-4 py-2 rounded-lg bg-white-700 border-b"
                        placeholder="Enter your description"
                        rows="4"
                        {...register("description", {
                          required: "required",
                        })}
                      />
                    </label>
                    <button
                      onClick={handleClick}
                      className="button-component self-start w-2/12 my-2 py-2 px-4">
                      Send
                    </button>
                    <button
                      onClick={openContactForm}
                      className="button-component-stroke self-start w-2/12 my-2 py-2 px-4">
                      Cancel
                    </button>
                  </div>
                </motion.form>
              </FormProvider>
            </AnimatePresence>
          ) : (
            <div className="py-10">
              <button
                onClick={openContactForm}
                className="rounded-md bg-medium-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-dark-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 s">
                Contact Us
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="pt-20 w-1/4 ">
        <img
          className="w-24 md:w-32 lg:w-40 mb-8 md:mb-0 lg:mr-8"
          src={Background2}
          alt=""
        />
      </div>

      {/* <div className="py-5">
          <img
            src={Background}
            alt=""
            className="w-24 md:w-32 lg:w-40 mb-8 md:mb-0 lg:mr-8"
          />
        </div>

        <div className="py-5 items-end">
          <img
            src={Background1}
            alt=""
            className="w-24 md:w-32 lg:w-40 mb-8 md:mb-0 lg:mr-8"
          />
        </div> */}
    </div>
  );
};

export default Mentor;
