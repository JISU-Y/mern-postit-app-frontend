import React, { useEffect } from "react"
import { Container, Typography, Paper } from "@material-ui/core"

import TodoBoard from "../TodoBoard/TodoBoard"

import styles from "./Home.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setUserAction } from "../../redux"

const Home = () => {
  const user = useSelector((state) => state.auth.authData)

  const dispatch = useDispatch()

  useEffect(() => {
    // localstorage에 로그인한 사용자 있으면
    dispatch(setUserAction(JSON.parse(localStorage.getItem("profile"))))
  }, [])

  return (
    <Container>
      {!user?.result?.name && (
        <Paper className={styles.admin}>
          <Typography variant="h6" align="center">
            Please Sign in or Sign up to create your own posts
          </Typography>
        </Paper>
      )}
      <div className={styles.container}>
        <TodoBoard />
      </div>
    </Container>
  )
}

export default Home
