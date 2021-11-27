import React, { useState } from "react"

import { Avatar, Paper, Typography, Container } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import useStyles from "./sytles"

import LoginForm from "./LoginForm/LoginForm"

const Auth = () => {
  const classes = useStyles()
  const [isSignup, setIsSignup] = useState(false)

  const handleSwitchSign = () => {
    setIsSignup((prev) => !prev) // isSignup toggling
  }

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
        {/* Login-form */}
        <LoginForm isSignup={isSignup} onSwitch={handleSwitchSign} />
      </Paper>
    </Container>
  )
}

export default Auth
