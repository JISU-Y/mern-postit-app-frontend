import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./sytles";
import Input from "./Input";
import Icon from "./Icon";
import { signin, signup } from "../../functions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    // react에서는 form submit할 때 무조건 해줘야 한다
    e.preventDefault();

    // handleChange에서 set된 formData를
    // signup인지 아닌지에 따라 dispatch로 동작 전달한다
    if (isSignup) {
      dispatch(signup(formData, history)); // history는 어떤 동작이 일어난 것을 전달???
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    // handlechange를 모든 form에서 사용하고 있음
    // 그렇기 때문에, formData는 기존 데이터를 뿌리고
    // 현재 수정하고 있는 요소만 변경해야함 => 각 요소들이 가지고 있는 name을 이용
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev); // showPassword toggling

  const switchMode = () => {
    setIsSignup((prev) => !prev); // isSignup toggling
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // console.log(res);
    // ?. res가 없으면 error 안띄우도록 하는 연산자
    // .만 하면 cannot get property profileObj of undefined
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      // AUTH 동작하도록 type에는 AUTH
      // payload data에는 profile 정보를 가지고 있는 result와 tokenId를 전달
      dispatch({ type: "AUTH", data: { result, token } });

      // if loged in, redirect to Home immediately
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Paper = White style div */}
      <Paper className={classes.paper} elevation={3}>
        {/* user profile */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* Form의 제목 (Sign up 인지 Sign in 인지) */}
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* sign in component랑 sign up component랑 따로 만들지 않아도
                  이렇게 isSignup 변수 하나만 가지고 한 component로 나타낼 수 있다 */}
            {/* SignUp인 경우에는 email password 위에 name, 아래에는 confirm password 도 추가한다 */}
            {isSignup && (
              <>
                {/* Gird안 TextField 형식이 계속 반복되므로 Input component를 따로 생성해서 사용 */}
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* Google Log in component */}
          <GoogleLogin
            clientId="868584789911-k3r3sq4v830kcqadfdfflfjvifm1mnuc.apps.googleusercontent.com"
            // 버튼이 어떻게 보일 것인지
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
