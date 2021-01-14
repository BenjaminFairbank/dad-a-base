import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import SignInCard from '../ui/SignInCard'
import SignUpCard from '../ui/SignUpCard'

const useStyles = makeStyles((theme) => ({
  warning: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    padding: '5px 16px',
  }
}))

const Login = props => {
  const classes = useStyles()

  let page = (
    <>
      <Container maxWidth='md'>
        <Typography variant='h6' className={classes.warning}>
          Warning!
        </Typography>
        <Typography variant='subtitle1' className={classes.warning}>
          At the moment, this login portal does NOT utilize encrpytion.
          For your own protection, DO NOT use an email-password
          combination that may protect your sensitive data elsewhere.
          Feel free to use unconfirmable credentials as this application will not email you.
        </Typography>
      </Container>
      <Grid container>
        <Grid item xs={12} sm={6}><SignInCard /></Grid>
        <Grid item xs={12} sm={6}><SignUpCard /></Grid>
      </Grid>
    </>
  )

  if (props.currentUser !== null) {
    page = <Redirect to='/'/>
  }

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