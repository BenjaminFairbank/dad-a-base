import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleHotTheme } from '../../modules/app'

import { makeStyles } from '@material-ui/core/styles'
import {
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Switch,
  Box,
  Button
} from '@material-ui/core'

import { AcUnit, Whatshot } from '@material-ui/icons'

import { assignCurrentUser } from '../../modules/user'
import { displayAlertMessage } from '../../modules/alertMessage'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.tertiary.main,
    },
    '&:focus': {
      color: 'white',
    },
    textDecoration: 'none',
  },
  midSpace: {
    flexGrow: 1,
  },
  button: {
    marginLeft: 15,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  subtitleBox: {
    height: 30,
    width: '100%',
    background: theme.palette.primary.main,
  },
  subtitleText: {
    paddingLeft: 30,
  },
}))

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const TopBar = (props) => {
  const classes = useStyles()
  const smallScreen = useMediaQuery(props.theme.breakpoints.down('sm'));
  const title = smallScreen ? 'DB' : 'The Dad-a-Base'

  const logout = () => {
    fetch('/api/v1/users/sign_out_user', {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(userData => {
      props.assignCurrentUser(userData)
      props.displayAlertMessage('You are no longer signed in.')
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const logOutClickHandler = (event) => {
    logout(props.currentUser.id)
  }

  let loginButton = (
    <Button
      className={classes.button}
      color="inherit"
      component={Link}
      to="/login"
    >Login</Button>
  )
  if (props.currentUser !== null) {
    loginButton = (
      <Button
        className={classes.button}
        color="inherit"
        onClick={logOutClickHandler}
      >Logout</Button>
    )
  }

  return (
    <>
      <div className={classes.root}>
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography
                component={Link}
                to='/'
                variant='h4'
                className={classes.title}
              >
                {title}
              </Typography>
              <Box variant="h6" className={classes.midSpace}></Box>
              <AcUnit />
              <Switch
                checked={props.hotTheme}
                onChange={()=>{ props.toggleHotTheme() }}
                color="secondary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Whatshot />
              {loginButton}
            </Toolbar>
            {!smallScreen &&
            (<Box className={classes.subtitleBox}>
              <Typography variant='subtitle1' className={classes.subtitleText}>
                Finally, a place to share all your worst dad jokes and memes!
              </Typography>
            </Box>)}
          </AppBar>
        </ElevationScroll>
      </div>
      {!smallScreen &&
      (<Box className={classes.subtitleBox}></Box>)}
      <Toolbar id="back-to-top-anchor" />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    hotTheme: state.app.hotTheme,
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHotTheme: () => dispatch(toggleHotTheme()),
    assignCurrentUser: (userData) => dispatch(assignCurrentUser(userData)),
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)