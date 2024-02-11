
import { useEffect, useState } from "react";
import axios from "axios";
import ResponseMessage from "./ResponseMessage";

function SampleCard({
  courseId,
  course_name,
  courseImagePath,
  course_description,
  teacherName,
  rating,
  hoursNeeded,
  price,
  level,
}) {
  const images = require.context("../assets");

  const course_image = images(courseImagePath);
  const numbers = [1, 2, 3, 4, 5];
  const partialDesc = course_description ? course_description.slice(0, 80) : "";

  const [courseData, setcourseData] = useState({});
  const [addSuccess, setAddSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [resMsg, setResMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      axios
        .post("/cart/checkCourse", {
          course_id: courseId,
          user_id: localStorage.getItem("user_id"),
        })
        .then((res) => {
          if (res.data.message) {
            setAddSuccess(true);
            setFailure(false);
            setResMsg("Already in cart");
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, [courseId]);

  const addToCart = () => {
    axios
      .post("/cart/addToCart", {
        course_id: courseId,
        user_id: localStorage.getItem("user_id"),
        course_id: null,
      })
      .then((res) => {
        setAddSuccess(true);
        setFailure(false);
        setResMsg(res.data.message);
      })
      .catch((error) => {
        setResMsg(error.response.data.message);
        setAddSuccess(true);
        setFailure(true);
      });
  };

  return (
    <div>
      {/* Your card JSX */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <a
          href="#"
          className="w-full border-2 border-b-4 bg-white border-medium-purple mt-3 rounded-xl hover:bg-gray-50"
        >
          {/* ... Other card content */}
          <div className="col-span-5 md:col-span-4 ml-4">
            <p className="text-dark-purple font-bold text-sm">
              {courseData.title}
            </p>
            <p className="text-gray-600 font-bold text-xs">
              {courseData.instructor}
            </p>
            {/* ... Other course data */}
          </div>
          <div className="flex flex-col w-full justify-center items-center mt-4">
            {addSuccess && (
              <ResponseMessage failure={failure} message={resMsg} />
            )}

            {(!addSuccess || failure) &&
              localStorage.getItem("username") &&
              localStorage.getItem("user_id") && (
                <button
                  className="button-component-stroke w-fit py-2 px-8 mb-2"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              )}
          </div>
        </a>
      </div>
      {/* Display response message if needed */}
      {addSuccess && <ResponseMessage failure={failure} message={resMsg} />}
    </div>
  );
}

export default SampleCard;

{
  /* <div className="card bg-white border-l-8 rounded-lg shadow-md my-4 p-6">
<h1 className="text-4xl mb-4 font-bold">{course_title}</h1>
 <div  className="grid grid-cols-4 gap-4"> 
     <div className="col-span-1"><img className="w-60 h-13 " src={course_thumbnail} alt="books" /></div><div className="col-span-3"><p className="text-lg">{course_details}</p></div></div>
   
   
</div> */
}
