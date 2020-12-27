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
  const largeScreen = useMediaQuery(props.theme.breakpoints.up("md"));
  const title = largeScreen ? 'The Dad-a-Base' : 'DB'

  return (
    <>
      <div className={classes.root}>
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography
                component={Link}
                to='/'
                variant='h3'
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
              <Button
                className={classes.button}
                color="inherit"
                href="/users/sign_in"
              >
                Login
              </Button>
            </Toolbar>
            {largeScreen &&
            (<Box className={classes.subtitleBox}>
              <Typography variant='subtitle1' className={classes.subtitleText}>
                Finally, a place to share all your worst dad jokes and memes!
              </Typography>
            </Box>)}
          </AppBar>
        </ElevationScroll>
      </div>
      {largeScreen &&
      (<Box className={classes.subtitleBox}></Box>)}
      <Toolbar id="back-to-top-anchor" />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    hotTheme: state.app.hotTheme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHotTheme: () => dispatch(toggleHotTheme())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)