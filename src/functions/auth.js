import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in the user

    // log in 후 바로 home으로 이동시키기
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user

    // sign up 후 바로 home으로 이동시키기
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
