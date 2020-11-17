import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  primary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.primary.main
  },
  secondary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.secondary.main
  },
  tertiary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.tertiary.main
  },
  quaternary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quaternary.main
  },
  quinary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quinary.main
  },
  primary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.primary2.main
  },
  secondary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.secondary2.main
  },
  tertiary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.tertiary2.main
  },
  quaternary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quaternary2.main
  },
  quinary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quinary2.main
  },
  floatLeft: {
    float: 'left',
  },
  floatRight: {
    float: 'right',
  },
  tightBox: {
    margin: 'auto',
    width: 200,
  },
  textStyles: {
    padding: 20,
  },
  colorThemes: {
    textAlign: 'center',
  },
}))

const StyleGuide = props => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.textStyles}>
        <Typography variant="h4">
          Headers: Stalinist One
        </Typography>
        <Typography variant="subtitle1">
          Subtitles: Goldman
        </Typography>
        <Typography variant="caption">
          Else: Roboto
        </Typography>
      </div>
      <div className={classes.colorThemes}>
        <Typography variant="h4">
          Themes
        </Typography>
        <div className={classes.tightBox}>
          <div className={classes.floatLeft}>
            <Typography variant="subtitle1">
              cool
            </Typography>
            <Box className={classes.primary}>
              <Typography variant="caption">
                primary
              </Typography>
            </Box>
            <Box className={classes.secondary}>
              <Typography variant="caption">
                secondary
              </Typography>
            </Box>
            <Box className={classes.tertiary}>
              <Typography variant="caption">
                tertiary
              </Typography>
            </Box>
            <Box className={classes.quaternary}>
              <Typography variant="caption">
                quaternary
              </Typography>
            </Box>
            <Box className={classes.quinary}>
              <Typography variant="caption">
                quinary
              </Typography>
            </Box>
          </div>
          <div className={classes.floatRight}>
            <Typography variant="subtitle1">
              hot
            </Typography>
            <Box className={classes.primary2}>
              <Typography variant="caption">
                primary
              </Typography>
            </Box>
            <Box className={classes.secondary2}>
              <Typography variant="caption">
                secondary
              </Typography>
            </Box>
            <Box className={classes.tertiary2}>
              <Typography variant="caption">
                tertiary
              </Typography>
            </Box>
            <Box className={classes.quaternary2}>
              <Typography variant="caption">
                quaternary
              </Typography>
            </Box>
            <Box className={classes.quinary2}>
              <Typography variant="caption">
                quinary
              </Typography>
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

export default StyleGuide