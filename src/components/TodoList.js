import React, { useState, useEffect, useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import { Typography, Button, Paper } from "@material-ui/core"
import moment from "moment"

import Todo from "./Todo"
import TodoForm from "./TodoForm"
import Modal from "./Modal"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { TiEdit } from "react-icons/ti"
import { MdDone } from "react-icons/md"
import { ImCross } from "react-icons/im"
import { updatePost } from "../functions"
import Tag from "./Tag"
import TagContainer from "./TagContainer/TagContainer"
import PostFooter from "./PostFooter/PostFooter"
import PostMenu from "./ContextMenu/PostMenu"
import TagMenu from "./ContextMenu/TagMenu"

//todoList 는 TodoBoard에서 가져온 todos의 배열 중 배열 한 개씩
const TodoList = ({
  dragStartHandler,
  dragHandler,
  dragEndHandler,
  posts,
  post,
  setTodosHandler,
  handlePostIndex,
  setPost,
  AddPostHandler,
  removePostHandler,
  currentId,
  setCurrentId,
  setTagsHandler,
  user,
}) => {
  const dispatch = useDispatch()
  // 여기서 따로 사용할 todo 배열
  // todos는 todo ({id:1,text:a}의 모음/배열)
  // 근데 이 todos 배열도 redux store에 저장해두면 되는 거 아닌가?**
  // 아니지, 굳이 useState 쓸 필요가? 그냥 post.todos 가지고 데이터 가공해서 setTodosHandler로 넘겨주면 되지 않나?
  const [todos, setTodos] = useState(post.todos)
  const [tags, setTags] = useState(post.tag)
  const [isUpdated, setIsUpdated] = useState(post.createdAt !== post.updatedAt)
  const [isEdit, setIsEdit] = useState(false)

  // 오른쪽 클릭 좌표
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  // menu 보여주거나 말거나
  const [show, setShow] = useState(false)
  const [showTags, setShowTags] = useState(false)

  // todo-app post ref
  const todoAppRef = useRef(null)

  // Todos
  const addTodo = (todo) => {
    // todo는 {todoText: postTodo.todoText, todoDone:false}
    // 추가하려고 하는 todo의 todoText를 검사
    if (!todo.todoText || /^\s*$/.test(todo.todoText)) {
      return
    }

    // 새 todo와 기존의 todos 배열을 합침 (할일 리스트를 배열로 모음)
    const newTodos = [todo, ...todos]

    console.log(newTodos)

    console.log(currentId)

    // 배열로 모은 todos를 Todos로 set함
    setTodos(newTodos)
    // post set // 최신 newTodos로 todos 설정
    // 이제는 todo를 추가하는거에도 하나하나 id를 달아주어야함
    // 맨 처음부터 post를 생성하고 그 안에서 수정을 하는 것이기 때문에
    setTodosHandler(newTodos) // 여기서 저 setTodos 안하고 그냥 바로 newTodos만 넘겨주면 되지 않음? **
  }

  const removeTodo = (id) => {
    console.log(id)
    const removeArr = todos.filter((todo) => todo._id !== id) // [...todos]는 왜 쓴거니?
    setTodos(removeArr)
    setTodosHandler(removeArr)
  }

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

    setTodos(updatedTodos)
    setTodosHandler(updatedTodos)
  }

  const completeTodo = (todoId) => {
    let updatedTodos = todos.map((todo) => (todo._id === todoId ? { ...todo, todoDone: !todo.todoDone } : todo))
    setTodos(updatedTodos)
    setTodosHandler(updatedTodos)
  }

  // Tags
  const handleAddTags = (tagName) => {
    console.log(tagName)
    console.log(tags)
    if (tags.includes(tagName)) return

    const addedTags = [...tags, tagName]
    setTags(addedTags)
    setTagsHandler(addedTags)
  }

  const handleRemoveTags = (tagName) => {
    console.log(tagName)
    console.log(tags)
    const removedTags = tags.filter((tag) => tag !== tagName)

    setTags(removedTags)

    setTagsHandler(removedTags)
  }

  // post edit done
  // 과연 posts 전체를 받아와서 사용하는 것이 맞는 것일까..**
  const handleEditDone = () => {
    console.log(posts)
    console.log(posts.find((post) => post._id === currentId))

    console.log("edit done")
    dispatch(
      updatePost(currentId, {
        ...posts.find((post) => post._id === currentId),
        name: user?.result?.name,
      }) // name을 왜 또 정해서 줘야하지? 이미 있는거 아님?**
    )
    clear()
  }

  const handleEditPost = (e) => {
    // 더 좋은 방법이 없을 지 문의 **

    // 로그인 한 user가 클릭했을 때만 반응
    if (user?.result?.googleId !== post?.creator && user?.result?._id !== post?.creator) return
    if (e.target.nodeName !== "DIV" && e.target.nodeName !== "INPUT") return
    if (currentId !== 0 && currentId !== post._id) {
      console.log(`${currentId} => ${post._id}`)
      // modal
      openSelectEditModal()
      return
    }

    handlePostIndex(e) // post zIndex 맞추기

    setCurrentId(post._id) // 선택한 post의 id set

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
    setCurrentId(0)
    setIsEdit(false)
    console.log("clear")
  }

  // 색 바꾸기 혹은 오른쪽 클릭 메뉴 생성
  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault()
      // 이 기괴한 조건을 어떻게 좀 할 수 없을까? **
      if ((e.target.className !== "todo-app" && e.target.className !== "tag-container") || !isEdit) {
        setShow(false)
        return
      }

      const rect = e.target.getBoundingClientRect()
      const rectX = e.clientX - rect.left // x position within the element.
      const rectY = e.clientY - rect.top // y position within the element.

      setAnchorPoint({ x: rectX, y: rectY })
      if (e.target.className === "todo-app") {
        setShow(true)
      }
      if (e.target.className === "tag-container") {
        setShowTags(true)
      }
    },
    [setAnchorPoint, setShow, setShowTags, isEdit]
  )

  const handleClick = useCallback(() => {
    setShow(() => (show ? false : null))
    setShowTags(() => (showTags ? false : null))
  }, [show, showTags])

  useEffect(() => {
    document.addEventListener("click", handleClick)
    todoAppRef.current.addEventListener("contextmenu", handleContextMenu)
    return () => {
      // context menu는 각각의 todoList에서 event를 생기게 하고
      // context menu를 없앨때는 어디든 클릭하면 없어져야 하므로 document로 한다
      document.removeEventListener("click", handleClick)
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [handleClick, handleContextMenu])

  // change colors
  const [colorIndex, setColorIndex] = useState(1) // 이게 중요 / 보통 / 나중 태그로 활용될 수도
  const postColor = ["#ffd20c", "#5d0cff", "#ff7614", "#149fff", "#fa0087"]

  const changeColor = () => {
    setColorIndex((index) => {
      let newIndex = index + 1
      if (newIndex > postColor.length - 1) {
        newIndex = 0
      }
      console.log(index)
      console.log(newIndex)
      return newIndex
    })

    todoAppRef.current.style.backgroundColor = `${postColor[colorIndex]}`
    setShow(false)
  }

  // modal 관련
  const [modalType, setModalType] = useState({
    open: false,
    type: "",
    msg: "",
  })

  // 포스트 삭제 modal
  const openRemoveModal = () => {
    setModalType({ open: true, type: "remove", msg: "Are you sure?" })
  }

  // edit done modal
  const openEditDoneModal = () => {
    setModalType({ open: true, type: "editDone", msg: "Editing done?" })
  }

  // check edit done modal
  const openSelectEditModal = () => {
    setModalType({
      open: true,
      type: "editSelect",
      msg: "Please finish editing first or Press Esc to exit",
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

  // please edit button modal
  const openPleaseEditModal = () => {
    setModalType({
      open: true,
      type: "edit",
      msg: "Please press the editing icon",
    })
  }

  const closeModal = () => {
    setModalType(false, "", "")
  }

  return (
    <div
      className="todo-app"
      ref={todoAppRef}
      onDoubleClick={(e) => {
        handleEditPost(e)
      }}
      onDragStart={(e) => {
        if (isEdit) dragStartHandler(e)
      }}
      onDrag={(e) => {
        if (isEdit) dragHandler(e)
      }}
      onDragEnd={(e) => {
        if (isEdit) dragEndHandler(e)
      }}
      draggable // 이걸 추가해야 drag가 잘됨
    >
      {/* tag component*/}
      <TagContainer isEdit={isEdit} tags={tags} handleRemoveTags={handleRemoveTags} />
      {/* Todo 입력 form / user가 있을 경우에만 / Edit 중인 경우만 form 보이기 */}
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
        (isEdit ? (
          <TodoForm onSubmit={addTodo} openNoInputModal={openNoInputModal} isEdit={isEdit} openPleaseEditModal={openPleaseEditModal} post={post} />
        ) : (
          <p className="edit-instruction">double tab to edit this post</p>
        ))}
      {/* Todo 항목 리스트 */}
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} isEdit={isEdit} post={post} />
      {/* setting area */}
      <PostFooter
        isEdit={isEdit}
        userGoogleId={user?.result?.googleId}
        userId={user?.result?._id}
        post={post}
        postCreator={post?.creator}
        setCurrentId={setCurrentId}
        openRemoveModal={openRemoveModal}
        openEditDoneModal={openEditDoneModal}
        AddPostHandler={AddPostHandler}
      />
      {/* post context menu */}
      {show && (
        <PostMenu
          isEdit={isEdit}
          anchorPoint={anchorPoint}
          AddPostHandler={AddPostHandler}
          openEditDoneModal={openEditDoneModal}
          openRemoveModal={openRemoveModal}
          changeColor={changeColor}
          handleClick={handleClick}
        />
      )}
      {/* tag context menu */}
      {showTags && <TagMenu anchorPoint={anchorPoint} handleAddTags={handleAddTags} handleClick={handleClick} />}
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
