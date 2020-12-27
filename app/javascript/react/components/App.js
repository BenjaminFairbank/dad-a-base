import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'

import JokesIndex from './pages/JokesIndex'
import StyleGuide from './pages/StyleGuide'
import TopBar from './ui/TopBar'
import ScrollUpButton from './ui/ScrollUpButton'

import coolPalette from '../palettes/coolPalette'
import hotPalette from '../palettes/hotPalette'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const stalinistFont = { fontFamily: 'Stalinist One, cursive' }
    const goldmanFont = { fontFamily: 'Goldman, cursive' }
    const theme = createMuiTheme({
      palette: this.props.hotTheme ? hotPalette : coolPalette,
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
      <Provider store={this.props.store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <BrowserRouter>
              <TopBar theme={theme} />
              <Switch>
                <Route exact path='/' component={JokesIndex} />
                <Route exact path='/home' component={JokesIndex} />
                <Route exact path='/styleguide' component={StyleGuide} />
              </Switch>
            </BrowserRouter>
          <ScrollUpButton />
        </ThemeProvider>
      </Provider>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    hotTheme: state.app.hotTheme,
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
