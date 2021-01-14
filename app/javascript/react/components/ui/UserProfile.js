import React from 'react'
import {
  Card,
  Typography,
  Avatar,
  Box,
} from '@material-ui/core'
import useStyles from '../../styles/userProfileStyles'

const UserProfile = props => {
  const classes = useStyles()

  return (
    <Card className={classes.profileCard} elevation={3}>
      <Typography
        variant='h6'
        className={classes.userName}
      >
        {props.user.user_name}
      </Typography>
      <Box className={classes.profileCardContents}>
        {props.user.profile_photo && props.user.profile_photo.url &&
          <Box className={classes.containerBox}>
            <Avatar
              elevation={3}
              aria-label="profile-pic"
              className={classes.avatar}
              src={props.user.profile_photo.url}
            />
          </Box>
        }
        {props.user.about_me &&
          <Card className={classes.infoCard}>
            <Typography variant='subtitle1' className={classes.title}>About Me</Typography>
            <Typography variant='subtitle2' className={classes.aboutMe}>{props.user.about_me}</Typography>
          </Card>
        }
      </Box>
    </Card>
  )
}

export default UserProfile