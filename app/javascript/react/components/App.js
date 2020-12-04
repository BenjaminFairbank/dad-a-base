import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'

import Home from './pages/Home'
import StyleGuide from './pages/StyleGuide'
import TopBar from './ui/TopBar'
import ScrollUpButton from './ui/ScrollUpButton'

import coolPalette from '../palettes/coolPalette'
import hotPalette from '../palettes/hotPalette'

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
            hotTheme={hotTheme}
            setHotTheme={setHotTheme}
          />
          <Switch>
            <Route exact path='/' component={StyleGuide} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/styleguide' component={StyleGuide} />
          </Switch>
        </BrowserRouter>
      <ScrollUpButton />
    </ThemeProvider>
  )
}

export default App
