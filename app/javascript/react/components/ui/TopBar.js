import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleHotTheme } from '../../modules/app'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import AcUnitIcon from '@material-ui/icons/AcUnit'
import WhatshotIcon from '@material-ui/icons/Whatshot'

import { assignCurrentUser } from '../../modules/user'
import { displayAlertMessage } from '../../modules/alertMessage'
import { closeAlertMessage } from '../../modules/alertMessage'

import useStyles from '../../styles/topBarStyles'

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
      setTimeout(() => { props.closeAlertMessage() }, 5000);
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
              <AcUnitIcon />
              <Switch
                checked={props.hotTheme}
                onChange={()=>{ props.toggleHotTheme() }}
                color="secondary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <WhatshotIcon />
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
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message)),
    closeAlertMessage: () => dispatch(closeAlertMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)