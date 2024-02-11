import React, { useState } from "react";
// import EduviLogo from "../assets/eduvi_logo.svg";
// import { useNavigate } from "react-router-dom";
import {
    // email_validation,
    // name_validation,
    password_validation,
} from "../utils/inputValidations";
import InputComponent from "./InputComponent";
// import GoogleIcon from "../assets/google_icon2.svg";
import { GoLock } from "react-icons/go";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
// import { AnimatePresence } from "framer-motion";
// import InputError from "./InputError";
import ResponseMessage from "./ResponseMessage";
import { BsFillXSquareFill } from "react-icons/bs";

function PassChangeModal({ toggle }) {
    const methods = useForm();

    const {
        // register,
        handleSubmit,
        // formState: { errors },
    } = methods;

    // const navigate = useNavigate();

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [response_msg, setMsg] = useState("");
    const [confirmation, setConfirmation] = useState("");
    // const [message, setMessage] = useState("");
    // const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const submitInputs = handleSubmit((data) => {
        console.log(data, "new psd");
        if (data.new_password !== data.confirm_password) {
            setSubmitSuccess(true);
            setMsg("Passwords do not match. Please confirm your new password.");
            setFailure(true);
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 4000);
        } else {
            const newData = {
                user_id: localStorage.getItem("user_id"), // Replace with your actual user_email value
                ...data,
            };

            axios
                .post("/auth/change-Password", newData) // Update the API endpoint as needed
                .then((res) => {
                    setSubmitSuccess(true);
                    setMsg("Password changed successfully.");
                    setFailure(false);

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
        }
    });

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
                        <h1 className="font-extrabold ml-8 text-lg">
                            Verify your password.
                        </h1>
                    </div>
                    {submitSuccess && (
                        <ResponseMessage
                            message={response_msg}
                            failure={failure}
                        />
                    )}
                    <FormProvider {...methods}>
                        <form
                            className="login-form w-full flex flex-col flex-nowrap justify-center items-center"
                            onSubmit={(e) => e.preventDefault()}>
                            <InputComponent
                                logo={
                                    <GoLock className="relative top-7 left-3  text-gray-500" />
                                }
                                name="new_password"
                                placeholder="New password"
                                type="password"
                                required="required"
                                submitClicked={submitInputs}
                                onChange={(e) => setNewPassword(e.target.value)}
                                {...password_validation}
                            />
                            <InputComponent
                                logo={
                                    <GoLock className="relative top-7 left-3  text-gray-500" />
                                }
                                name="confirm_password"
                                placeholder="Confirm the password"
                                type="password"
                                required="required"
                                submitClicked={submitInputs}
                                onChange={(e) =>
                                    setConfirmation(e.target.value)
                                }
                                {...password_validation}
                            />
                            <button
                                onClick={submitInputs}
                                className="w-9/12 h-10 my-3 bg-medium-purple hover:bg-medium-purple-hover rounded-md text-white">
                                Save Change
                            </button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    );
}

export default PassChangeModal;
