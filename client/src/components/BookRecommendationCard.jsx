import React, { useState, useEffect } from "react";
import RecommendedBookImg from "../assets/RecommendedBookImg.png";

function BookRecommendationCard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data from your API or database here
    // Replace the URL with your actual API endpoint
    fetch("https://example.com/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="font-bold">
        <div className="flex flex-wrap my-4">
          {books.map((book, index) => (
            <div key={index} className="flex flex-col bg-white my-2">
              <a
                href={`/bookdetails/${book.id}`} // Assuming each book has a unique identifier like 'id'
                className="w-full border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50"
              >
                <div className="grid grid-cols-6 p-5 gap-y-2">
                  <div>
                    <img
                      src={RecommendedBookImg}
                      className="max-w-16 max-h-16"
                      alt="Book Thumbnail"
                    />
                  </div>
                  <div className="col-span-5 md:col-span-4 ml-4">
                    <p className="text-gray-600 font-bold">{book.title}</p>
                    <div className="flex items-center w-16">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <svg
                          key={starIndex}
                          className={`w-5 h-5 ${
                            starIndex <= book.rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-500"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-center mb-2">
                    <p className="rounded-lg text-dark-purple font-bold bg-light-purple py-1 px-3 text-sm w-fit h-fit">
                      {book.price}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookRecommendationCard;
