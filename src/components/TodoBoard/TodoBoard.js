import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import TodoList from "../TodoList/TodoList"
import { getPosts, updatePosAction } from "../../redux"

import styles from "./TodoBoard.module.css"

const TodoBoard = () => {
  const posts = useSelector((state) => state.posts.posts)
  const dispatch = useDispatch()

  // 드랍할 영역이 위치한 컴포넌트
  const postBoard = useRef(null)
  // post 하나의 reference
  const todoAppRef = useRef(null)

  // position은 실시간 좌표 / oriPosition은 원래 좌표만 담고 있음
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [oriPosition, setOriPosition] = useState({ x: 0, y: 0 })

  // fetch posts data
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  // Drag and Drop 구현
  // 드래그 시작되었을 때 실행 - onDragStart
  const dragStartHandler = (e) => {
    // 드래그 시 반투명 이미지 추가
    const img = new Image()
    e.dataTransfer.setDragImage(img, 0, 0)

    // 이동시킬 때 필요한 좌표
    setPosition({ x: e.clientX, y: e.clientY })

    // 초기 위치 값 (잘못된 위치에 놓았을 때 다시 원래 위치로 돌아갈 수 있도록)
    setOriPosition({ x: e.target.offsetLeft, y: e.target.offsetTop })
  }

  // 드래그 중일 때 실행 - onDrag
  const dragHandler = (e) => {
    // 요소의 좌표 + 커서 좌표 변화량
    // 현재 요소의 좌표 + 현재 커서의 좌표 - 직전 커서의 좌표
    e.target.style.left = `${e.target.offsetLeft + e.clientX - position.x}px`
    e.target.style.top = `${e.target.offsetTop + e.clientY - position.y}px`

    setPosition({ x: e.clientX, y: e.clientY })
  }

  // 드래그 끝났을 때 실행(마우스 놓으면서) - onDragEnd
  const dragEndHandler = (e) => {
    // 올바른 영역에 드랍 되었는지 체크
    const box = postBoard.current.getBoundingClientRect()
    const movedPos = { x: e.target.offsetLeft + e.clientX - position.x, y: e.target.offsetTop + e.clientY - position.y }

    if (box.left < e.clientX && e.clientX < box.right && box.top < e.clientY && e.clientY < box.bottom && movedPos.x > 0 && movedPos.y > 0) {
      // 옮겨진 자리
      e.target.style.left = `${movedPos.x}px`
      e.target.style.top = `${movedPos.y}px`
    } else {
      // 잘못된 영역이면 원래 위치로 이동
      e.target.style.left = `${oriPosition.x}px`
      e.target.style.top = `${oriPosition.y}px`
    }
    dispatch(updatePosAction({ x: e.target.style.left, y: e.target.style.top }))
  }

  return (
    <div className={styles.board} ref={postBoard}>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <TodoList
              key={post._id}
              todoAppRef={todoAppRef}
              post={post}
              dragStartHandler={dragStartHandler}
              dragHandler={dragHandler}
              dragEndHandler={dragEndHandler}
            />
          )
        })}
    </div>
  )
}

export default TodoBoard
