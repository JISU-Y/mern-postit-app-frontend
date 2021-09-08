import React, { useState, useEffect, useCallback, useRef } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import Modal from "./Modal";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { TiEdit } from "react-icons/ti";
import { MdDone } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { readPosts, updatePost } from "../functions";
import Tag from "./Tag";

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
}) => {
  // 여기서 따로 사용할 todo 배열
  // todos는 todo ({id:1,text:a}의 모음/배열)
  const [todos, setTodos] = useState(post.todos);
  const [isEdit, setIsEdit] = useState(false);
  const [tags, setTags] = useState(post.tag);

  // 오른쪽 클릭 좌표
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  // menu 보여주거나 말거나
  const [show, setShow] = useState(false);
  const [showTags, setShowTags] = useState(false);

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

  // post edit done
  const handleEditDone = async () => {
    console.log(posts.find((post) => post._id === currentId));
    await updatePost(
      currentId,
      posts.find((post) => post._id === currentId)
    );
    setIsEdit(false);
  };

  // const handleAddPost = () => {
  //   addPostit(todos);

  //   // todos 초기화
  //   setTodos([]);
  // };

  const handleEditPost = (e) => {
    setIsEdit(true); // edit 상태로 변경

    handlePostIndex(e); // postIndex 맞추기

    setCurrentId(post._id); // 선택한 post의 id set
  };

  // esc 눌러서 불러왔던 post 선택을 무른다
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  }, []);

  const clear = () => {
    setCurrentId(0);
    setIsEdit(false);
    console.log("clear");
    // edit 상태였다가 다른 곳을 클릭했을 때 edit false로 되어야 하니까
  };

  // const handleEditDone = () => {
  //   setIsEdit(false);
  //   addTodos(todoList.id, todos);

  //   setTodos([]); // edit done 하고 add post 하면 todos 그대로 복사해가므로 초기화
  // };

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
        console.log("tag-container");
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

  const handleAddTags = (tagName) => {
    console.log(tagName);
    console.log(tags);
    if (tags.includes(tagName)) return;

    const addedTags = [...tags, tagName];
    setTags(addedTags);

    setTagsHandler(tags);
    console.log(tags);
  };

  const handleRemoveTags = (tagName) => {
    console.log(tagName);
    console.log(tags);
    const removedTags = tags.filter((tag) => tag !== tagName);
    setTags(removedTags);

    setTagsHandler(removedTags);
    console.log(tags);
  };
  return (
    <div
      className="todo-app"
      ref={todoAppRef}
      onClick={(e) => handleEditPost(e)}
    >
      {/* tag */}
      <div className="tag-container" onClick={() => console.log("tag")}>
        {/* post.tag = tags ??*/}
        {tags.length > 0 ? (
          tags.map((tag, index) => {
            return (
              <Tag key={index} tag={tag} handleRemoveTags={handleRemoveTags} />
            );
          })
        ) : (
          <h3>add tags</h3>
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
      {/* 여기에 setting area 만들고 안에 - + 시간까지 */}
      <FiPlusCircle
        className="plus-icon"
        onClick={() => {
          clear(); // + 눌렀을 때는 edit 상태로 넘어가지 않도록
          AddPostHandler();
        }}
      />
      <FiMinusCircle className="minus-icon" onClick={openRemoveModal} />
      {isEdit && <MdDone className="done-icon" onClick={openEditDoneModal} />}
      {/* {isEdit ? (
        <MdDone className="done-icon" onClick={openEditDoneModal} />
      ) : (
        <TiEdit className="edit-icon postit" onClick={handleEditPost} />
      )} */}
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
              handleAddTags("Default");
            }}
          >
            Default
          </li>
          <li
            onClick={() => {
              handleAddTags("Important");
            }}
          >
            Important
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
          <li onClick={() => setTagsHandler(tags)}>Set Tags</li>
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
