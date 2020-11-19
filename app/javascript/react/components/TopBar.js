import React from 'react'
import { Link } from 'react-router-dom'

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
      color: theme.palette.secondary.main,
    },
    '&:focus': {
      color: 'white',
    },
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
  // const largeScreen = useMediaQuery(props.theme.breakpoints.up("md"));
  // const title = largeScreen ? 'The Dad-a-Base' : 'DAD-A-BASE'
  // const titleVariant = largeScreen ? 'h3' : 'h4'

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
                The Dad-a-Base
              </Typography>

              <Box variant="h6" className={classes.midSpace}></Box>
              <AcUnit />
              <Switch
                checked={props.coolTheme}
                onChange={()=>{ props.setCoolTheme(!props.coolTheme) }}
                color="secondary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Whatshot />
              <Button className={classes.button} color="inherit">Login</Button>
            </Toolbar>
            <Box className={classes.subtitleBox}>
              <Typography variant='subtitle1' className={classes.subtitleText}>
                Finally, a place to share all your worst dad jokes and memes!
              </Typography>
            </Box>
          </AppBar>
        </ElevationScroll>
      </div>
      <Box className={classes.subtitleBox}></Box>
      <Toolbar id="back-to-top-anchor" />
    </>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     darkMode: state.app.darkMode
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleDarkMode: () => dispatch(toggleDarkMode())
//   }
// }

export default TopBar