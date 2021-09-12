const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      // 한번 로그인되면 user가 login 되었다는 것을 저장할 수 있도록 local storage 사용
      // profile(key)에다가 {result(user 정보)}, {tokenId} 이렇게 저장
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case "LOGOUT":
      localStorage.clear(); // log out 되면 local storage에 있는 정보 모두 지움
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
