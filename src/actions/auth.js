import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(formData);

    dispatch({ type: "AUTH", data });

    // log in 후 바로 home으로 이동시키기
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", data });

    // sign up 후 바로 home으로 이동시키기
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
