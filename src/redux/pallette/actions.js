import { SHOW_PALLETTE, HIDE_PALLETTE } from "./types"

// action creator
export const showPalletteAction = () => {
  return {
    type: SHOW_PALLETTE,
  }
}

export const hidePalletteAction = () => {
  return {
    type: HIDE_PALLETTE,
  }
}
