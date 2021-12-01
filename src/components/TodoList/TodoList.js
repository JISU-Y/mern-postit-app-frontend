// react / redux
import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

// middleware
import { updatePost } from "../../redux"

// components
import TodoContainer from "../Todo/Todo"
import TodoForm from "../TodoForm/TodoForm"
import Modal from "../Modal/Modal"
import TagContainer from "../TagContainer/TagContainer"
import PostFooter from "../PostFooter/PostFooter"

import styles from "./TodoList.module.css"

//todoList 는 TodoBoard에서 가져온 todos의 배열 중 배열 한 개씩
const TodoList = ({
  dragStartHandler,
  dragHandler,
  dragEndHandler,
  post, //
  AddPostHandler,
  removePostHandler,
  user,
  todoAppRef,
}) => {
  const dispatch = useDispatch()
  const todos = post.todos
  const tags = post.tag
  // edit 상태 확인 // 이것도 redux state에 저장
  const [isEdit, setIsEdit] = useState(false)
  // todo edit 확인
  const [isTodoEdit, setIsTodoEdit] = useState(false)
  const [editText, setEditText] = useState("")
  // modal 관련
  const [modalType, setModalType] = useState({
    open: false,
    type: "",
    msg: "",
  })

  // change colors
  const [colorIndex, setColorIndex] = useState(1)
  const postColor = ["#ffd20c", "#5d0cff", "#ff7614", "#149fff", "#fa0087"]

  // post 위치 style
  let postStyle = {
    top: post.position.y,
    left: post.position.x,
  }

  // Todos CRUD

  // Todo add
  const addTodo = (todo) => {
    // todo는 {todoText: postTodo.todoText, todoDone:false}
    // 추가하려고 하는 todo의 todoText를 검사
    if (!todo.todoText || /^\s*$/.test(todo.todoText)) {
      return
    }

    // 새 todo와 기존의 todos 배열을 합침 (할일 리스트를 배열로 모음)
    const newTodos = [todo, ...todos]
    dispatch(
      updatePost(post._id, {
        ...post,
        todos: newTodos,
      })
    )
  }

  // Todo delete
  const removeTodo = (id) => {
    const removeTodos = todos.filter((todo) => todo._id !== id)
    dispatch(
      updatePost(post._id, {
        ...post,
        todos: removeTodos,
      })
    )
  }

  // Todo update (todo text)
  const updateTodo = (todoId, newValue) => {
    // edit 끝낸 todo value가 빈 String인지 확인
    if (!newValue.todoText || /^\s*$/.test(newValue.todoText)) {
      return
    }

    let updatedTodos = todos.map((todo) =>
      todo._id === todoId
        ? {
            ...todo,
            todoText: newValue.todoText,
            todoDone: newValue.todoDone,
          }
        : todo
    )

    dispatch(
      updatePost(post._id, {
        ...post,
        todos: updatedTodos,
      })
    )
  }

  // Todo update (todo completed)
  const completeTodo = (todoId) => {
    let updatedTodos = todos.map((todo) => (todo._id === todoId ? { ...todo, todoDone: !todo.todoDone } : todo))
    dispatch(
      updatePost(post._id, {
        ...post,
        todos: updatedTodos,
      })
    )
  }

  // add Tags
  const handleAddTags = (tagName) => {
    if (tags.includes(tagName)) return

    // const habits = [...tags, { id: Date.now(), tagName }]
    const addedTags = [...tags, tagName]
    dispatch(
      updatePost(post._id, {
        ...post,
        tag: addedTags,
      })
    )
  }

  // remove Tags
  const handleRemoveTags = (tagName) => {
    const removedTags = tags.filter((tag) => tag !== tagName)
    dispatch(
      updatePost(post._id, {
        ...post,
        tag: removedTags,
      })
    )
  }

  // post edit done
  // 과연 posts 전체를 받아와서 사용하는 것이 맞는 것일까..**
  // posts를 넘기지말고 그냥 이미 find 한 post를 currentPost로 넘기면 안되나
  const handleEditDone = () => {
    console.log("edit done")
    // dispatch(
    //   updatePost(
    //     currentId,
    //     posts.find((post) => post._id === currentId)
    //   )
    // )
    clear()
  }

  const handleEditPost = () => {
    // 로그인 한 user가 클릭했을 때만 반응
    if (user?.result?.googleId !== post?.creator && user?.result?._id !== post?.creator) return
    // edit 중 다른 post를 edit 하려고 할 때 warning
    // 내 포스트 중에 하나라도 edit 상태인 것이 있으면 ***
    // if (currentId !== 0 && currentId !== post._id) {
    //   console.log(`${currentId} => ${post._id}`)
    //   openSelectEditModal()
    //   return
    // }

    // setCurrentId(post._id) // 선택한 post의 id set
    setIsEdit(true) // edit 상태로 변경
  }

  // esc 눌러서 불러왔던 post 선택을 무른다
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear()
      }
    }

    window.addEventListener("keydown", clearField)
    return () => {
      window.removeEventListener("keydown", clearField)
    }
  }, [])

  const clear = () => {
    // setCurrentId(0)
    setIsEdit(false)
    setIsTodoEdit(false)
    console.log("clear")
  }

  // 포스트 삭제 modal
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
    if (!isEdit) return

    dragStartHandler(e)
  }
  const handleDragging = (e) => {
    if (!isEdit) return

    dragHandler(e)
  }
  const handleDragEnd = (e) => {
    if (!isEdit) return

    dragEndHandler(e, post)
  }

  const handleEditTodo = (text) => {
    setIsTodoEdit(true)
    setEditText(text)
    console.log(text) // 이 내용을 Todo Form에다가 전달하고 싶은데..
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
      draggable
    >
      {/* tag component*/}
      <TagContainer isEdit={isEdit} tags={tags} handleAddTags={handleAddTags} handleRemoveTags={handleRemoveTags} />
      {/* Todo 입력 form / user가 있을 경우에만 / Edit 중인 경우만 form 보이기 */}
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
        (isEdit ? (
          <TodoForm
            onAddSubmit={addTodo}
            onUpdateSubmit={updateTodo}
            openNoInputModal={openNoInputModal}
            isEdit={isEdit}
            post={post}
            editText={editText}
            isTodoEdit={isTodoEdit}
          />
        ) : (
          <p className={styles.instruction}>double tab to edit this post</p>
        ))}
      {/* Todo 항목 리스트 */}
      <TodoContainer
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        isEdit={isEdit}
        post={post}
        AddPostHandler={AddPostHandler}
        openEditDoneModal={openEditDoneModal}
        openRemoveModal={openRemoveModal}
        onEditTodo={handleEditTodo}
      />
      {/* setting area */}
      <PostFooter
        isEdit={isEdit}
        userGoogleId={user?.result?.googleId}
        userId={user?.result?._id}
        post={post}
        postCreator={post?.creator}
        AddPostHandler={AddPostHandler}
        openRemoveModal={openRemoveModal}
        openEditDoneModal={openEditDoneModal}
      />
      {/* notice modal */}
      <Modal
        modalType={modalType}
        close={closeModal}
        post={post}
        removePostHandler={removePostHandler}
        handleEditDone={handleEditDone}
        clear={clear}
      />
    </div>
  )
}

export default TodoList
