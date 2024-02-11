import React from "react";
import { motion } from "framer-motion";
import { BiErrorCircle } from "react-icons/bi";

function InputError({ message }) {
  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.5 },
  };
  return (
    <motion.p
      className=" flex flex-row flex-nowrap justify-start items-center px-2 py-1 mb-2 h-fit w-fit text-red-700  text-[8px] lg:text-xs md:text-xs text- bg-red-300 rounded-md "
      {...framer_error}>
      <BiErrorCircle className=" text-red-700" />
      &nbsp;
      {message}
    </motion.p>
  );
}

export default InputError;
