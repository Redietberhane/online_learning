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
// import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
async function undeleteBookById(itemId) {
  try {
    // Replace the URL with your API endpoint and the desired item ID
    const apiUrl = `http://localhost:8800/api/books/getUndeletedBooks/${itemId}`;

    // Send a DELETE request to delete the item by ID
    const response = await axios.get(apiUrl);

    // Check if the item was deleted successfully
    if (response.status === 200) {
      //   alert(`Item with ID ${itemId} deleted successfully`);
    } else {
      // console.error("Error deleting item");
    }
  } catch (error) {
    // console.error("Error:", error.message);
  }
}
async function deletePermanentBookeById(itemId) {
  try {
    // Replace the URL with your API endpoint and the desired item ID
    const apiUrl = `http://localhost:8800/api/books/deletedPermanentBook/${itemId}`;

    // Send a DELETE request to delete the item by ID
    const response = await axios.delete(apiUrl);

    // Check if the item was deleted successfully
    if (response.status === 200) {
      //   alert(`Item with ID ${itemId} deleted successfully`);
    } else {
      // console.error("Error deleting item");
    }
  } catch (error) {
    // console.error("Error:", error.message);
  }
}
export default function BookTrash() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [state, setState] = useState(true);
  useEffect(() => {
    axios
      .get("/books/getDeletedBooks")
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
  }, [state]);

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
              <Tooltip title="Delete">
                <Button
                  color="error"
                  onClick={() => {
                    deletePermanentBookeById(data);
                    setState((s) => !s);
                  }}
                >
                  <DeleteOutlineIcon />
                </Button>
              </Tooltip>
              <Tooltip title="restore">
                <Button
                  onClick={() => {
                    // deleteBook(data);
                    undeleteBookById(data);
                    setState((s) => !s);
                  }}
                >
                  <RestoreIcon />
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
        {/* <Typography variant="h4">Books</Typography>
        <Typography variant="p">
          This section is to create and modify Books.
        </Typography> */}
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/bookmanagement/addbook");
          }}
        >
          Add Book
        </Button>
      </Box> */}
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
