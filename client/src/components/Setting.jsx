import React, { useState } from "react";
import axios from "axios"; // Add this import
import "alpinejs";
import ProfilePictureChanger from "./ProfilePictureChanger";
import "tailwindcss/tailwind.css";


function Setting() {
  const [open, setOpen] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");


  const handleChangeName = () => {
    // Replace /* Add user_id here */ with the actual user_id
    const user_id = {}
  
    // Send a request to change the name on the server
    axios
      .post("/api/changeName", {
        user_id: user_id,
        new_Name: newName,
      })
      .then((response) => {
        // Handle success
        setMessage("Name changed successfully.");
      })
        .catch((error) => {
          // An error occurred during the request, and you can handle the error here.
          setMessage("Error changing name: " + error.message);
          console.error(error);
        });
      
  };
  

  return (
    <div className="bg-off-white">
      <div className="flex flex-col flex-nowrap my-3 bg-white rounded-lg shadow-md py-5 w-full justify-center items-center ">
        <h2 className="text-center  text-subscribe-purple text-2xl font-semibold ">
          Settings{" "}
        </h2>
      </div>

      <div className="bg-white p-3 shadow-sm rounded-sm px-10">
        <div className="flex flex-row flex-wrap space-x-2 font-semibold text-gray-900 leading-8">
          <div className="text-dark-purple">
            <svg
              className="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="tracking-wide">About</div>
        </div>
        <div className=" flex">
          {/* Profile Picture Changer */}
          <div className="py-5 ">
            {" "}
            <ProfilePictureChanger />
          </div>{" "}
          {/* Name Changer */}
          <div className="w-1/2 mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Change Name</h2>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="New Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <button
              className="bg-dark-purple text-white p-2 rounded hover:bg-light-purple"
              onClick={handleChangeName}>
              Change Name
            </button>
            {message && <div className="text-green-500 mt-2">{message}</div>}
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm rounded-sm px-10">
          <span className="tracking-wide text-xlg font-semibold">Courses</span>
          <div className="grid grid-cols-2">
            <div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span className="text-dark-purple">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Ongoing</span>
              </div>
              <ul className="list-inside space-y-2">
                <li>
                  <div className="text-dark-purple">
                    Owner at Her Company Inc.
                  </div>
                  <div className="text-gray-500 text-xs">March 2020 - Now</div>
                </li>
                <li>
                  <div className="text-dark-purple">
                    Owner at Her Company Inc.
                  </div>
                  <div className="text-gray-500 text-xs">March 2020 - Now</div>
                </li>
                <li>
                  <div className="text-dark-purple">
                    Owner at Her Company Inc.
                  </div>
                  <div className="text-gray-500 text-xs">March 2020 - Now</div>
                </li>
                <li>
                  <div className="text-dark-purple">
                    Owner at Her Company Inc.
                  </div>
                  <div className="text-gray-500 text-xs">March 2020 - Now</div>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span className="text-dark-purple">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      fill="#fff"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Completed Courses</span>
              </div>
              <ul className="list-inside space-y-2">
                <li>
                  <div className="text-dark-purple">
                    Masters Degree in Oxford
                  </div>
                  <div className="text-gray-500 text-xs">March 2020 - Now</div>
                </li>
                <li>
                  <div className="text-dark-purple">
                    Bachelors Degreen in LPU
                  </div>
                  <div className="text-gray-500 text-xs">March 2020 - Now</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Setting;
