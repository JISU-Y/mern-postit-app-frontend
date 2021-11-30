import React, { useState } from "react"
import { Container, Typography, Paper } from "@material-ui/core"

import TodoBoard from "../TodoBoard/TodoBoard"

import styles from "./Home.module.css"

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile")) // localstorage에 로그인한 사용자 있으면

  return (
    <Container>
      {!user?.result?.name && (
        <Paper className={styles.admin}>
          <Typography variant="h6" align="center">
            Please Sign in or Sign up to create your own posts
          </Typography>
          {/* 여기에 버튼이 있었음 좋겠는데 (add post handler) */}
        </Paper>
      )}
      <div className={styles.container}>
        <TodoBoard user={user} />
      </div>
    </Container>
  )
}

export default Home
