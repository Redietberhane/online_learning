import React from "react";
import { useParams } from "react-router-dom";
import ReadingDetails from "../components/ReadingDetails";
import withAuth from "../utils/withAuth";

const ReadingPage = () => {
  const { bookId } = useParams();
  return (
    <div className="App">
      <h1 className="text-3xl font-semibold text-center p-4 text-dark-purple">
        Book Reader App
      </h1>
      <ReadingDetails bookId={bookId} />
    </div>
  );
};

export default withAuth(ReadingPage);
