import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import MyCourseCard from "./MyCourseCard";

const CoursesSearch = ({ searchData }) => {
  // const suggestions = searchData;
  const [suggestions, setSuggestions] = useState(searchData);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  // const [showSearch, setShowSearch] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setInputValue(value);
      return setSearchResults([]);
    }
    setInputValue(value);
    setShowModal(true);
    setSuggestions(
      searchData.filter((course) =>
        course.course_title
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim())
      )
    );
  };

  const handleSuggestionClick = (title) => {
    // console.log(title, "suggest");

    setInputValue(title);
    setShowModal(false);
  };

  const handleOnclick = () => {
    // console.log(inputValue, "suggestion");

    setShowModal(false);
    const filteredResults = searchData.filter((course) =>
      course.course_title
        .toLowerCase()
        .trim()

        .includes(inputValue.toLowerCase().trim())
    );

    setSearchResults([...filteredResults]);
  };

  const renderCourses = () => {
    const coursesToRender =
      searchResults.length > 0 ? searchResults : searchData;

    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-8 my-8 px-5">
        {coursesToRender.map((course, index) => (
          <MyCourseCard
            key={index}
            courseId={course.course_id}
            course_name={course.course_title}
            course_description={course.course_details}
            courseImagePath={course.course_thumbnail}
            hoursNeeded={course.course_total_hour}
            teacherName={course.course_instructor}
            rating={course.course_rating}
            price={course.course_price}
            level={course.course_level}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className=" w-full flex flex-col md:flex-row justify-start items-start md:items-center basis-1/2 my-3 z-0">
        <div className="relative w-5/12">
          <input
            type="text"
            id="search_input"
            placeholder="Search course name"
            className="w-full rounded-lg bg-transparent p-2 py-3 text-xs md:text-base font-normal border-2 border-purple "
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => setShowModal(false)}
          />
          {showModal && (
            <ul className="absolute  cursor-pointer top-10 left-0 w-full bg-purple-50 border rounded shadow-md z-50">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => {
                    handleSuggestionClick(suggestion.course_title);
                  }}>
                  {suggestion.course_title}
                </li>
              ))}
            </ul>
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
          <span
            className="text-sm md:text-lg"
            onClick={() => handleSuggestionClick("hello")}>
            Sort by{" "}
          </span>
          <select
            name="sort"
            id="sort"
            className=" ml-2 rounded-md border-2 border-medium-purple p-2 bg-transparent text-medium-purple pr-12 ">
            <option value="a">Latest</option>
            <option value="b">Oldest</option>
            <option value="c">c</option>
          </select>
        </label>
      </div>

      {renderCourses()}
    </div>
  );
};

export default CoursesSearch;
