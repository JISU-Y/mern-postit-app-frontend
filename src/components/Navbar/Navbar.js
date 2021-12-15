import React, { useState, useEffect, useCallback } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import decode from "jwt-decode"

import { logoutAction, showPaletteAction } from "../../redux"

import { AppBar, Button, Slide, Toolbar, Typography, useScrollTrigger } from "@material-ui/core"
import styles from "./Navbar.module.css"

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 50,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Navbar = () => {
  // local storage에서 login 정보 가져옴
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const shouldShow = useSelector((state) => state.palette.shouldShowPal)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation() // 주소 변경되었을 때

  const logout = useCallback(() => {
    dispatch(logoutAction())

    history.push("/")
    setUser(null)
  }, [dispatch, history])

  // user login 되었을 때 (여기서는 Login 되면 home으로 이동하는 것을 이용) re render
  useEffect(() => {
    const token = user?.token

    // JWT token expire 확인
    if (token) {
      // JWT decode에서 expire 체크
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location, user?.token, logout])

  const handleShowPalette = () => {
    dispatch(showPaletteAction())
  }

  return (
    <HideOnScroll>
      <AppBar className={styles.appBar} style={{ flexDirection: "row", backgroundColor: "#9781B3", color: "black" }}>
        <div className={styles.brandContainer}>
          <Typography
            component={Link} // pointing to Home
            to="/"
            className={styles.heading}
            variant="h4"
            align="left"
          >
            Post It!
          </Typography>
          {/* <img className={styles.image} src={} alt="icon" height="60" /> */}
        </div>
        <Toolbar className={styles.toolbar} style={{ width: "500px" }}>
          {!shouldShow && (
            <Button variant="outlined" onClick={handleShowPalette} style={{ marginRight: "10px", fontSize: "15px", minWidth: "150px" }}>
              show Palette
            </Button>
          )}
          {/* user login 여부에 따른 동작 */}
          {user ? (
            //   login 되었을 경우 user info 보여줌 (image / name / logout button)
            <div className={styles.profile}>
              <Typography className={styles.userName} variant="h6" style={{ width: "125px", margin: "auto" }}>
                {user.result.name}
              </Typography>
              <Button variant="contained" className={styles.logout} color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default Navbar
