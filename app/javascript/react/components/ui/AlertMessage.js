import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  alertMessage: {
    paddingTop: 8,
    width: '100%',
    background: theme.palette.secondary.main,
    textAlign: 'center'
  },
  innerBox: {
    display: 'inline-flex',
  },
  button: {
    height: 25,
    minWidth: 25,
    borderRadius: '50%',
  },
  text: {
    color: theme.palette.primary.main,
    paddingRight: 10
  },
  buttonText: {
    color: theme.palette.primary.main,
  }
}))

const AlertMessage = props => {
  const classes = useStyles()

  return(
    <Box className={classes.alertMessage}>
      <Box className={classes.innerBox}>
        <Typography variant='subtitle1' className={classes.text}>
          {props.message}
        </Typography>
        <Button onClick={props.closeAlertMessage} className={classes.button}>
          <Typography variant='subtitle1' className={classes.buttonText}>&times;</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default AlertMessage
