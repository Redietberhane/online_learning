import axios from "axios";
import { useEffect, useState } from "react";
import { TiDeleteOutline, TiDownload } from "react-icons/ti";
import ResponseMessage from "./ResponseMessage";
function CartItemCourse({ cart_id, course_id, removeItem, addPrice }) {
  const [data, setData] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [response_msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get("/courses/getSingleCourse", { params: { courseID: course_id } })
      .then((response) => {
        setData(response.data[0]);
        addPrice(response.data[0].course_price);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [course_id, addPrice]);

  const partialDetails = data.course_details
    ? data.course_details.slice(0, 80)
    : "";

  const purchaseCourse = () => {
    axios
      .post("/enroll/enrollStudent", {
        user_id: localStorage.getItem("user_id"),
        course_id: course_id,
      })
      .then((response) => {
        setSubmitSuccess(true);
        setFailure(false);
        setMsg(response.data.message);
        setTimeout(() => {
          setSubmitSuccess(false);
          removeItem(cart_id, data.course_price);
        }, 4000);
      })
      .catch((error) => {
        setSubmitSuccess(true);
        setFailure(true);
        setMsg(error.response.data.message);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 4000);
      });
  };

  return (
    <>
      {submitSuccess && (
        <ResponseMessage message={response_msg} failure={failure} />
      )}
      <div className="w-fit md:min-w-[900px] relative shadow flex flex-row items-center max-w-max gap-1 lg:gap-6 px-2 md:gap-4  md:px-4 py-2 rounded">
        <div className="flex flex-col">
          <button
            onClick={() => purchaseCourse()}
            className=" absolute top-2 right-2 text-2xl md:hidden text-medium-purple my-6 ">
            <TiDownload />
          </button>
          <button
            onClick={() => removeItem(cart_id, data.course_price)}
            className=" absolute top-2 right-2 text-2xl md:hidden text-medium-purple ">
            <TiDeleteOutline />
          </button>
        </div>
        <div className=" bg-blue-400  rounded">
          <img
            src="https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            alt="aa"
            className="object-cover  h-[100px] min-w-[100px] md:w-[100px] rounded"
          />
        </div>
        <div className="w-full md:min-w-[450px] md:max-w-lg px-2 sm:px-0 py-2">
          <div className="mb-2">
            <h1 className="text-sm md:text-lg">{data.course_title}</h1>
            <p className="text-[11px] md:text-xs">{partialDetails}...</p>{" "}
          </div>
          <div className="flex flex-row mb-1.5 gap-1">
            <span className="text-[11px] md:text-xs">{data.course_rating}</span>
            {/* <span className="text-[11px]">XXXXXX</span> */}
          </div>
          <div className=" text-[11px] md:text-xs flex flex-row gap-5 items-center">
            <span>{data.course_total_hour} total hours</span>
            <span>Instructor {data.course_instructor} </span>
            <span>{data.course_level}</span>
          </div>
        </div>
        <div>
          <span className="text-medium-purple text-sm md:text-lg">
            ${data.course_price}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <button
            onClick={() => removeItem(cart_id, data.course_price)}
            className="button-component  px-4 hidden md:inline-block py-2 rounded-3xl sm:mx-2  md:mx-10  ">
            remove
          </button>
          <button
            onClick={() => purchaseCourse()}
            className=" button-component-stroke px-4 hidden md:inline-block py-2 rounded-3xl sm:mx-2  md:mx-10  ">
            purchase
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItemCourse;
