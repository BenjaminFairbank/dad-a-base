import React from 'react'
import { Typography, Box } from '@material-ui/core';
import useStyles from '../../styles/styleGuideStyle'

const StyleGuide = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.styleGuide}>
        <Typography variant="h5">
          Style Guide
        </Typography>
      </div>
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