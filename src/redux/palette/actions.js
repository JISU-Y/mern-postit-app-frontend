import { SHOW_PALETTE, HIDE_PALETTE } from "./types"

// action creator
export const showPaletteAction = () => {
  return {
    type: SHOW_PALETTE,
  }
}

export const hidePaletteAction = () => {
  return {
    type: HIDE_PALETTE,
  }
}
