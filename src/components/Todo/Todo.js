import React, { useState, useEffect, useCallback, useRef } from "react"
import { RiCloseCircleLine, RiEdit2Fill } from "react-icons/ri"

import TodoForm from "../TodoForm/TodoForm"
import PostMenu from "../ContextMenu/PostMenu"

import styles from "./Todo.module.css"

const Todo = (props) => {
  const [currTodoId, setCurrTodoId] = useState(0) // 이런것도 전역으로 관리하면 안되나
  const [edit, setEdit] = useState({
    todoText: null,
    todoDone: false,
  })
  const [show, setShow] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  const todoRef = useRef(null)

  const rowStyle = {
    pointerEvents: props.isEdit ? "initial" : "none",
  }

  const submitUpdate = (value) => {
    props.updateTodo(currTodoId, value) // edit 하려는 post의 id와 value를 넘겨줘야함
    setEdit({
      todoText: null,
      todoDone: false,
    })
  }

  // 오른쪽 클릭 메뉴 생성
  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault()
      if (!props.isEdit) {
        setShow(false)
        return
      }

      const rect = todoRef.current.getBoundingClientRect()
      console.log(rect)
      const rectX = e.clientX - rect.left // x position within the element.
      const rectY = e.clientY - rect.top // y position within the element.
      console.log(rectX, rectY)

      setAnchorPoint({ x: rectX, y: rectY })
      setShow(true)
    },
    [setAnchorPoint, setShow, props.isEdit]
  )

  const handleClick = useCallback(() => {
    setShow(() => (show ? false : null))
  }, [show])

  useEffect(() => {
    const _todoRef = todoRef.current
    document.addEventListener("click", handleClick)
    _todoRef.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("click", handleClick)
      _todoRef.removeEventListener("contextmenu", handleContextMenu)
      // context menu는 각각의 todoList에서 event를 생기게 하고
      // context menu를 없앨때는 어디든 클릭하면 없어져야 하므로 document로 한다
      document.removeEventListener("contextmenu", handleClick)
      // 다른 곳에서 오른쪽 클릭했을 때 없어지게 해야함...
    }
  }, [handleClick, handleContextMenu])

  const handleEditTodo = (todo) => {
    props.onEditTodo(todo.todoText)
    setCurrTodoId(todo._id)
    setEdit({
      todoText: todo.todoText,
      todoDone: false,
    })
  }

  return (
    <div ref={todoRef} className={styles.container}>
      {/* todoText가 원래 null인데 setEdit해서 뭐라도 들어가면 그때 TodoForm 열음 */}
      {/* {edit.todoText && <TodoForm edit={edit} onSubmit={submitUpdate} />} */}
      {props.todos.map((todo) => {
        return (
          <div className={todo.todoDone ? `${styles.row} ${styles.complete}` : `${styles.row}`} key={todo._id} style={rowStyle}>
            <div onClick={() => props.completeTodo(todo._id)}>{todo.todoText}</div>
            {props.isEdit && (
              <div className={styles.icons}>
                <RiCloseCircleLine onClick={() => props.removeTodo(todo._id)} className={styles.delete} />
                <RiEdit2Fill onClick={() => handleEditTodo(todo)} className={styles.edit} />
              </div>
            )}
          </div>
        )
      })}
      {show && (
        <PostMenu
          isEdit={props.isEdit}
          anchorPoint={anchorPoint}
          AddPostHandler={props.AddPostHandler}
          openEditDoneModal={props.openEditDoneModal}
          openRemoveModal={props.openRemoveModal}
        />
      )}
    </div>
  )
}

export default Todo
