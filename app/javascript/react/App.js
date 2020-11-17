import React from 'react'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'

import StyleGuide from './components/StyleGuide'

const App = props => {

  let cool = true

  const coolPalette = {
    primary: {
      main: '#25274D',
    },
    secondary: {
      main: '#464866',
    },
    tertiary: {
      main: '#29648A'
    },
    quaternary: {
      main: '#2E9CCA'
    },
    quinary: {
      main: '#AAABB8'
    },

    primary2: {
      main: '#314455',
    },
    secondary2: {
      main: '#644E5B',
    },
    tertiary2: {
      main: '#9E5A63'
    },
    quaternary2: {
      main: '#C96567'
    },
    quinary2: {
      main: '#97AABD'
    },
    type: 'dark',
  }

  const hotPalette = {
    primary: {
      main: '#314455',
    },
    secondary: {
      main: '#644E5B',
    },
    tertiary: {
      main: '#9E5A63'
    },
    quaternary: {
      main: '#C96567'
    },
    quinary: {
      main: '#97AABD'
    },
    type: 'dark',
  }

  const theme = createMuiTheme({
    palette: cool ? coolPalette : hotPalette,
    typography: {
      h1: {
        fontFamily: [
          'Stalinist One',
          'cursive',
        ].join(','),
      },
      h2: {
        fontFamily: [
          'Stalinist One',
          'cursive',
        ].join(','),
      },
      h3: {
        fontFamily: [
          'Stalinist One',
          'cursive',
        ].join(','),
      },
      h4: {
        fontFamily: [
          'Stalinist One',
          'cursive',
        ].join(','),
      },
      h5: {
        fontFamily: [
          'Stalinist One',
          'cursive',
        ].join(','),
      },
      h6: {
        fontFamily: [
          'Stalinist One',
          'cursive',
        ].join(','),
      },
      subtitle1: {
        fontFamily: [
          'Goldman',
          'cursive',
        ].join(','),
      },
      subtitle2: {
        fontFamily: [
          'Goldman',
          'cursive',
        ].join(','),
      },
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
