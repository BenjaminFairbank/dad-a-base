import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

import SignInCard from '../ui/SignInCard'
import SignUpCard from '../ui/SignUpCard'

const Login = props => {

  let page = (
    <Grid container>
      <SignInCard />
      <SignUpCard />
    </Grid>
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