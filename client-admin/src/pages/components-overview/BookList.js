import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import MUIDataTable from "mui-datatables";
import {
  Typography,
  Box,
  Button,
  Tooltip,
  // ButtonBase,
} from "@mui/material";
import { useNavigate } from "../../../node_modules/react-router/dist/index";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

export default function CourseList() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    axios
      .get("/books/getBooks")
      .then((res) => {
        // console.log(res.data);
        setBookList(
          res.data.map((item) => [
            item.book_title,
            item.book_author,
            item.book_purchases,
            item.book_price,
            item.book_id,
            item.book_rating,
            item.book_id,
          ])
        );
      })
      .catch((error) => {
        // console.error(error);
      });
  }, []);
  const deleteBook = (data) => {
    // console.log(data);
    axios
      .delete("/books/deleteBook", { data: { id: data } })
      .then((res) => {
        // console.log(res.data);
        axios
          .get("/books/getBooks")
          .then((res) => {
            // console.log(res.data);
            setBookList(
              res.data.map((item) => [
                item.book_title,
                item.book_author,
                item.book_purchases,
                item.book_price,
                item.book_id,
                item.book_rating,
                item.book_id,
              ])
            );
          })
          .catch((error) => {
            // console.error(error);
          });
      })
      .catch((err) => {
        // console.error(err);
      });
  };
  const options = {
    // filterType: "checkbox",
    elevation: 0,
    selectableRows: "none",
  };
  const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
    background: theme.palette.background.default,
  }));
  const columns = [
    {
      name: "Title",
      options: {
        filter: false,
      },
    },
    {
      name: "Author",
      options: {
        filter: false,
      },
    },
    {
      name: "Purchases",
      options: {
        filter: false,
      },
    },
    {
      name: "Price",
      options: {
        filter: false,
      },
    },
    {
      name: "ID",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "Rating",
      options: {
        display: true,
        filter: false,
      },
    },
    {
      label: "ACTION",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          let data = value;
          return (
            <>
              <Tooltip title="Edit">
                <Button
                  onClick={() => {
                    // console.log(data);
                    navigate(`/bookmanagement/editbook/${data}`);
                  }}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  color="error"
                  onClick={() => {
                    deleteBook(data);
                  }}
                >
                  <DeleteOutlineIcon />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
      name: "update",
    },
  ];
  return (
    <>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h4">Books</Typography>
        <Typography variant="p">
          This section is to create and modify Books.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/bookmanagement/addbook");
          }}
        >
          Add Book
        </Button>
      </Box>
      <Box>
        <StyledMUIDataTable
          title={""}
          data={bookList}
          columns={columns}
          options={options}
        />
      </Box>
    </>
  );
}
