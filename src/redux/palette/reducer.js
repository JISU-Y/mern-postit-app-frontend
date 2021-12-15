import { SHOW_PALETTE, HIDE_PALETTE } from "./types"

const initialState = {
  shouldShowPal: true,
}

const paletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PALETTE:
      return { ...state, shouldShowPal: true }
    case HIDE_PALETTE:
      return { ...state, shouldShowPal: false }
    default:
      return state
  }
}

export default paletteReducer
