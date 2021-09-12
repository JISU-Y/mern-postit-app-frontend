import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  // local storage에서 login 정보 가져옴
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation(); // 주소 변경되었을 때

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");
    setUser(null);
  };

  // user login 되었을 때 (여기서는 Login 되면 home으로 이동하는 것을 이용) re render
  useEffect(() => {
    // const token = user?.token;

    // JWT token 확인
    // if (token) {
    //   // JWT decode에서 expire 체크
    //   const decodedToken = decode(token);

    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link} // pointing to Home
          to="/"
          className={classes.heading}
          variant="h4"
          align="left"
        >
          Post Your Plans!
        </Typography>
        {/* <img className={classes.image} src={} alt="icon" height="60" /> */}
      </div>
      <Toolbar className={classes.toolbar}>
        {/* user login 여부에 따른 동작 */}
        {user ? (
          //   login 되었을 경우 user info 보여줌 (image / name / logout button)
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
