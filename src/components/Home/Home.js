import React, { useEffect } from "react"
import { Container, Typography, Paper } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"

import TodoBoard from "../TodoBoard/TodoBoard"
import { setUserAction } from "../../redux"

import styles from "./Home.module.css"

const Home = () => {
  const user = useSelector((state) => state.auth.authData)

  const dispatch = useDispatch()

  useEffect(() => {
    // localstorage에 로그인한 사용자 있으면
    dispatch(setUserAction(JSON.parse(localStorage.getItem("profile"))))
  }, [dispatch])

  return (
    <div className={styles.container}>
      {!user?.result?.name && (
        <Paper className={styles.admin}>
          <Typography variant="h6" align="center">
            Please Sign in or Sign up to create your own posts
          </Typography>
        </Paper>
      )}
      <div className={styles.board}>
        <TodoBoard />
      </div>
    </div>
  )
}

export default Home
