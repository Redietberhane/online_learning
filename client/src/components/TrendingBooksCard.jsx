import React from "react";
import TrendingBooksImg from "../assets/TrendingBooksImg.png";

const TrendingBooksCard = ({
  bookId,
  authorName,
  joinedDate,
  description,
  likes,
  book_thumbnail,
  bookImagePath,
}) => {
  const images = require.context("../../../server/books/thumbnails");
  console.log(bookImagePath, "bookImagePath");
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
  return (
    <div>
      <div>
        {/* <div className="flex bg-white border-medium-purple shadow-lg rounded-lg mx-4 md:mx-auto my-2 max-w-md md:max-w-2xl"> */}
        <div className="flex items-start px-4 py-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src={book_thumbnail}
            alt="author"
          />
          <div>
            <p className="text-gray-700"> {joinedDate}.</p>
            <p className="mt-3 text-gray-700 text-sm">{description}</p>
            <div className="mt-4 flex items-center">
              <div className="flex mr-2 text-gray-700 text-sm">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingBooksCard;
