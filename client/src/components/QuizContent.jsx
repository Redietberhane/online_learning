import React from "react";
import { useOutletContext } from "react-router-dom";

export default function QuizContent() {
  const {
    isFirstSection,
    isLastSection,
    handlePrevSection,
    handleNextSection,
  } = useOutletContext();
  return (
    <>
      <div>
        Quiz
      </div>
      <div className=" w-full my-4">
        <div className="flex justify-between w-full items-center">
          <button
            className={`rounded-lg border border-medium-purple py-2 px-4 text-medium-purple hover:text-dark-purple hover:border-dark-purple  ${
              isFirstSection ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevSection}
            disabled={isFirstSection}>
            Previous
          </button>
          <button
            className={`rounded-lg border border-medium-purple py-2 px-4 text-medium-purple hover:text-dark-purple hover:border-dark-purple ${
              isLastSection ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextSection}
            disabled={isLastSection}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
