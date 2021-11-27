import React from "react"

import { GoogleLogin } from "react-google-login"

import { Button, Grid } from "@material-ui/core"
import Icon from "../../Icon"
import useStyles from "../../sytles"

const Buttons = (props) => {
  const classes = useStyles()

  return (
    <>
      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
        {props.isSignup ? "Sign Up" : "Sign In"}
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
        onSuccess={props.googleSuccess}
        onFailure={props.googleFailure}
        cookiePolicy="single_host_origin"
      />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button onClick={props.switchMode}>{props.isSignup ? "Already have the account? Sign In" : "Don't have an account? Sign Up"}</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Buttons
