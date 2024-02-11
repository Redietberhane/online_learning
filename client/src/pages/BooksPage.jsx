import React from "react";
import BooksHero from "../components/BooksHero";
import BooksBody from "../components/BooksBody";
import Subscription from "../components/Subscription";

function BooksPage() {
  return (
    <>
      <BooksHero />

      <BooksBody />
      {/* <Subscription /> */}
    </>
  );
}

export default BooksPage;
