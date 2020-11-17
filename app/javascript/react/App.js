import React from 'react'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'

import StyleGuide from './components/StyleGuide'

import coolPalette from './palettes/coolPalette'
import hotPalette from './palettes/hotPalette'

const App = props => {

  let cool = true

  const stalinistFont = { fontFamily: 'Stalinist One, cursive' }
  const goldmanFont = { fontFamily: 'Goldman, cursive' }
  const theme = createMuiTheme({
    palette: cool ? coolPalette : hotPalette,
    typography: {
      h1: stalinistFont,
      h2: stalinistFont,
      h3: stalinistFont,
      h4: stalinistFont,
      h5: stalinistFont,
      h6: stalinistFont,
      subtitle1: goldmanFont,
      subtitle2: goldmanFont,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyleGuide />
    </ThemeProvider>  
  )
}

export default App
