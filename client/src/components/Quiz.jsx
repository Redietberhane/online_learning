import React, { useState, useEffect, useRef } from "react";

function Quiz() {
  const [submitted, setSubmitted] = useState(false);
  const iframeRef = useRef(null);

  const handleFormSubmit = () => {
    setSubmitted(true);
    // Perform any other actions you want to do when the form is submitted
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      const form = iframeDocument.querySelector("form");
      console.log("inside iframe effect");

      console.log("iframe doc", iframeDocument);
      console.log("iframe form", form);

      if (form) {
        form.addEventListener("submit", handleFormSubmit);
      }
    }

    return () => {
      if (iframe) {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        const form = iframeDocument.querySelector("form");

        if (form) {
          form.removeEventListener("submit", handleFormSubmit);
        }
      }
    };
  }, []);

  return (
    <div>
      <h1>Quiz title</h1>
      <button disabled={submitted}>Start Quiz</button>
      {submitted ? (
        <p>Quiz submitted! Display your desired content here.</p>
      ) : (
        <iframe
          title="quiz frame"
          className="w-full h-screen"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdqJ7Sy5SnCTW00hsT49BPVsIMAS5ZyHJ3CHEt7XRXtvQk8Ew/viewform?usp=sf_link"
          ref={iframeRef}></iframe>
      )}
    </div>
  );
}

export default Quiz;
