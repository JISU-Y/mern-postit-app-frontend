import React, { useState, useEffect, useCallback, useRef } from "react"
import { RiCloseCircleLine, RiEdit2Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"

import { deleteTodoAction, updateTodoAction } from "../../redux"

import PostMenu from "../ContextMenu/PostMenu"

import styles from "./Todo.module.css"

const Todo = (props) => {
  const post = useSelector((state) => state.post)
  const dispatch = useDispatch()
  // 기본적으로 edit 상태인 post를 전역 state에 올린다.
  const todos = props.isEdit ? post.todos : props.todos // edit 상태일 경우만 props로 받아온 거 말고 실시간으로 store에서 받아옴
  const [show, setShow] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  const todoRef = useRef(null)

  const rowStyle = {
    pointerEvents: props.isEdit ? "initial" : "none",
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
      const rectX = e.clientX - rect.left // x position within the element.
      const rectY = e.clientY - rect.top // y position within the element.

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
    }
  }, [handleClick, handleContextMenu])

  const handleEditTodo = (todo) => {
    props.onEditTodo(todo)
  }

  const handleCompTodo = (todo) => {
    dispatch(
      updateTodoAction(todo._id ?? todo.tempId, {
        ...todo,
        todoDone: !todo.todoDone,
      })
    )
  }

  const handleDelTodo = (todo) => {
    const id = todo._id ?? todo.tempId
    dispatch(deleteTodoAction(id))
  }

  return (
    <div ref={todoRef} className={styles.container}>
      {todos.map((todo) => {
        return (
          <div className={todo.todoDone ? `${styles.row} ${styles.complete}` : `${styles.row}`} key={todo._id ?? todo.tempId} style={rowStyle}>
            <div className={styles.text} onClick={() => handleCompTodo(todo)}>
              {todo.todoText}
            </div>
            {props.isEdit && (
              <div className={styles.icons}>
                <RiCloseCircleLine onClick={() => handleDelTodo(todo)} className={styles.delete} />
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
          openEditDoneModal={props.openEditDoneModal}
          openRemoveModal={props.openRemoveModal}
        />
      )}
    </div>
  )
}

export default Todo
