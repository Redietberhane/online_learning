import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import EduviLogo from "../assets/eduvi_logo.svg";
import PsdResetImg from "../assets/password reset 1.svg";
import DividerVertical from "../assets/divider_line.svg";
import InputComponent from "../components/InputComponent";
import { GoLock } from "react-icons/go";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";

function PasswordResetPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success_msg, setMsg] = useState("");

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const tokenParam = urlParams.get("token");
  //   if (tokenParam) {
  //     setToken(tokenParam);
  //   }
  // }, []);

  const methods = useForm();

  const { getValues, handleSubmit } = methods;

  const submitInputs = handleSubmit((data) => {
    axios
      .post("/reset-password/submit", {
        token: token,
        password: data.update_password,
      })
      .then((res) => {
        setMsg(res.data.message);
        setSubmitSuccess(true);
        setFailure(false);

        setTimeout(() => {
          setSubmitSuccess(false);
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log("error: ", err.response.data.message);
        setMsg(err.response.data.message);
        setSubmitSuccess(true);
        setFailure(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          navigate("/");
        }, 2000);
      });
  });

  const conf_password_validation = {
    validation: {
      required: {
        value: true,
        message: "required",
      },
      minLength: {
        value: 6,
        message: "minimum 6 characters",
      },
      maxLength: {
        value: 30,
        message: "maximum 30 characters",
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        message: "include Uppercase, Lowercase, digit and special character",
      },

      validate: (value) => {
        const { update_password, confirm_password } = getValues();
        return (
          update_password === confirm_password || "Passwords should match!"
        );
      },
    },
  };

  return (
    <>
      <div className="modal-overlay h-screen w-full bg-medium-purple fixed top-0 bottom-0 left-0 right-0 flex flex-col flex-nowrap justify-center items-center z-50">
        <div className="modal-body flex flex-col h-fit bg-white w-10/12 lg:w-8/12 rounded-xl p-2 md:p-4 lg:p-4">
          <div className="modal-body flex flex-row">
            <div className="hidden lg:flex flex-col flex-nowrap justify-center items-left w-1/2 p-8 pl-24 font-sans">
              <img src={EduviLogo} alt="eduvi logo" className="w-2/12 mb-4" />
              <span className=" leading-normal font-extrabold text-4xl mb-5">
                Password Reset
              </span>
              <span className=" leading-normal font-normal text-xs mb-5">
                Please update your password and keep your account secured.
              </span>
              <img
                src={PsdResetImg}
                alt="login asset"
                className="w-8/12 h-auto m-auto mb-3 mt-3"
              />
            </div>
            <img
              src={DividerVertical}
              alt="vertical divider"
              className="hidden lg:block  h-[500px] m-auto"
            />
            <div className="flex flex-col flex-nowrap justify-center items-center w-full lg:w-1/2 p-8 font-sans">
              <FormProvider {...methods}>
                <form
                  className="login-form w-full flex flex-col flex-nowrap justify-center items-center"
                  onSubmit={(e) => e.preventDefault()}>
                  <InputComponent
                    logo={
                      <GoLock className="relative top-7 left-3  text-gray-500" />
                    }
                    label="New Password"
                    id="update_password"
                    name="update_password"
                    placeholder="Enter password"
                    type="password"
                    required="required"
                    submitClicked={submitInputs}
                    {...conf_password_validation}
                  />
                  <InputComponent
                    logo={
                      <GoLock className="relative top-7 left-3  text-gray-500" />
                    }
                    label="Confirm Password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Enter password"
                    type="password"
                    required="required"
                    submitClicked={submitInputs}
                    {...conf_password_validation}
                  />
                  <button
                    onClick={submitInputs}
                    className="w-9/12 h-10 my-3 bg-medium-purple hover:bg-medium-purple-hover rounded-md text-white">
                    Reset Password
                  </button>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordResetPage;
