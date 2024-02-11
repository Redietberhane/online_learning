import React from "react";
import { useNavigate } from "react-router-dom";
import BooksHeroImage from "../assets/booksheroimage.jpg";
import booksIcon from "../assets/booksicon.png";

function MyBooksHero() {
  const navigate = useNavigate();
  return (
    <div className="mx-8 bg-white rounded-3xl px-8 py-2 my-8 ">
      <div className="flex items-center justify-around py-4 flex-wrap-reverse lg:flex-nowrap">
        <>
          <span className="flex gap-4">
            <img src={booksIcon} alt="Books Icon" className="w-16 h-16" />
            <h2 className="text-4xl sm:text-6xl font-bold">
              {" "}
              My <span className="text-[#9C4DF4]">Books</span>
            </h2>
          </span>
        </>
        <img
          src="https://media.npr.org/assets/img/2022/12/22/gettyimages-1245203807-1536x1029_wide-9982607ca51f99999656d993bf5511d42533c0f2-s1100-c50.jpg"
          alt=""
          className="w-96 rounded-2xl"
        />
      </div>
    </div>
  );
}

export default MyBooksHero;
