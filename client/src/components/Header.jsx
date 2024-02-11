import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/Logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import DefaultProfile from "../assets/ProfilePic.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import ForgotPsdModal from "./ForgotPsdModal";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Books", to: "/books" },
  { name: "Courses", to: "/courses" },
];

const subNavigation = [
  // { name: "All Courses", to: "/courses" },
  { name: "My Books", to: "/mybooks" },
  // { name: "Learning", to: "/learning" },
  // { name: "My Status", to: "/" },
  { name: "My Courses", to: "/mycourses" },
  { name: "Cart", to: "/cart" },
];

const avatarNavigation = [
  { name: "Dashboard", to: "/profile/" },
  { name: "Privacy and Security", to: "/profile/privacy" },
  { name: "Settings", to: "/profile/setting" },
];

function Header({ logoutUpdate }) {
  // const methods = useForm();
  const navigate = useNavigate();

  // const [submitSuccess,   setSubmitSuccess] = useState(false);
  // const [failure, setFailure] = useState(false);
  // const [success_msg, setMsg] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signinModal, setSigninModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgotpsdModal, setForgotpsdModal] = useState(false);
  // const [resetpsdModal, setResetpsdModal] = useState(false);
  // const [userProfileImg, setUserprofileImg] = useState(
  //   "../assets/default_profile.svg"
  // );
  const [avatarState, setAvatarState] = useState(false);

  const setModalsArray = [
    setSigninModal,
    setSignupModal,
    setForgotpsdModal,
    // setResetpsdModal,
    setMobileMenuOpen,
  ];

  const avatarMenu = avatarState
    ? "z-10 absolute right-10 top-[72px] bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
    : "hidden";

  const logoutHandler = () => {
    axios
      .get("/auth/logout")
      .then((res) => {
        setTimeout(() => {
          localStorage.clear();
          alert("Logout Successful");
          setAvatarState(!avatarState);
          setMobileMenuOpen(false);
          logoutUpdate();
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setTimeout(() => {
          alert("Unexpected error during logout. Please try again. ");
        }, 2000);
      });
  };

  const openAvatar = () => {
    setAvatarState(!avatarState);
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const closeOthersExcept = (exceptionModal) => {
    const closingModals = setModalsArray.filter(
      (modal) => modal !== exceptionModal
    );
    closingModals.map((modal) => modal(false));
  };

  const toggleSignin = () => {
    setSigninModal(!signinModal);
    closeOthersExcept(setSigninModal);

    !signinModal ? disableScroll() : enableScroll();
  };

  const toggleSignup = () => {
    setSignupModal(!signupModal);
    closeOthersExcept(setSignupModal);

    !signupModal ? disableScroll() : enableScroll();
  };

  const ForgotPassword = () => {
    setForgotpsdModal(!forgotpsdModal);
    closeOthersExcept(setForgotpsdModal);
    !forgotpsdModal ? disableScroll() : enableScroll();
  };

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.prompt();
  // }, []);

  return (
    <>
      {signinModal && (
        <LoginModal
          toggleForgot={ForgotPassword}
          toggle={toggleSignin}
          toggleSignup={toggleSignup}
          logUpdate={logoutUpdate}
        />
      )}
      {signupModal && (
        <SignupModal toggle={toggleSignup} toggleSignin={toggleSignin} />
      )}
      {forgotpsdModal && (
        <ForgotPsdModal toggle={toggleSignup} toggleSignin={toggleSignin} />
      )}

      <header className="sticky flex flex-col flex-nowrap inset-x-0 top-0 z-30 bg-white">
        <div>
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]  bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <nav
            className=" text-writing-dark flex items-center justify-between px-6 py-3 lg:px-8"
            aria-label="Global">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <img className="h-8 w-auto" src={logo} alt="company logo" />
              </Link>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="top-nav-holder hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className="text-writing-dark">
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
              {localStorage.getItem("username") === null &&
              localStorage.getItem("user_id") === null ? (
                <>
                  <div onClick={toggleSignin} className="button-component h-12">
                    Log in{" "}
                  </div>
                  <div
                    onClick={toggleSignup}
                    className="button-component-stroke h-12">
                    Sign Up
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {/* profile avatar */}
                  <button
                    id="dropdownDefaultButton"
                    className="text-white min-w-[40%] cursor-default bg-light-purple h-14 font-medium  rounded-[32px] text-center flex flex-row flex-nowrap items-center justify-center "
                    type="button">
                    <span className="min-w-[50%] mx-2 font-sans text-sm text-dark-purple justify-self-start">
                      {localStorage.getItem("username")}
                    </span>
                    <Link to="/profile/">
                      <img
                        className="self-right cursor-pointer mr-2 relative hover:scale-105 inline-block h-10 w-auto rounded-[50%] object-cover object-center"
                        alt="avatar placeholder"
                        src={DefaultProfile}></img>
                    </Link>
                    <FontAwesomeIcon
                      onClick={openAvatar}
                      icon={faCaretDown}
                      className="text-dark-purple mx-1 mr-2 hover:text-writing-dark cursor-pointer w-auto h-5"
                    />
                  </button>
                  {/* Avatar Dropdown */}
                  <div id="dropdown" className={avatarMenu}>
                    <ul
                      className="py-2 text-sm text-writing-dark bg-light-purple"
                      aria-labelledby="dropdownDefaultButton">
                      {avatarNavigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.to}
                            className="block px-3 py-2 hover:bg-medium-purple hover:text-white hover:font-bold">
                            {item.name}
                          </a>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block w-full text-left px-3 py-2 hover:bg-medium-purple hover:text-white hover:font-bold"
                          onClick={logoutHandler}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </nav>

          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />

            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <NavLink to="/" className="-m-1.5 p-1.5">
                  <img className="h-8 w-auto" src={logo} alt="" />
                </NavLink>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {!(
                      localStorage.getItem("username") === null &&
                      localStorage.getItem("user_id") === null
                    ) && (
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className=" text-writing-dark hover:text-white font-semibold cursor-default bg-light-purple hover:bg-medium-purple h-14
                          rounded-sm text-center flex flex-row mx-3 px-3 
                          flex-nowrap items-center justify-start">
                        <img
                          className=" cursor-pointer relative inline-block h-10 w-auto rounded-[50%] object-cover object-center"
                          alt="avatar placeholder"
                          src={DefaultProfile}></img>
                        <span className="mx-2 font-sans">
                          {localStorage.getItem("username")}
                        </span>
                      </Link>
                    )}
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="mx-3 px-3 block rounded-lg py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {item.name}
                      </NavLink>
                    ))}
                  </div>

                  {/* mobile nav login */}

                  <div className="py-6">
                    {localStorage.getItem("username") === null &&
                    localStorage.getItem("user_id") === null ? (
                      <>
                        <div
                          onClick={toggleSignin}
                          className="button-component my-2">
                          Log in{" "}
                        </div>
                        <div
                          onClick={toggleSignup}
                          className="button-component-stroke my-2">
                          Sign Up
                        </div>
                      </>
                    ) : (
                      <button
                        className="button-component my-2"
                        onClick={logoutHandler}>
                        {" "}
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>

        {/* sub navigation */}

        {!(
          localStorage.getItem("username") === null &&
          localStorage.getItem("user_id") === null
        ) && (
          <div className="w-full h-14 bg-light-purple flex flex-row flex-nowrap justify-center items-center p-0">
            <nav className="sub-nav-holder flex flex-row flex-nowrap justify-center items-center h-full p-0">
              {subNavigation.map((item) => (
                <NavLink
                  exact="true"
                  key={item.name}
                  to={item.to}
                  className="sub-navs">
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
