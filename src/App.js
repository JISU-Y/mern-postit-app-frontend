import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; // dispatching an action

import { getPosts } from "./functions/index";
import Navbar from "./components/Navbar/Navbar";
import TodoBoard from "./components/TodoBoard";

function App() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  // dispatch 사용 시 actions 폴더에서 함수들을 가져와서 action을 dispatch 한다
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <div className="container">
          <TodoBoard currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </Container>
    </BrowserRouter>
  );
}

export default App;
