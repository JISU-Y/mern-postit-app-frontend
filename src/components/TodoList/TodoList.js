// react / redux
import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

// middleware
import { editDonePost, readPostContent, updatePost } from "../../redux"

// components
import TodoContainer from "../Todo/Todo"
import TodoForm from "../TodoForm/TodoForm"
import Modal from "../Modal/Modal"
import TagContainer from "../TagContainer/TagContainer"
import PostFooter from "../PostFooter/PostFooter"

import styles from "./TodoList.module.css"
import Spinner from "../Preloader/PostSpinner/Spinner"

const TodoList = ({
  dragStartHandler,
  dragHandler,
  dragEndHandler,
  post, //
  todoAppRef,
}) => {
  const _post = useSelector((state) => state.post)
  const user = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()
  const todos = post.todos
  // edit 상태 확인
  const [isEdit, setIsEdit] = useState(false)
  // loading 처리
  const [isLoading, setIsLoading] = useState(false)
  // todo edit 확인
  const [isTodoEdit, setIsTodoEdit] = useState(false)
  const [editTodo, setEditTodo] = useState("")
  // z index
  const [zIndex, setZindex] = useState("unset")
  // modal 관련
  const [modalType, setModalType] = useState({
    open: false,
    type: "",
    msg: "",
  })
  // post 위치 style
  let postStyle = {
    top: post.position.y,
    left: post.position.x,
    zIndex: zIndex,
  }

  // loading 처리
  useEffect(() => {
    setIsLoading(false)
  }, [post])

  const clear = useCallback(() => {
    dispatch(editDonePost()) // 업데이트 완료되었으니까 isEdit을 다시 false로
    setIsEdit(false)
    setIsTodoEdit(false)
    setZindex("unset")
  }, [dispatch])

  const handleEditPost = () => {
    // 로그인 한 user가 클릭했을 때만 반응
    if (user?.result?.googleId !== post?.creator && user?.result?._id !== post?.creator) return
    // edit 중 다른 post를 edit 하려고 할 때 warning
    if (_post.isEdit && !(post._id === _post._id)) {
      openSelectEditModal()
      return
    }

    // 수정하려고하는 post를 전역 state로 올린다.
    // 처음 설정할 때는 props로 받아온 post를, 다시 더블클릭한 경우에 초기화 될 수 있으므로
    // 두번째부터는 state에 업데이트 된 post를 state에서 읽어오도록 한다.
    dispatch(readPostContent(_post.name === "" ? post : _post))

    setIsEdit(true) // edit 상태로 변경
    setZindex(200)
  }

  // post edit done
  const handleEditDone = () => {
    // 구독하고 있던 post의 데이터들 다 변경되었으면 그거 전달해서 업데이트
    dispatch(updatePost(_post._id, _post))

    clear()

    if (post._id === _post._id) {
      // 현재 수정 중인 post와 Todoboard에서 넘겨 받은 post가 같을 때만
      setIsLoading(true)
    }
  }

  const onHover = () => {
    !isEdit && setZindex(101)
  }

  const onLeave = () => {
    !isEdit && setZindex("unset")
  }

  // esc 눌러서 불러왔던 post 선택을 무른다
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear()
      }
    }

    window.addEventListener("keyup", clearField)
    return () => {
      window.removeEventListener("keyup", clearField)
    }
  }, [clear])

  // MODAL

  // ask deleting modal
  const openRemoveModal = () => {
    setModalType({ open: true, type: "remove", msg: "Are you sure?" })
  }

  // edit done modal
  const openEditDoneModal = () => {
    setModalType({ open: true, type: "editDone", msg: "Editing done?" })
  }

  // check edit done modal (edit 상태 중복 방지)
  const openSelectEditModal = () => {
    setModalType({
      open: true,
      type: "editSelect",
      msg: "Please finish editing first or Press Esc to quit editing",
    })
  }

  // no input modal
  const openNoInputModal = () => {
    setModalType({
      open: true,
      type: "warning",
      msg: "You should enter an input",
    })
  }

  const closeModal = () => {
    setModalType(false, "", "")
  }

  const handleDragStart = (e) => {
    dragStartHandler(e)
  }
  const handleDragging = (e) => {
    dragHandler(e)
  }
  const handleDragEnd = (e) => {
    dragEndHandler(e)
  }

  // todo edit 상태
  const handleEditTodo = (todo) => {
    setIsTodoEdit(true)
    setEditTodo(todo)
  }
  const handleEditTodoDone = () => {
    setIsTodoEdit(false)
  }

  return (
    <div
      className={styles.todoPost}
      ref={todoAppRef}
      style={postStyle}
      onDoubleClick={handleEditPost}
      onDragStart={handleDragStart}
      onDrag={handleDragging}
      onDragEnd={handleDragEnd}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      draggable
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* tag component*/}
          <TagContainer isEdit={isEdit} tags={post.tag} />
          {/* Todo 입력 form / user가 있을 경우에만 / Edit 중인 경우만 form 보이기 */}
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
            (isEdit ? (
              <TodoForm
                isEdit={isEdit}
                openNoInputModal={openNoInputModal}
                editTodo={editTodo}
                isTodoEdit={isTodoEdit}
                handleEditTodoDone={handleEditTodoDone}
              />
            ) : (
              <p className={styles.instruction}>double tab to edit this post</p>
            ))}
          {/* Todo 항목 리스트 */}
          <TodoContainer
            isEdit={isEdit}
            todos={todos}
            openEditDoneModal={openEditDoneModal}
            openRemoveModal={openRemoveModal}
            onEditTodo={handleEditTodo}
          />
          {/* setting area */}
          <PostFooter isEdit={isEdit} post={post} openRemoveModal={openRemoveModal} openEditDoneModal={openEditDoneModal} />
        </>
      )}
      {/* notice modal */}
      <Modal post={post} modalType={modalType} close={closeModal} handleEditDone={handleEditDone} clear={clear} />
    </div>
  )
}

export default TodoList
