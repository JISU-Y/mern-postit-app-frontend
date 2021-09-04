import React, { useState, useEffect, useCallback, useRef } from "react";
import Preloader from "./Preloader";
import { FiBox } from "react-icons/fi";
import TodoList from "./TodoList";
import Modal from "./Modal";
import { readPosts } from "../functions";

const TodoBoard = () => {
  // todoList -> todo 배열의 배열
  // posts 임 / {}
  const [todoLists, setTodoLists] = useState([{ id: 0, todos: [] }]);
  const [posts, setPosts] = useState(null);

  // 드랍할 영역이 위치한 컴포넌트
  const postBoard = useRef(null);
  // position은 실시간 좌표 / oriPosition은 원래 좌표만 담고 있음
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [oriPosition, setOriPosition] = useState({ x: 0, y: 0 });

  // fetchData (posts)
  useEffect(() => {
    const fetchData = async () => {
      const result = await readPosts();
      console.log(result);
      setTodoLists(result);
    };
    fetchData();
  }, []);

  // post it 추가
  const addPostit = (todos) => {
    // todos는 [ {id:1234, text: input}, {id:1234, text: input}, {id:1234, text: input}, ... ,{} ]
    // 추가했던 to do 들 저장하여 todoLists에 옮긴다

    // { id: null, todos: [] } 이거 하나 -> 이것의 배열의 위에 있는 todoLists

    const newTodoList = {
      // 0은 motherPost 꺼임
      id: Math.floor(Math.random() * 10000 + 1),
      todos: todos,
    };

    const newTodoLists = [...todoLists, newTodoList];

    setTodoLists(newTodoLists);

    console.log(newTodoLists);
  };

  // post it Edit
  const editPostit = (id, todos) => {
    if (id === 0) return;
    // id에 맞는지 확인하고 잠금? 클릭 불가하게 막아뒀던거 풀기
    // 수정 중

    // 위에랑 합쳐도 될 것 같은데 일단 ㄱㄱ
    const newTodoList = {
      id: id,
      todos: todos,
    };
    setTodoLists((prev) =>
      prev.map((item) => (item.id === id ? newTodoList : item))
    );
  };

  // PostIt 삭제
  const removePostit = (id) => {
    // source post는 remove 하지 않음
    if (id === 0) return;

    const removedPost = [...todoLists].filter((todoList) => todoList.id !== id);

    // 지우면 해당 포스트잇이 지워지기는 하는데
    // 지워진 포스트잇의 자리를 다음 포스트잇들이 뺏어서 채움

    setTodoLists(removedPost);
  };

  // Drag and Drop 구현

  // 드래그 시작되었을 때 실행 - onDragStart
  const dragStartHandler = (e) => {
    if (e.target.className !== "todo-app") return;

    // drag 끝난 것 가장 앞으로 보내기 / 혹은 클릭했을 때
    handlePostIndex(e);

    // 드래그 시 반투명 이미지 추가
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);

    // 이동시킬 때 필요한 좌표
    setPosition({ x: e.clientX, y: e.clientY });

    // 초기 위치 값 (잘못된 위치에 놓았을 때 다시 원래 위치로 돌아갈 수 있도록)
    setOriPosition({ x: e.target.offsetLeft, y: e.target.offsetTop });
  };

  // 드래그 중일 때 실행 - onDrag
  const dragHandler = (e) => {
    if (e.target.className !== "todo-app") return;

    // const box = postBoard.current.getBoundingClientRect();

    // 요소의 좌표 + 커서 좌표 변화량
    // 현재 요소의 좌표 + 현재 커서의 좌표 - 직전 커서의 좌표
    e.target.style.left = `${e.target.offsetLeft + e.clientX - position.x}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - position.y}px`;

    setPosition({ x: e.clientX, y: e.clientY });
  };

  // 드래그 끝났을 때 실행(마우스 놓으면서) - onDragEnd
  const dragEndHandler = (e) => {
    if (e.target.className !== "todo-app") return;
    // 올바른 영역에 드랍 되었는지 체크
    const box = postBoard.current.getBoundingClientRect();
    if (
      box.left < e.clientX &&
      e.clientX < box.right &&
      box.top < e.clientY &&
      e.clientY < box.bottom
    ) {
      // 옮겨진 자리
      e.target.style.left = `${e.target.offsetLeft + e.clientX - position.x}px`;
      e.target.style.top = `${e.target.offsetTop + e.clientY - position.y}px`;
    } else {
      // 잘못된 영역이면 원래 위치로 이동
      e.target.style.left = `${oriPosition.x}px`;
      e.target.style.top = `${oriPosition.y}px`;
    }
  };

  const handlePostIndex = (e) => {
    if (e.target.className !== "todo-app") return;

    // childNodes/children는 nodeList라 이렇게 배열로 변환해주어야 loop syntax를 사용할 수 있다
    const allPosts = [...e.target.parentNode.children].filter(
      (post) => post.className === "todo-app"
    ); // todo app 만 걸러냄(children에서 modal은 뺌)

    // 일단 모든 todo app 의 z-index를 unset
    allPosts.map((post) => (post.style.zIndex = "unset"));

    // 선택된 todo app의 z index만 100으로 변경
    e.target.style.zIndex = "100";

    // todo-app 클릭 시 / drag start 시 적용
  };

  return (
    <div
      className="todo-board"
      ref={postBoard}
      onDragStart={dragStartHandler}
      onDrag={dragHandler}
      onDragEnd={dragEndHandler}
    >
      {todoLists.map((todoList, index) => {
        return (
          <TodoList
            key={index}
            todoLists={todoLists}
            todoList={todoList}
            addPostit={addPostit}
            removePostit={removePostit}
            editPostit={editPostit}
            handlePostIndex={handlePostIndex}
          />
        );
      })}
    </div>
  );
};

export default TodoBoard;

// mother post에서만 add post 되도록 구현해야함  => 된듯?
// 왼쪽 상단에 (혹은 정 가운데에) mother post
// 옮기려고 하는 포스트 잇은 드래그 앤 드랍(일단은 밑에)으로 옮겨지도록
// => 그러려고 했는데 그럴 이유가 굳이 없음. 스티커 메모처럼
// 생성했으면 그 메모에서도  + 하여 생성할 수 있도록 해야함

// todo list 색 바꿀 수 있도록 수정 (오른쪽 마우스 클릭해서 몇 가지 색으로만 바꿀 수 있도록) => 오른쪽 마우스 클릭 됨
// postit 개별 삭제 추가 => 됨
// postit 개별 edit 추가 => 됨
// Board 안에서 post it 드래그 앤 드랍 할 수 있도록 구현 -> 됨
// context menu 한개 element에서만 동작하도록 -> 됨

// 우선순위
// changing color 저장되도록 추가 (태그 처럼 사용 / 중요, 오늘 할 일, 기타, 살 것 ...)
// backend 구현해야함 (MERN ? , Firebase? , 일단 Local Storage?)
// 완성된 todo는 밑으로 보내서 해야할 것들이 todo list의 상단에 올라오도록
// 여러 에러(내용 없이 add todo, post 제거 시 진짜 제거 alert창, edit done 시 alert창 등등) 구현
// css post it 처럼 꾸미기
// source post는 좀 더 잘 보이게 꾸미기 / 고정 시켜놓기
// 로그인 / 회원가입 구현
