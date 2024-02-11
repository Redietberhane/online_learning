// import { useState } from "react";
// import { Grid } from "../../../node_modules/@mui/material/index";

import { Outlet } from "../../../node_modules/react-router/dist/index";
import ComponentSkeleton from "./ComponentSkeleton";

export default function BookManagement() {
  return (
    <>
      <ComponentSkeleton>
        <Outlet />
      </ComponentSkeleton>
    </>
  );
}
