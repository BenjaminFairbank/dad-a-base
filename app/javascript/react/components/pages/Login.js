import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'

import sensitiveData from '../../../../assets/images/Data.jpg'

import SignInCard from '../ui/SignInCard'
import SignUpCard from '../ui/SignUpCard'

const useStyles = makeStyles((theme) => ({
  warning: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    paddingTop: 15,
  },
  imgBox: {
    display:'flex',
    justifyContent:'center',
    marginTop: 20,
  },
  imgCard: {
    width: 300,
    height: 277,
  },
  img: {
    height: 277
  },
  text: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    padding: '10px 16px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid',
    outline: 'none',
    boxShadow: theme.shadows[5],
    borderColor: theme.palette.primary.main,
    padding: '10px 25px',
    width: 300,
    textAlign: 'center',
    borderRadius: 8,
  },
  gridContainer: {
    textAlign: 'center',
    paddingBottom: 25
  },
  warningGridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningBox: {
    padding: 16
  },
}))

const Login = props => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [signIn, setSignIn] = useState(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSignInClick = () => { setSignIn(true); handleOpen() }
  const handleSignUpClick = () => { setSignIn(false); handleOpen() }

  let page = (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={6} className={classes.warningGridItem}>
          <div className={classes.warningBox}>
          <Typography variant='h6' className={classes.warning}>
            Warning!
          </Typography>
          <Typography variant='body1' className={classes.text}>
            At the moment, this login portal does NOT utilize encrpytion.
            For your own protection, DO NOT use an email-password
            combination that may protect your sensitive data elsewhere.
            Feel free to use unconfirmable credentials as this application will not email you.
          </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.imgBox}>
            <Card className={classes.imgCard}>
              <CardMedia image={sensitiveData} className={classes.img}></CardMedia>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={6}><Button onClick={handleSignInClick} size="large">Sign In</Button></Grid>
        <Grid item xs={6}><Button onClick={handleSignUpClick} size="large">Sign Up</Button></Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {signIn && <SignInCard />}
            {!signIn && <SignUpCard />}
          </div>
        </Fade>
      </Modal>
    </>
  )

  if (props.currentUser !== null) { page = <Redirect to='/'/> }

  return <>{page}</>
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(
  mapStateToProps,
  null
)(Login)