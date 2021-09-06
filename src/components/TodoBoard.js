import React, { useState, useEffect, useCallback, useRef } from "react";
import Preloader from "./Preloader";
import { FiBox } from "react-icons/fi";
import TodoList from "./TodoList";
import Modal from "./Modal";
import { readPosts, createPost } from "../functions";

const TodoBoard = () => {
  const tag = "Default";
  // post format
  // { tag: tag, todos: [ { todoText: "", todoDone: false}]}
  const [post, setPost] = useState({
    tag: tag,
    todos: [],
  });
  // posts (post의 배열)
  const [posts, setPosts] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  // 드랍할 영역이 위치한 컴포넌트
  const postBoard = useRef(null);
  // position은 실시간 좌표 / oriPosition은 원래 좌표만 담고 있음
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [oriPosition, setOriPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 선택한 post
    // currentId가 0이면 그냥 null로 설정하고
    // currentId가 0이 아니고 뭔가 눌렸을 때는 그 currentId와 posts 중에 id가 같은 것을 찾아서 그 post를 반환
    let currentPost =
      currentId !== 0
        ? posts.find((post) => post._id === currentId)
        : {
            tag: tag,
            todos: [],
          };

    // setPost(currentPost);
    console.log(currentId);
    console.log(currentPost);
  }, [currentId]);

  // fetchData (posts)
  useEffect(() => {
    const fetchData = async () => {
      const result = await readPosts(); // post들 가져오기
      console.log(result);
      setPosts(result);
    };
    fetchData();
  }, []); // posts를 넣으면 300ms 마다 fetch함

  // post를 추가하기만 하는 것 (일단 내용(todos)은 없는 것으로 하기)
  const AddPostHandler = async () => {
    // e.preventDefault(); // 하니까 안됨

    const result = await createPost(post);
    setPosts([...posts, result]);
    console.log(result);
  };

  // post it 추가
  // const addPostit = (todos) => {
  //   // todos는 [ {id:1234, text: input}, {id:1234, text: input}, {id:1234, text: input}, ... ,{} ]
  //   // 추가했던 to do 들 저장하여 todoLists에 옮긴다

  //   // { id: null, todos: [] } 이거 하나 -> 이것의 배열의 위에 있는 todoLists

  //   const newPost = {
  //     tag: tag,
  //     todos: todos,
  //   };

  //   const newPosts = [...posts, newPost];
  //   setPosts(newPosts);
  //   console.log(newPosts);
  // };

  // post it (id 선택된) 에 todos (할일 배열) 추가
  const addTodos = (todos) => {
    // id = _id / 나중에 tag 수정도 추가 / todos는 수정할 todo 배열
    if (currentId === 0) return;

    // 기존의 post들을 map loop 돌려서 그 중에 찾고자 하는 id와 같은 post를 찾아서
    // post를 newPost로 교체한다 / 아니면 그냥 그대로
    setPosts((items) =>
      items.map((item) =>
        item._id === currentId ? { ...item, todos: todos } : item
      )
    );
    // newPost를 생성해서 덮어씌우면 부여받은 id가 없으니 당연히 안됐던거지

    console.log(posts);
  };

  // post it에 todos 업데이트

  // PostIt 삭제
  // const removePostit = (id) => {
  //   // source post는 remove 하지 않음
  //   if (id === 0) return;

  //   const removedPost = [...todoLists].filter((todoList) => todoList.id !== id);

  //   // 지우면 해당 포스트잇이 지워지기는 하는데
  //   // 지워진 포스트잇의 자리를 다음 포스트잇들이 뺏어서 채움

  //   setTodoLists(removedPost);
  // };

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
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <TodoList
              key={post._id}
              // addPostit={addPostit}
              // removePostit={removePostit}
              posts={posts}
              post={post}
              setPost={setPost}
              addTodos={addTodos}
              handlePostIndex={handlePostIndex}
              AddPostHandler={AddPostHandler}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          );
        })
      ) : (
        // <h2>nothing else to do</h2>
        // 하고 빈 post 하나는 남겨둬야 하지 않을까
        // 아니면 버튼을 생성해서 빈 post를 하나 생성?
        <button onClick={AddPostHandler}>start postiting</button>
      )}
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
