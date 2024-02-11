import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { BiSearch } from "react-icons/bi";

const SearchComponent = ({ data }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();

    return inputValue === ""
      ? []
      : data.filter((course) =>
          course.title.toLowerCase().includes(inputValue)
        );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.title;

  const renderSuggestion = (suggestion) => (
    <div className="bg-light-purple  z-[500] relative top-0 text-black p-2">
      {suggestion.title}
    </div>
  );

  const handleInputChange = (e, { newValue }) => {
    setInputValue(newValue);
  };

  const handleSearchClick = () => {
    const results = data.filter(
      (course) => course.title.toLowerCase() === inputValue.toLowerCase()
    );
    setSearchResults(results);
    console.log(results); // Log the search results
  };

  const inputProps = {
    placeholder: "Search by course title",
    value: inputValue,
    onChange: handleInputChange,
    className:
      "w-full rounded-lg bg-transparent p-2 text-lg font-light pr-4 border-2 border-purple", // Add your custom CSS class here
  };

  return (
    <div className="flex sm:h-20 h-10 flex-row justify-between mx-3 basis-1/2 my-1">
      <Autosuggest
        suggestions={suggestions.slice(0, 4)} // Display only 4 suggestions
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        suggestionsContainerClassName="bg-red-400"
      />
      <button
        className="ml-1 h-fit rounded-lg bg-dark-purple sm:p-2 px-8 py-4 text-white hover:bg-blue-600 flex flex-row text-[1rem]"
        onClick={handleSearchClick}
      >
        <BiSearch className="mr-3  text-[1.5rem]" />
        <div className="my-auto">Search</div>
      </button>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
