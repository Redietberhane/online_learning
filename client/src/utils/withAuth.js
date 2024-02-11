import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
      axios
        .get("/auth/check-login")
        .then((response) => {
          setUser(response.data.user.username);
          setUserId(response.data.user.id);

          const expirationTime =
            (response.data.user.exp - response.data.user.iat) * 1000;
          setTimeout(() => {
            alert("Your session has expired. Please log in again.");
            axios.get("/auth/logout").then((res) => {
              navigate("/");
            });
          }, expirationTime);
        })
        .catch((error) => {
          navigate("/");
        });
    }, [navigate]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
