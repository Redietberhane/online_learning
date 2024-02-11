import React, { useState, useEffect } from "react";
import axios from "axios"; // You may need to install axios: npm install axios
import LoadingSpinner from "./LoadingSpinner"; // You can create a loading spinner component

function BookReader() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your API endpoint for fetching a book
    axios
      .get("/api/books/{book_id}")
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <LoadingSpinner /> // You can create a loading spinner component
      ) : (
        book && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{book.title}</h2>
            <p className="text-gray-700 mb-2">{book.author}</p>
            <p className="text-gray-600">{book.description}</p>
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="mt-4 w-full rounded"
            />
          </div>
        )
      )}
    </div>
  );
}

export default BookReader;
