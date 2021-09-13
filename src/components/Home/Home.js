import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux"; // dispatching an action

import { getPosts } from "../../functions/index";

import TodoBoard from "../TodoBoard";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));

  // dispatch 사용 시 actions 폴더에서 함수들을 가져와서 action을 dispatch 한다
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <Container>
      {!user?.result?.name && (
        <Paper className="no-user-warning">
          <Typography variant="h6" align="center">
            Please Sign in or Sign up to create your own posts
          </Typography>
        </Paper>
      )}
      <div className="container">
        <TodoBoard
          currentId={currentId}
          setCurrentId={setCurrentId}
          user={user}
        />
      </div>
    </Container>
  );
};

export default Home;
