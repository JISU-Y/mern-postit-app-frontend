import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import TodoList from "../TodoList/TodoList"
import { getPosts, createPost, deletePost, updatePosAction } from "../../redux"

import AddPostButton from "./PostButton"

import styles from "./TodoBoard.module.css"

// post format
const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: null, y: null },
}

const TodoBoard = (props) => {
  const posts = useSelector((state) => state.posts.posts)
  const isChanged = useSelector((state) => state.posts.isChanged)
  const user = useSelector((state) => state.auth.authData)
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
  }, [dispatch, isChanged])
  // posts들이 store에서 업데이트가 되었다면 getPost를 다시 해주어서 list를 다시 뿌려준다.

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
  const dragEndHandler = (e) => {
    if (e.target.className !== todoAppRef.current.className) return
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
    // setPosition({ x: e.target.style.left, y: e.target.style.top })

    dispatch(updatePosAction({ x: e.target.style.left, y: e.target.style.top }))
  }

  return (
    <div className={styles.board} ref={postBoard}>
      {user?.result?.name && <AddPostButton AddPostHandler={AddPostHandler} />}
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
              AddPostHandler={AddPostHandler}
              removePostHandler={removePostHandler}
            />
          )
        })}
    </div>
  )
}

export default TodoBoard

// edit 중 일 때 다른 포스트 edit 못하게 막기
// 포스트들이 보드를 벗어나지 못하도록
// 로그인 되었는데, 아무것도 포스트가 없을 때 버튼 활성화 (잘 보이는 곳에)
// 함수들 정리

// 기능 추가
// Login navbar 커스텀
// 스피너
// 필터(내 포스트만 보기, 다 보기)
