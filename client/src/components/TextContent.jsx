import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function TextContent() {
  const { sectionId } = useParams();
  const user_id = localStorage.getItem("user_id");
  const [pdfUrl, setPdfUrl] = useState("");
  const {
    isFirstSection,
    isLastSection,
    completed,
    fetchCompleted,
    handlePrevSection,
    handleNextSection,
  } = useOutletContext();
  const markComplete = () => {
    if (!completed.includes(sectionId)) {
      axios
        .post("/grades/addGrade", {
          section_id: sectionId,
          user_id,
          grade: null,
          completed: 1,
          link: null,
        })
        .then((res) => {
          console.log(res.data);
          fetchCompleted()
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    const fetchPdfFile = async () => {
      try {
        const response = await axios.get(
          `/sections/getSectionFile/${sectionId}`,
          {
            responseType: "arraybuffer",
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error fetching PDF file:", error);
      }
    };

    fetchPdfFile();

    return () => {
      // Clean up the PDF URL when the component unmounts
      URL.revokeObjectURL(pdfUrl);
    };
  }, [sectionId]);

  return (
    <>
      <div>
        {pdfUrl ? (
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        ) : (
          <p>Loading PDF file...</p>
        )}
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
          {!isLastSection && (
            <button
              className={`rounded-lg border border-medium-purple py-2 px-4 text-medium-purple hover:text-dark-purple hover:border-dark-purple ${
                isLastSection ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                markComplete();
                handleNextSection();
              }}
              disabled={isLastSection}>
              Next
            </button>
          )}
          {isLastSection && (
            <button
              className={`rounded-lg border border-medium-purple py-2 px-4 bg-dark-purple text-white hover:border-dark-purple 
            
            `}
              onClick={() => {
                markComplete();
                // navigate('/mycourses')
              }}
              // disabled={isLastSection}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </>
  );
}
