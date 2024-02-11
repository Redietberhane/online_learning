import React from "react";
import "../styles/ResponseMessage.css";
import { motion } from "framer-motion";
import { BsFillCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";

function ResponseMessage({ message, failure }) {
  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.5 },
  };
  const classNameVar = failure ? "error" : "success";
  const chosenLogo = failure ? (
    <BsFillXSquareFill className=" text-red-600 h-8 md:h-6 w-auto" />
  ) : (
    <BsFillCheckSquareFill className=" text-green-600 h-8 md:h-6 w-auto" />
  );

  return (
    <motion.div className={classNameVar} {...framer_error}>
      {chosenLogo}
      <span className="mx-4">{message}</span>
    </motion.div>
  );
}

export default ResponseMessage;
