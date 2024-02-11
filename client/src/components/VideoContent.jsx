import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
// import fs from 'fs';
import { useOutletContext } from "react-router-dom";

export default function VideoContent() {
  const { sectionId } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const user_id = localStorage.getItem("user_id");

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
          // console.log(res.data);
          fetchCompleted();
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };
  // useEffect(() => {
  //   let videoBlobUrl;

  //   const fetchVideoFile = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/sections/getSectionVideo/${sectionId}`,
  //         {
  //           responseType: "blob",
  //         }
  //       );
  //       console.log(response.data);
  //       const videoBlob = new Blob([response.data], { type: "video/mp4" });
  //       const videoUrl = URL.createObjectURL(videoBlob);
  //       setVideoUrl(videoUrl);
  //     } catch (error) {
  //       console.error("Error fetching video file:", error);
  //     }
  //   };

  //   fetchVideoFile();

  //   return () => {
  //     // Clean up the video URL when the component unmounts
  //     URL.revokeObjectURL(videoBlobUrl);
  //   };
  // }, [sectionId]);

  return (
    <>
      <div>
        <video id="videoPlayer" width="100%" controls autoPlay>
          <source
            src={`/sections/getSectionVideo/${sectionId}`}
            type="video/mp4"
          />
        </video>
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

// export default function VideoContent() {
//   const { sectionId } = useParams();
//   const [videoUrl, setVideoUrl] = useState("");

//   // useEffect(() => {
//   //   let videoBlobUrl;

//   //   const fetchVideoFile = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `/sections/getSectionVideo/${sectionId}`,
//   //         {
//   //           responseType: "blob",
//   //         }
//   //       );
//   //       console.log(response.data);
//   //       const videoBlob = new Blob([response.data], { type: "video/mp4" });
//   //       const videoUrl = URL.createObjectURL(videoBlob);
//   //       setVideoUrl(videoUrl);
//   //     } catch (error) {
//   //       console.error("Error fetching video file:", error);
//   //     }
//   //   };

//   //   fetchVideoFile();

//   //   return () => {
//   //     // Clean up the video URL when the component unmounts
//   //     URL.revokeObjectURL(videoBlobUrl);
//   //   };
//   // }, [sectionId]);
//   const videoContext = require.context('../../../server/sections/files', false, /\.(mp4|mov)$/);
//   const videoFileName = `${sectionId}.mp4`;
//   const videoPath = videoContext(`./${videoFileName}`);

//   return (
//     <div>
//       {/* {videoUrl ? (
//         <ReactPlayer
//           url={videoUrl}
//           playing={true}
//           controls={true}
//           width="100%"
//           height="auto"
//         />
//       ) : (
//         <p>Loading video file...</p>
//       )} */}
//       <video controls>
//         <source src={videoPath} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       {/* <video src={`../../../server/sections/files/${sectionId}.mp4`} controls className="w-full" /> */}
//     </div>
//   );
// }
