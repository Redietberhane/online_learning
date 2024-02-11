import React, { useState, useEffect } from "react";
import PaVerificationModal from "./PaVerificationModal";
import ChangeEmailModal from "./changeEmailModal";
import PassChangeModal from "./passChangeModal";
import axios from "axios";

function ProfilePrivacy() {
  const [currentEmail, setCurrnetEmail] = useState(
    localStorage.getItem("email")
  );
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState(
    localStorage.getItem("password")
  );
  const [newPassword, setNewPassword] = useState("");
  const [paModal, setPaModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [toggleThis, setToggleThis] = useState("");

  const toggleModal = () => {
    setPaModal(!paModal);
  };
  const toggleEmailModal = () => {
    setEmailModal(!emailModal);
  };
  const togglePassModal = () => {
    setPassModal(!passModal);
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const apiUrl = `/users/getUserById/${userId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const { user_email, user_password } = response.data[0];

        // Set user email and password in state
        setCurrentPassword(user_password);
        setCurrnetEmail(user_email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  return (
    <div>
      {paModal && (
        <PaVerificationModal
          toggle={toggleModal}
          setPaModal={setPaModal}
          toggleEmail={toggleEmailModal}
          togglePass={togglePassModal}
          toggleThis={toggleThis}
        />
      )}
      {emailModal && <ChangeEmailModal toggle={toggleEmailModal} />}
      {passModal && <PassChangeModal toggle={togglePassModal} />}
      <div className="flex flex-col flex-nowrap my-3 bg-white rounded-lg shadow-md py-5 w-full justify-center items-center ">
        <h2 className="text-center  text-subscribe-purple text-2xl font-semibold ">
          Privacy & Security{" "}
        </h2>
      </div>
      <div className="w-1/2 mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Email</h2>

        <div className="mb-4">
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Your Email"
            value={currentEmail}
            readOnly={true}
          />
        </div>
        <button
          className="bg-dark-purple text-white p-2 rounded hover:bg-light-purple"
          onClick={() => {
            setToggleThis("toggleEmail");
            setPaModal(true);
          }}
        >
          Change Email
        </button>
        {message && <div className="text-red-500 mt-2">{message}</div>}
      </div>
      <div className="w-1/2 mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Password</h2>
        <div className="mb-4">
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-dark-purple text-white p-2 rounded hover:bg-light-purple"
          onClick={() => {
            setToggleThis("togglePass");
            setPaModal(true);
          }}
        >
          Change Password
        </button>
        {message && <div className="text-red-500 mt-2">{message}</div>}
      </div>
    </div>
  );
}
export default ProfilePrivacy;
