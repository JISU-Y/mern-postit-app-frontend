import * as api from "../../api"
import { AUTH, LOGOUT } from "./types"

const signInAction = (data) => {
  return {
    type: AUTH,
    payload: data,
  }
}
const signUpAction = (data) => {
  return {
    type: AUTH,
    payload: data,
  }
}

export const logoutAction = () => {
  return { type: LOGOUT }
}

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(formData)

    console.log(data)

    dispatch(signInAction(data))

    // log in 후 바로 home으로 이동시키기
    history.push("/")
  } catch (error) {
    console.log(error)
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(formData)

    dispatch(signUpAction(data))

    // sign up 후 바로 home으로 이동시키기
    history.push("/")
  } catch (error) {
    console.log(error)
  }
}
