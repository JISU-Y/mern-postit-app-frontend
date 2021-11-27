import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import TodoList from "../TodoList/TodoList"
import { createPost, deletePost } from "../../actions"

import StartPostButton from "./PostButton"

import styles from "./TodoBoard.module.css"

const TodoBoard = ({ currentId, setCurrentId, user }) => {
  // getPosts로 가져옴
  const postits = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  // post format
  const initialState = {
    name: "",
    tag: [],
    todos: [],
    position: { x: null, y: null },
  }

  const [post, setPost] = useState(initialState)
  const [posts, setPosts] = useState([]) // posts (post의 배열)

  // 드랍할 영역이 위치한 컴포넌트
  const postBoard = useRef(null)
  // position은 실시간 좌표 / oriPosition은 원래 좌표만 담고 있음
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [oriPosition, setOriPosition] = useState({ x: 0, y: 0 })

  // post 하나의 reference
  const todoAppRef = useRef(null)

  // 선택한 post
  useEffect(() => {
    // currentId가 0이면 그냥 null로 설정하고
    // currentId가 0이 아니고 뭔가 눌렸을 때는 그 currentId와 posts 중에 id가 같은 것을 찾아서 그 post를 반환
    let currentPost = currentId !== 0 ? posts.find((post) => post._id === currentId) : initialState

    setPost(currentPost)
  }, [currentId])

  // fetchData (posts)
  // postits에 store에서 가져온 데이터들을 이미 다 넣어두었는데, **
  // 굳이 setPosts를 해주어야 할까?
  // dispatch가 바뀔 때마다 실행하는 것(posts)를 새로 받아온 것으로 셋
  useEffect(() => {
    const fetchData = () => {
      setPosts(postits) // App js에서 getPosts로 가져온 postits를 set해줌
    }
    fetchData()
  }, [dispatch, postits, currentId])

  // post를 추가하기만 하는 것 (일단 내용(todos)은 없는 것으로 하기)
  const AddPostHandler = async () => {
    // user name만 있는 빈 post 생성
    dispatch(
      createPost({
        name: user?.result?.name,
        tag: [],
        todos: [],
        position: { x: null, y: null },
      })
    )

    // createPost 할 때 name은 따로 입력하지 않아도 Log in 되어 있으면 user의 name 가져와서 post create
  }

  // post it (id 선택된) 에 todos (할일 배열) set 해주는
  const setTodosHandler = async (todos) => {
    // id = _id / 나중에 tag 수정도 추가 / todos는 수정할 todo 배열
    if (currentId === 0) return

    let copiedPosts = posts.map((item) => (item._id === currentId ? { ...item, todos } : item))
    setPosts(copiedPosts)
  }

  // 밑에 set 함수들 다 통일할 수도 있겠는데ㅐ?

  const setPositionHandler = async (position) => {
    if (currentId === 0) return

    let copiedPosts = posts.map((item) => (item._id === currentId ? { ...item, position } : item))
    setPosts(copiedPosts)
  }

  const setTagsHandler = async (tags) => {
    if (currentId === 0) return

    let copiedPosts = posts.map((item) => (item._id === currentId ? { ...item, tag: tags } : item))
    setPosts(copiedPosts)
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

    // drag 끝난 것 가장 앞으로 보내기 / 혹은 클릭했을 때
    handlePostIndex(e)

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

    // const box = postBoard.current.getBoundingClientRect();

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
    if (box.left < e.clientX && e.clientX < box.right && box.top < e.clientY && e.clientY < box.bottom) {
      // 옮겨진 자리
      e.target.style.left = `${e.target.offsetLeft + e.clientX - position.x}px`
      e.target.style.top = `${e.target.offsetTop + e.clientY - position.y}px`
    } else {
      // 잘못된 영역이면 원래 위치로 이동
      e.target.style.left = `${oriPosition.x}px`
      e.target.style.top = `${oriPosition.y}px`
    }

    setPositionHandler({ x: e.target.style.left, y: e.target.style.top })
  }

  const handlePostIndex = (e) => {
    console.log(e.target.className, todoAppRef.current.className)

    if (e.target.className !== todoAppRef.current.className) return

    console.log("handlePostIndex")
    // childNodes/children는 nodeList라 이렇게 배열로 변환해주어야 loop syntax를 사용할 수 있다
    const allPosts = [...e.target.parentNode.children].filter((post) => post.className === "todo-app") // todo app 만 걸러냄(children에서 modal은 뺌)

    // 일단 모든 todo app 의 z-index를 unset
    allPosts.map((post) => (post.style.zIndex = "unset"))

    // 선택된 todo app의 z index만 100으로 변경
    e.target.style.zIndex = "100"

    // todo-app 클릭 시 / drag start 시 적용
  }

  return (
    <div className={styles.board} ref={postBoard}>
      {!posts.find((post) => post.name === user?.result?.name) && user?.result?.name && <StartPostButton AddPostHandler={AddPostHandler} />}
      {posts.length > 0
        ? posts.map((post) => {
            return (
              <TodoList
                dragStartHandler={dragStartHandler}
                dragHandler={dragHandler}
                dragEndHandler={dragEndHandler}
                key={post._id}
                posts={posts}
                post={post}
                setPost={setPost}
                setTodosHandler={setTodosHandler}
                handlePostIndex={handlePostIndex}
                AddPostHandler={AddPostHandler}
                removePostHandler={removePostHandler}
                currentId={currentId}
                setCurrentId={setCurrentId}
                setTagsHandler={setTagsHandler}
                user={user}
                todoAppRef={todoAppRef}
              />
            )
          })
        : user?.result?.name && <StartPostButton AddPostHandler={AddPostHandler} />}
    </div>
  )
}

export default TodoBoard
