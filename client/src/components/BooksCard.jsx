import React, { useEffect, useState } from "react";
import PersonIcon from "../assets/icons/person.svg";
import DollarIcon from "../assets/icons/dollar.svg";
import EmptyStarIcon from "../assets/icons/empty_star.svg";
import FullStarIcon from "../assets/icons/full_star.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import ResponseMessage from "./ResponseMessage";

function BooksCard({
  bookId,
  book_name,
  book_description,
  bookImagePath,
  authorName,
  rating,
  price,
}) {
  const images = require.context("../../../server/books/thumbnails");
  // console.log(bookImagePath, "bookImagePath");
  let book_image;
  try {
    if (bookImagePath !== null) {
      // console.log("is not null")
      book_image = images(`./${bookImagePath}`);
    } else {
      book_image = images("./default_book_image.png");
    }
  } catch (error) {
    book_image = images("./default_book_image.png");
  }
  const numbers = [1, 2, 3, 4, 5];

  const partialDesc = book_description ? book_description.slice(0, 80) : "";

  const [failure, setFailure] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [resMsg, setResMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      axios
        .post("/cart/checkBook", {
          book_id: bookId,
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
  }, [bookId]);

  const addToCart = () => {
    axios
      .post("/cart/addToCart", {
        book_id: bookId,
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
    <div
      className="relative bg-white rounded-lg border-t-8 border-x-2 min-h-[180px] lg:min-h-[380px] h-fit
         w-full border-medium-purple p-2 shadow-md transition-transform duration-300 ease-in-out
         hover:scale-[1.04] hover:-translate-y-1 hover:z-10 hover:drop-shadow-[0 35px 35px rgba(0, 0, 0, 1)]"
    >
      <Link to={`/bookdetails/${bookId}`} className="w-full cursor-pointer">
        <div className="flex flex-col w-full px-1 items-center justify-center mb-2">
          <span className="w-full self-start mb-2 text-sm lg:text-xl font-semibold font-sans">
            {book_name}
          </span>
          <span className="w-full self-start text-xs lg:text-sm font-light font-sans">
            {partialDesc} . . .
          </span>

          <img
            src={book_image}
            alt="book thumbnail"
            className="my-4 h-32 md:h-48 lg:h-52 w-auto"
          />
        </div>
        <div className="w-full grid px-2 md:grid-cols-2 lg:gap-2 text-xs lg:text-sm">
          <div className="flex flex-row flex-nowrap items-center justify-start mb-2">
            {rating}&nbsp;
            {numbers.map((number) => {
              if (number <= Math.floor(rating)) {
                return (
                  <img
                    key={number}
                    src={FullStarIcon}
                    alt="full star icon"
                    className="h-4 w-auto mr-1"
                  />
                );
              } else {
                return (
                  <img
                    key={number}
                    src={EmptyStarIcon}
                    alt="empty star icon"
                    className="h-4 w-auto mr-1"
                  />
                );
              }
            })}
          </div>
          <div className="flex flex-row flex-nowrap items-center justify-start mb-2">
            <img src={PersonIcon} alt="icon" className="h-4 w-auto" />
            <span className="ml-2">{authorName}</span>
          </div>
          <div className="flex flex-row flex-nowrap items-center justify-start mb-2">
            <img
              src={DollarIcon}
              alt="icon"
              className="h-4 w-auto fill-current text-writing-dark"
            />
            <span className="ml-2">{price}</span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col w-full justify-center items-center mt-4">
        {addSuccess && <ResponseMessage failure={failure} message={resMsg} />}

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
    </div>
  );
}
export default BooksCard;
