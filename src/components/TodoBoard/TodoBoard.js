import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import TodoList from "../TodoList/TodoList"
import { getPosts, createPost, updatePost, deletePost } from "../../redux"

import StartPostButton from "./PostButton"

import styles from "./TodoBoard.module.css"

// post format
const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: null, y: null },
}

const TodoBoard = ({ user }) => {
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
  }, [])

  // post를 추가하기만 하는 것 (일단 내용(todos)은 없는 것으로 하기)
  const AddPostHandler = async () => {
    // user name만 있는 빈 post 생성
    dispatch(
      createPost({
        ...initialState,
        name: user?.result?.name,
      })
    )
    // createPost 할 때 name은 따로 입력하지 않아도 Log in 되어 있으면 user의 name 가져와서 post create
  }

  // PostIt 삭제
  const removePostHandler = (id) => {
    if (id === 0) return

    dispatch(deletePost(id))
  }

  // Drag and Drop 구현
  // e.targe.className으로 해도 되는 것인지... **
  // e.target으로 안해도 되는 부분 있는지 보기 (DOM 직접 수정하는 부분)
  // 드래그 시작되었을 때 실행 - onDragStart
  const dragStartHandler = (e) => {
    if (e.target.className !== todoAppRef.current.className) return

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
    if (e.target.className !== todoAppRef.current.className) return

    // 요소의 좌표 + 커서 좌표 변화량
    // 현재 요소의 좌표 + 현재 커서의 좌표 - 직전 커서의 좌표
    e.target.style.left = `${e.target.offsetLeft + e.clientX - position.x}px`
    e.target.style.top = `${e.target.offsetTop + e.clientY - position.y}px`

    setPosition({ x: e.clientX, y: e.clientY })
  }

  // 드래그 끝났을 때 실행(마우스 놓으면서) - onDragEnd
  const dragEndHandler = (e, post) => {
    if (e.target.className !== todoAppRef.current.className) return
    // 올바른 영역에 드랍 되었는지 체크
    const box = postBoard.current.getBoundingClientRect()

    if (box.left < e.clientX && e.clientX < box.right && box.top < e.clientY && e.clientY < box.bottom) {
      // 옮겨진 자리
      e.target.style.left = `${e.target.offsetLeft + e.clientX - position.x}px`
      e.target.style.top = `${e.target.offsetTop + e.clientY - position.y}px`
    } else {
      // 잘못된 영역이면 원래 위치로 이동
      e.target.style.left = `${oriPosition.x}px`
      e.target.style.top = `${oriPosition.y}px`
    }

    dispatch(
      updatePost(post._id, {
        ...post,
        position: { x: e.target.style.left, y: e.target.style.top },
      })
    )
  }

  return (
    <div className={styles.board} ref={postBoard}>
      {/* {!postits.find((post) => post.name === user?.result?.name) && user?.result?.name && <StartPostButton AddPostHandler={AddPostHandler} />} */}
      {posts.length > 0
        ? posts.map((post) => {
            return (
              <TodoList
                key={post._id}
                todoAppRef={todoAppRef}
                post={post}
                user={user}
                dragStartHandler={dragStartHandler}
                dragHandler={dragHandler}
                dragEndHandler={dragEndHandler}
                AddPostHandler={AddPostHandler}
                removePostHandler={removePostHandler}
              />
            )
          })
        : user?.result?.name && <StartPostButton AddPostHandler={AddPostHandler} />}
    </div>
  )
}

export default TodoBoard
