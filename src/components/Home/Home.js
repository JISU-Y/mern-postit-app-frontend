import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import TodoBoard from "../TodoBoard/TodoBoard"
import Pallette from "../Pallette/Pallette"
import { setUserAction } from "../../redux"

import styles from "./Home.module.css"

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // localstorage에 로그인한 사용자 있으면
    dispatch(setUserAction(JSON.parse(localStorage.getItem("profile"))))
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Pallette />
      <TodoBoard />
    </div>
  )
}

export default Home
