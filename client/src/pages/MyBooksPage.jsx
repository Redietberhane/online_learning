import React from "react";
import MyBooksHero from "../components/MyBooksHero";
import MyBooksBody from "../components/MyBooksBody";
import withAuth from "../utils/withAuth";

function MyBooksPage() {
  return (
    <>
      <MyBooksHero />

      <MyBooksBody />
    </>
  );
}

export default withAuth(MyBooksPage);
