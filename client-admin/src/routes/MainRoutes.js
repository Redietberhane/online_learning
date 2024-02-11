import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";
import AddCourse from "pages/components-overview/AddCourse";
import EditCourse from "pages/components-overview/EditCourse";
import CourseList from "pages/components-overview/CourseList";
import AddBook from "pages/components-overview/AddBook";
import EditBook from "pages/components-overview/EditBook";
import BookList from "pages/components-overview/BookList";
import CourseSections from "pages/components-overview/CourseSections";
import withAuth from "./withAuth";
import UserManagement from "pages/components-overview/UserManagement";
import Logout from "pages/components-overview/Logout";
import QuizQuestions from "pages/components-overview/QuizQuestions";
import QuizList from "pages/components-overview/QuizList";
import QuizManagement from "pages/components-overview/QuizManagement";
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard")));

// render - sample page
const SamplePage = Loadable(lazy(() => import("pages/extra-pages/SamplePage")));

// render - management
const CourseManagement = Loadable(
  lazy(() => import("pages/components-overview/CourseManagement"))
);
const WebContent = Loadable(
  lazy(() => import("pages/components-overview/WebContent"))
);
const BookManagement = Loadable(
  lazy(() => import("pages/components-overview/BookManagement"))
);
const CourseTrash = Loadable(
  lazy(() => import("pages/components-overview/CourseTrash"))
);
const BookTrash = Loadable(
  lazy(() => import("pages/components-overview/BookTrash"))
);

const Trash = Loadable(lazy(() => import("pages/components-overview/Trash")));
// ==============================|| MAIN ROUTING ||============================== //
// import withAuth from "./withAuth.js";
const Auth = withAuth(MainLayout);
console.log(Auth);
const MainRoutes = {
  path: "/",
  element: <Auth />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/webcontent",
      element: <WebContent />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "bookmanagement",
      element: <BookManagement />,
      children: [
        {
          path: "",
          element: <BookList />,
        },
        {
          path: "addbook",
          element: <AddBook />,
        },
        {
          path: "editbook/:id",
          element: <EditBook />,
        },
        // Update or add more routes here
      ],
    },
    {
      path: "coursemanagement",
      element: <CourseManagement />,
      children: [
        {
          path: "",
          element: <CourseList />,
        },
        {
          path: "addcourse",
          element: <AddCourse />,
        },
        {
          path: "editcourse/:id",
          element: <EditCourse />,
        },
        {
          path: "coursesections/:id",
          element: <CourseSections />,
        },
        // Update or add more routes here
      ],
    },
    {
      path: "user",
      element: <UserManagement />,
    },
    {
      path: "quizquestions",
      element: <QuizManagement />,
      children: [
        {
          path: "",
          element: <QuizList />,
        },
        {
          path: "questions/:id",
          element: <QuizQuestions />,
        },
      ],
    },
    {
      path: "trash",
      element: <Trash />,
      children: [
        {
          path: "",
          element: <CourseTrash />,
        },
        {
          path: "book",
          element: <BookTrash />,
        },
      ],
    },
    {
      path: "logout",
      element: <Logout />,
    },
  ],
};

export default MainRoutes;
// export default withAuth(MainRoutes);
