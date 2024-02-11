import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function AssignmentContent() {
  const { sectionId } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const {
    isFirstSection,
    isLastSection,
    handlePrevSection,
    handleNextSection,
  } = useOutletContext();

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
