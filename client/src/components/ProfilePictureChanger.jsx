import React, { useState } from "react";

const ProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle profile picture submission
  const handleSubmit = () => {
    if (selectedFile) {
      // You can implement your logic here to upload the selectedFile to the server.
      // This is where you'd typically make an API call to update the user's profile picture.
      console.log("Uploading file:", selectedFile.name);
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Change Profile Picture</h2>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Select a File
        </label>
        <span className="ml-2">
          {selectedFile ? selectedFile.name : "No file selected"}
        </span>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-dark-purple hover:bg-medium-purple text-white py-2 px-4 rounded-lg "
      >
        Upload
      </button>
      <button
        onClick={handleSubmit}
        className="bg-light-purple hover:bg-medium-purple text-black py-2 px-4 rounded-lg"
      >
        Cancel
      </button>
    </div>
  );
};

export default ProfilePicture;
