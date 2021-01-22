import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useStyles from '../../styles/styleGuideStyle'

const StyleGuide = () => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.styleGuide}>
        <Typography variant="h5">
          Style Guide
        </Typography>
      </Box>
      <Box className={classes.textStyles}>
        <Typography variant="h4">
          Headers: Stalinist One
        </Typography>
        <Typography variant="subtitle1">
          Subtitles: Goldman
        </Typography>
        <Typography variant="caption">
          Else: Roboto
        </Typography>
      </Box>
      <Box className={classes.colorThemes}>
        <Typography variant="h4">
          Themes
        </Typography>
        <Box className={classes.tightBox}>
          <Box className={classes.floatLeft}>
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
          </Box>
          <Box className={classes.floatRight}>
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
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default StyleGuide