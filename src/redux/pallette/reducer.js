import { SHOW_PALLETTE, HIDE_PALLETTE } from "./types"

const initialState = {
  shouldShowPal: true,
}

const palletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PALLETTE:
      return { ...state, shouldShowPal: true }
    case HIDE_PALLETTE:
      return { ...state, shouldShowPal: false }
    default:
      return state
  }
}

export default palletteReducer
