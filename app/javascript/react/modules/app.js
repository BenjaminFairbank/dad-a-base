const initialState = {
  hotTheme: true
}

const app = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_HOT_THEME:
      return {...state, hotTheme: !state.hotTheme }
    default:
      return state
  }
}

const TOGGLE_HOT_THEME = 'TOGGLE_HOT_THEME'

const toggleHotTheme = () => {
  return {
    type: TOGGLE_HOT_THEME
  }
}

export {
  app,
  toggleHotTheme
}