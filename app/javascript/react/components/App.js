import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'

import JokesIndex from './pages/JokesIndex'
import Login from './pages/Login'
import StyleGuide from './pages/StyleGuide'
import TopBar from './ui/TopBar'
import ScrollUpButton from './ui/ScrollUpButton'
import AlertMessage from './ui/AlertMessage'

import coolPalette from '../palettes/coolPalette'
import hotPalette from '../palettes/hotPalette'

import { closeAlertMessage } from '../modules/alertMessage'
import { checkForUser } from '../modules/user'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.checkForUser()
  }

  render() {
    let alertMessageDiv
    if (this.props.alertMessage){
      alertMessageDiv =
      <AlertMessage
        message={this.props.alertMessage}
        closeAlertMessage={this.props.closeAlertMessage}
      />
    }

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
      breakpoints: {
        values: {
          xs: 0,
          sm: 750,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
    });

    return (
      <Provider store={this.props.store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <BrowserRouter>
              <TopBar theme={theme} />
              {alertMessageDiv}
              <Switch>
                <Route exact path='/' component={JokesIndex} />
                <Route exact path='/home' component={JokesIndex} />
                <Route exact path='/login' component={Login} />
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
    alertMessage: state.alertMessage.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeAlertMessage: () => dispatch(closeAlertMessage()),
    checkForUser: () => dispatch(checkForUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
