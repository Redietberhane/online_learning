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

function ChangeEmailModal({ toggle }) {
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
    const [newEmail, setNewEmail] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [message, setMessage] = useState("");

  const submitInputs = handleSubmit((data) => {
    axios
      .post("/auth/change-email", data)
      .then((res) => {
        setSubmitSuccess(true);
        setMsg(res.data.message);
        setFailure(false);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("user_id", res.data.user_id);

        setTimeout(() => {
          setSubmitSuccess(false);
          toggle();
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
    const handleChangeEmail = () => {
      if (newEmail === confirmation) {
        // Send a request to change the email on the server here
        // You can use Axios or any other HTTP library for this
        // After successful change, update the message state
        setMessage("Email changed successfully.");
      } else {
        setMessage("Emails do not match. Please confirm your new email.");
      }
    };

  return (
    <>
      <div className="modal-overlay h-screen w-full bg-black bg-opacity-60 fixed top-0 bottom-0 left-0 right-0 flex flex-col flex-nowrap justify-center items-center z-50">
        <div className="modal-body  h-fit bg-white w-4/12 lg:w-4/12  rounded-xl p-2 md:p-4 lg:p-4">
          <BsFillXSquareFill
            onClick={() => {
              toggle();
            }}
            className="self-end text-medium-purple hover:text-dark-purple h-8 md:h-6 w-auto"
          />
          <div className="  items-left  p-4  font-sans flex flex-row">
            <h1 className="font-extrabold ml-8 text-2xl">Email</h1>
          </div>
          {submitSuccess && (
            <ResponseMessage message={response_msg} failure={failure} />
          )}
          <FormProvider {...methods}>
            <form
              className="login-form w-full flex flex-col flex-nowrap justify-center items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <InputComponent
                logo={
                  <GoMail className="relative top-7 left-3  text-gray-500" />
                }
                name="user_email"
                placeholder="current email"
                type="email"
                required="required"
                submitClicked={submitInputs}
                {...email_validation}
              />
              <InputComponent
                logo={
                  <GoMail className="relative top-7 left-3  text-gray-500" />
                }
                name="user_new_email"
                placeholder="New email"
                type="email"
                required="required"
                submitClicked={submitInputs}
                {...email_validation}
              />
              <button
                onClick={submitInputs}
                className="w-9/12 h-10 my-3 bg-medium-purple hover:bg-medium-purple-hover rounded-md text-white"
              >
                Save Change
              </button>
            </form>
          </FormProvider>
          {/* <div className=" mx-auto mt-8 w-full flex flex-col flex-nowrap justify-center items-center">
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-2 border rounded relative top-7 left-3  text-gray-500"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-2 border rounded relative top-7 left-3  text-gray-500"
                placeholder="Confirm New Email"
                value={localStorage.getItem("email")}
                // onChange={(e) => setConfirmation(e.target.value)}
              />
            </div>
            <button
              className="bg-dark-purple text-white p-2 rounded hover:bg-light-purple"
              onClick={""}
            >
              Change Email
            </button>
            {message && <div className="text-red-500 mt-2">{message}</div>}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ChangeEmailModal;
