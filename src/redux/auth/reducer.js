import { AUTH, LOGOUT, SET_USER } from "./types"

const initialState = {
  authData: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      // 한번 로그인되면 user가 login 되었다는 것을 저장할 수 있도록 local storage 사용
      // profile(key)에다가 {result(user 정보)}, {tokenId} 이렇게 저장 *********** local에 저장하는 거 순수함수 아닌거 아님?
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }))
      return { ...state, authData: action?.payload }
    case LOGOUT:
      localStorage.clear() // log out 되면 local storage에 있는 정보 모두 지움
      return { ...state, authData: null }
    case SET_USER:
      return { ...state, authData: action.payload }
    default:
      return state
  }
}

export default authReducer
