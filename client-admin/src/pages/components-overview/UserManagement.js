import { useEffect, useState } from "react";
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

export default function UserManagement() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios
      .get("/users/getUsers")
      .then((res) => {
        // console.log(res.data);
        setUserList(
          res.data.map((item) => [
            item.user_full_name,
            item.user_email,
            item.user_id,
            item.user_id,
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
      .delete(`/users/deleteUser/${data}`)
      .then((res) => {
        // console.log(res.data);
        axios
          .get("/users/getUsers")
          .then((res) => {
            // console.log(res.data);
            setUserList(
              res.data.map((item) => [
                item.user_full_name,
                item.user_email,
                item.user_id,
                item.user_id,
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
      name: "Name",
      options: {
        filter: false,
      },
    },
    {
      name: "Email",
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
                    deleteBook(data);
                  }}>
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
        <Typography variant="h4">Users</Typography>
        <Typography variant="p">This section is to delete users.</Typography>
      </Box>
      <Box>
        <StyledMUIDataTable
          title={""}
          data={userList}
          columns={columns}
          options={options}
        />
      </Box>
    </>
  );
}
