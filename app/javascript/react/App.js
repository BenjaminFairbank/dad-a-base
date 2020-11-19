import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'

import StyleGuide from './components/StyleGuide'
import TopBar from './components/TopBar'
import ScrollUpButton from './components/ScrollUpButton'

import coolPalette from './palettes/coolPalette'
import hotPalette from './palettes/hotPalette'

const App = props => {

  const [hotTheme, setHotTheme] = useState(true)

  const stalinistFont = { fontFamily: 'Stalinist One, cursive' }
  const goldmanFont = { fontFamily: 'Goldman, cursive' }
  const theme = createMuiTheme({
    palette: hotTheme ? hotPalette : coolPalette,
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
      <BrowserRouter>
        <TopBar
          theme={theme}
          coolTheme={hotTheme}
          setCoolTheme={setHotTheme}
        />
        <Switch>
        </Switch>
      </BrowserRouter>
      <StyleGuide />
      <ScrollUpButton />
    </ThemeProvider>  
  )
}

export default App
