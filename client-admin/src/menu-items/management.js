// assets
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  SnippetsOutlined,
  BookOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  DeleteOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  SnippetsOutlined,
  BookOutlined,
  LoginOutlined,
  UserOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const management = {
  id: "utilities",
  title: "Management",
  type: "group",
  children: [
    {
      id: "course",
      title: "Course Management",
      type: "item",
      url: "/coursemanagement",
      icon: icons.SnippetsOutlined,
    },
    {
      id: "book",
      title: "Book Management",
      type: "item",
      url: "/bookmanagement",
      icon: icons.BookOutlined,
    },
    {
      id: "user",
      title: "User Management",
      type: "item",
      url: "/user",
      icon: icons.UserOutlined,
    },

    {
      id: "web",
      title: "Web Content Management",
      type: "item",
      url: "/webcontent",
      icon: icons.BgColorsOutlined,
    },
    {
      id: "quizquestions",
      title: "Quiz Management",
      type: "item",
      url: "/quizquestions",
      icon: icons.SnippetsOutlined,
    },
    {
      id: "trash",
      title: "Trash",
      type: "item",
      url: "/trash",
      icon: icons.DeleteOutlined,
      breadcrumbs: false,
    },
    {
      id: "logout",
      title: "Logout",
      type: "item",
      url: "/logout",
      icon: icons.LoginOutlined,
      breadcrumbs: false,
    },
  ],
};

export default management;
