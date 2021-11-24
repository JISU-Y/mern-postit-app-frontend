import React, { useEffect, useState } from "react"
import { Container, Typography, Paper } from "@material-ui/core"
import { useDispatch } from "react-redux" // dispatching an action

import { getPosts } from "../../functions/index"

import TodoBoard from "../TodoBoard"

const Home = () => {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(0)
  const user = JSON.parse(localStorage.getItem("profile")) // localstorage에 로그인한 사용자 있으면

  // dispatch 사용 시 actions 폴더에서 함수들을 가져와서 action을 dispatch 한다
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])

  return (
    <Container>
      {!user?.result?.name && (
        <Paper className="no-user-warning">
          <Typography variant="h6" align="center">
            Please Sign in or Sign up to create your own posts
          </Typography>
          {/* 여기에 버튼이 있었음 좋겠는데 (add post handler) */}
        </Paper>
      )}
      <div className="container">
        <TodoBoard currentId={currentId} setCurrentId={setCurrentId} user={user} />
      </div>
    </Container>
  )
}

export default Home
