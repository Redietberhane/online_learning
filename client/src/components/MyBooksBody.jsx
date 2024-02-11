import { React, useEffect, useState } from "react";
import PopularBooksCard from "./PopularBooksCard";
import PopularBookImg from "../assets/PopularBookImg.png";

import MyBooksSearch from "./MyBookSearch";
import bookData from "./booksData";
import axios from "axios";
import BookRecommendationCard from "./BookRecommendationCard";

function MyBooksBody() {
  const [book, setBooks] = useState([...bookData]);
  const [popularBooks, setPopBooks] = useState([...bookData]);

  useEffect(() => {
    axios
      .get("/books/getPurchasedBooks")
      .then((res) => {
        setPopBooks([...res.data]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // navigate("/");
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row flex-nowrap w-full px-4">
      <div className="w-full md:w-1/4 text-xs md:text-sm px-8 md:px-2 pt-2 my-4 flex flex-col justify-start items-center">
        <div className="flex flex-col flex-nowrap">
          <div className="my-2 shadow-md">
            <h2 className="rounded-tl-lg rounded-tr-lg text-center bg-[#796bd4] px-3.5 py-2.5 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Recommended books
            </h2>
            <div className="flex flex-col flex-nowrap items-center max-h-[700px] overflow-y-auto pt-5">
              {/* {books.map((book, index) => (
            <BookRecommendationCard
              key={index}
              title={book.book_title}
              author={book.book_author}
              rating={book.book_rating}
              price={book.book_price}
              thumbnail={book.book_thumbnail}
            />
          ))} */}
              {popularBooks.map((book, index) => (
                <PopularBooksCard
                  bookId={book.book_id}
                  title={book.book_title}
                  instructor={book.book_author}
                  rating={book.book_rating}
                  price={book.book_price}
                  bookImagePath={book.book_thumbnail}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4 text-xs md:text-base px-4 md:px-8 my-4 flex flex-col justify-start items-center">
        <div className="flex  w-full m-2 my-3 flex-col sm:flex-row  items-start sm:justify-between">
          <MyBooksSearch searchData={book} />
        </div>
      </div>
    </div>
  );
}
export default MyBooksBody;
