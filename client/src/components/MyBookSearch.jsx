import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import MyBooksCard from "./MyBooksCard";

const BookSearch = ({ searchData }) => {
  // const suggestions = searchData;
  const [suggestions, setSuggestions] = useState(searchData);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setInputValue(value);
      return setSearchResults([]);
    }
    setInputValue(value);
    setShowModal(true);

    setSuggestions(
      searchData.filter((book) =>
        book.book_title
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim())
      )
    );
  };

  const handleSuggestionClick = (title) => {
    //  console.log(title, "suggest");

    setInputValue(title);
    setShowModal(false);
  };

  const handleOnclick = () => {
    setShowModal(false);
    const filteredResults = searchData.filter((book) =>
      book.book_title
        .toLowerCase()
        .trim()
        .includes(inputValue.toLowerCase().trim())
    );

    setSearchResults([...filteredResults]);
  };

  const renderbooks = () => {
    const booksToRender = searchResults.length > 0 ? searchResults : searchData;

    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-8 my-8 px-5">
        {booksToRender.map((book, index) => (
          <MyBooksCard
            key={index}
            bookId={book.book_id}
            book_name={book.book_title}
            book_description={book.book_details}
            bookImagePath={book.book_thumbnail}
            authorName={book.book_author}
            rating={book.book_rating}
            price={book.book_price}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className=" w-full flex flex-col md:flex-row justify-start items-start md:items-center basis-1/2 my-3 ">
        <div className="relative w-5/12">
          <input
            type="text"
            id="book_search_input"
            placeholder="Search title of book"
            className="w-full rounded-lg bg-transparent p-2 py-3 text-xs md:text-base font-normal border-2 border-purple "
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => setShowModal(false)}
          />
          {showModal && (
            <div className="absolute top-[50px] left-0 w-full bg-purple-50 border rounded shadow-md z-10">
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onMouseDown={() => {
                      handleSuggestionClick(suggestion.book_title);
                    }}>
                    {suggestion.book_title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          className="w-fit flex flex-row items-center justify-between my-2 md:my-0 md:ml-1 md:mr-4 px-6 py-3 h-fit rounded-lg bg-dark-purple text-white hover:bg-medium-purple text-xs md:text-base "
          onClick={handleOnclick}>
          <BiSearch className=" text-base md:text-xl" />
          <div className="mx-2">Search</div>
        </button>

        <label
          htmlFor="sort"
          className=" w-fit font-semibold text-xs md:text-base text-medium-purple flex flex-row mx-2 items-center justify-center  ">
          <span className="text-sm md:text-lg">Sort by </span>
          <select
            name="sort"
            id="sort"
            className=" ml-2 rounded-md border-2 border-medium-purple p-2 bg-transparent text-medium-purple pr-12 ">
            <option value="a">Latest</option>
            <option value="b">Oldest</option>
            <option value="c">Alphabet</option>
          </select>
        </label>
      </div>

      {renderbooks()}
    </div>
  );
};

export default BookSearch;
