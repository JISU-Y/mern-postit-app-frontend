import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, Button, Paper } from "@material-ui/core";
import moment from "moment";
import styled, { keyframes } from "styled-components";

import Todo from "./Todo";
import TodoForm from "./TodoForm";
import Modal from "./Modal";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { TiEdit } from "react-icons/ti";
import { MdDone } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { updatePost } from "../functions";
import Tag from "./Tag";

// Blinking effect on edit / styled-components
// => props 바깥에 해야 warning(The component styled.div with the id of  has been created dynamically.) 안 생김
const blinkingEffect = () => {
  return keyframes`
      50% {
        opacity: 0;
      }
    `;
};

const AnimatedComponent = styled.div`
  animation: ${blinkingEffect} 1s linear infinite;
`;

//todoList 는 TodoBoard에서 가져온 todos의 배열 중 배열 한 개씩
const TodoList = ({
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
  const dispatch = useDispatch();
  // 여기서 따로 사용할 todo 배열
  // todos는 todo ({id:1,text:a}의 모음/배열)
  const [todos, setTodos] = useState(post.todos);
  const [tags, setTags] = useState(post.tag);
  const [isUpdated, setIsUpdated] = useState(post.createdAt !== post.updatedAt);
  const [isEdit, setIsEdit] = useState(false);

  // 오른쪽 클릭 좌표
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  // menu 보여주거나 말거나
  const [show, setShow] = useState(false);
  const [showTags, setShowTags] = useState(false);

  // Todos
  const addTodo = (todo) => {
    // todo는 {todoText: postTodo.todoText, todoDone:false}
    // 추가하려고 하는 todo의 todoText를 검사
    if (!todo.todoText || /^\s*$/.test(todo.todoText)) {
      return;
    }

    // 새 todo와 기존의 todos 배열을 합침 (할일 리스트를 배열로 모음)
    const newTodos = [todo, ...todos];

    console.log(newTodos);

    console.log(currentId);

    // 배열로 모은 todos를 Todos로 set함
    setTodos(newTodos);
    // post set // 최신 newTodos로 todos 설정
    // 이제는 todo를 추가하는거에도 하나하나 id를 달아주어야함
    // 맨 처음부터 post를 생성하고 그 안에서 수정을 하는 것이기 때문에
    setTodosHandler(newTodos);
  };

  const removeTodo = (id) => {
    console.log(id);
    const removeArr = [...todos].filter((todo) => todo._id !== id);
    setTodos(removeArr);
    setTodosHandler(removeArr);
  };

  const updateTodo = (todoId, newValue) => {
    // edit 끝낸 todo value가 빈 String인지 확인
    if (!newValue.todoText || /^\s*$/.test(newValue.todoText)) {
      return;
    }

    let updatedTodos = todos.map((todo) => {
      if (todo._id === todoId) {
        todo = {
          ...todo,
          todoText: newValue.todoText,
          todoDone: newValue.todoDone,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
    setTodosHandler(updatedTodos);
  };

  const completeTodo = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo._id === todoId) {
        todo.todoDone = !todo.todoDone;
      }

      return todo;
    });
    setTodos(updatedTodos);
    setTodosHandler(updatedTodos);
  };

  // Tags
  const handleAddTags = (tagName) => {
    console.log(tagName);
    console.log(tags);
    if (tags.includes(tagName)) return;

    const addedTags = [...tags, tagName];
    setTags(addedTags);
    setTagsHandler(addedTags);
  };

  const handleRemoveTags = (tagName) => {
    console.log(tagName);
    console.log(tags);
    const removedTags = tags.filter((tag) => tag !== tagName);

    setTags(removedTags);

    setTagsHandler(removedTags);
  };

  // post edit done
  const handleEditDone = () => {
    console.log(posts);
    console.log(posts.find((post) => post._id === currentId));

    console.log("edit done");
    dispatch(
      updatePost(currentId, {
        ...posts.find((post) => post._id === currentId),
        name: user?.result?.name,
      })
    );
    clear();
  };

  const handleEditPost = (e) => {
    if (e.target.nodeName !== "DIV" && e.target.nodeName !== "INPUT") return;

    handlePostIndex(e); // postIndex 맞추기

    setCurrentId(post._id); // 선택한 post의 id set

    setIsEdit(true); // edit 상태로 변경

    console.log("edit post");
  };

  // esc 눌러서 불러왔던 post 선택을 무른다
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };

    window.addEventListener("keydown", clearField);
    window.addEventListener("click", clearField);
    return () => {
      window.removeEventListener("keydown", clearField);
      window.removeEventListener("click", clearField);
    };
  }, []);

  const clear = () => {
    setCurrentId(0);
    setIsEdit(false);
    console.log("clear");
  };

  // 색 바꾸기 혹은 오른쪽 클릭 메뉴 생성
  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      if (
        e.target.className !== "todo-app" &&
        e.target.className !== "tag-container"
      ) {
        setShow(false);
        return;
      }

      const rect = e.target.getBoundingClientRect();
      const rectX = e.clientX - rect.left; // x position within the element.
      const rectY = e.clientY - rect.top; // y position within the element.

      setAnchorPoint({ x: rectX, y: rectY });
      if (e.target.className === "todo-app") {
        setShow(true);
      }
      if (e.target.className === "tag-container") {
        setShowTags(true);
      }
    },
    [setAnchorPoint, setShow, setShowTags]
  );

  const handleClick = useCallback(() => {
    setShow(() => (show ? false : null));
    // (show ? setShow(false) : null)
    setShowTags(() => (showTags ? false : null));
  }, [show, showTags]);

  const todoAppRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    todoAppRef.current.addEventListener("contextmenu", handleContextMenu);
    return () => {
      // context menu는 각각의 todoList에서 event를 생기게 하고
      // context menu를 없앨때는 어디든 클릭하면 없어져야 하므로 document로 한다
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleClick, handleContextMenu]);

  // change colors
  const [colorIndex, setColorIndex] = useState(1); // 이게 중요 / 보통 / 나중 태그로 활용될 수도
  const postColor = ["#ffd20c", "#5d0cff", "#ff7614", "#149fff", "#fa0087"];

  const changeColor = () => {
    setColorIndex((index) => {
      let newIndex = index + 1;
      if (newIndex > postColor.length - 1) {
        newIndex = 0;
      }
      console.log(index);
      console.log(newIndex);
      return newIndex;
    });

    todoAppRef.current.style.backgroundColor = `${postColor[colorIndex]}`;
    setShow(false);
  };

  // modal 관련
  const [modalType, setModalType] = useState({
    open: false,
    type: "",
    msg: "",
  });

  // 포스트 삭제 modal
  const openRemoveModal = () => {
    setModalType({ open: true, type: "remove", msg: "Are you sure?" });
  };

  // edit done modal
  const openEditDoneModal = () => {
    setModalType({ open: true, type: "editDone", msg: "Editing done?" });
  };

  // no input modal
  const openNoInputModal = () => {
    setModalType({
      open: true,
      type: "warning",
      msg: "You should enter an input",
    });
  };

  // please edit button modal
  const openPleaseEditModal = () => {
    setModalType({
      open: true,
      type: "edit",
      msg: "Please press the editing icon",
    });
  };

  const closeModal = () => {
    setModalType(false, "", "");
  };

  return (
    <div
      className="todo-app"
      ref={todoAppRef}
      onClick={(e) => {
        // 로그인 한 user가 클릭했을 때만 반응
        if (
          user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator
        )
          handleEditPost(e);
      }}
    >
      {/* tag */}
      <div className="tag-container" onClick={() => console.log("tag")}>
        {/* editing warning */}
        {isEdit ? (
          <AnimatedComponent>
            <div className="blinking-block">
              <h5>EDITING!</h5>
            </div>
          </AnimatedComponent>
        ) : null}
        {tags.length > 0 ? (
          tags.map((tag, index) => {
            return (
              <Tag key={index} tag={tag} handleRemoveTags={handleRemoveTags} />
            );
          })
        ) : (
          <p className="no-tag">right click to add tags</p>
        )}
      </div>

      <TodoForm
        onSubmit={addTodo}
        openNoInputModal={openNoInputModal}
        isEdit={isEdit}
        openPleaseEditModal={openPleaseEditModal}
        post={post}
      />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        isEdit={isEdit}
        post={post}
      />
      {/* setting area */}
      <div className="setting-container">
        <Typography varian="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
        {/* {isUpdated ? <p>{post.updatedAt}(수정됨)</p> : <p>{post.createdAt}</p>} */}
        <div className="icons-container">
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <FiMinusCircle
              className="minus-icon"
              onClick={() => {
                setCurrentId(post._id); // currentId로 redering 하기 위함
                openRemoveModal();
              }}
            />
          )}
          {isEdit ? (
            <AnimatedComponent className="edit-done-component">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={openEditDoneModal}
              >
                click to edit done
                <MdDone className="done-icon" />
              </Button>
            </AnimatedComponent>
          ) : null}
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <FiPlusCircle className="plus-icon" onClick={AddPostHandler} />
          )}
        </div>
      </div>
      {/* post context menu */}
      {show ? (
        <ul
          className="menu"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x,
          }}
        >
          <li
            onClick={() => {
              clear();
              AddPostHandler();
            }}
          >
            add
          </li>
          <li onClick={handleEditPost}>edit</li>
          {isEdit && <li onClick={openEditDoneModal}>edit done</li>}
          <li onClick={openRemoveModal}>delete</li>
          <li onClick={changeColor}>changing color</li>
          <li
            onMouseEnter={() => setShowTags(true)}
            onMouseLeave={() => setShowTags(false)}
          >
            add tags (sub menu)
          </li>
          <hr className="divider" />
          <li onClick={handleClick}>Exit</li>
        </ul>
      ) : null}
      {/* tag context menu */}
      {showTags ? (
        <ul
          className="menu"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x,
          }}
        >
          <li
            onClick={() => {
              handleAddTags("Later");
            }}
          >
            Later to do
          </li>
          <li
            onClick={() => {
              handleAddTags("Important");
            }}
          >
            Important to do
          </li>
          <li
            onClick={() => {
              handleAddTags("Today");
            }}
          >
            Today's to do
          </li>
          <li
            onClick={() => {
              handleAddTags("To buy");
            }}
          >
            Need to buy
          </li>
          <hr className="divider" />
          <li onClick={handleClick}>Exit</li>
        </ul>
      ) : null}
      <Modal
        modalType={modalType}
        close={closeModal}
        post={post}
        removePostHandler={removePostHandler}
        handleEditDone={handleEditDone}
        clear={clear}
      />
    </div>
  );
};

export default TodoList;
