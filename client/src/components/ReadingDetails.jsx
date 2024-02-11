// // src/components/BookDetails.js
// import React, { useEffect, useState } from "react";
// import Book from "../assets/The10XRule.pdf"

// const ReadingDetails = ({ bookId }) => {
//   // const [book, setBook] = useState(null);

//   // useEffect(() => {
//   //   // Replace with your API endpoint to fetch book details by bookId
//   //   fetch(`/api/books/${bookId}`)
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       setBook(data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching book details:", error);
//   //     });
//   // }, [bookId]);

//   // if (!Book) {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <div>
//       {/* <h2>{book.title}</h2>
//       <p>Author: {book.author}</p>
//       <p>Description: {book.description}</p>
//       <img src={book.coverImage} alt={book.title} /> */}
//       {/* Add more book details here */}
//     </div>
//   );
// };

// export default ReadingDetails;
import React from "react";
import Book from "../assets/AmharicCourse1.pdf";

const ReadingDetails = () => {
  const pdfContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    height: "150vh", // Set the maximum height for the PDF container
    margin: "40px", // Center the container horizontally
    padding: "20px", // Add some padding around the PDF
    border: "1px solid #796BD4", // Add a border for visual separation
    boxShadow: "0px 0px 10px #796BD4", // Add a shadow
  };

  const pdfStyle = {
    width: "100%",
    height: "100%",
  };

  const titleStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    textAlign: "center",
  };

  return (
    <div>
      <h2 style={titleStyle}>Book Title</h2>
      <div style={pdfContainerStyle}>
        <embed src={Book} type="application/pdf" style={pdfStyle} />
      </div>
    </div>
  );
};

export default ReadingDetails;
