import React from 'react'
import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import useStyles from '../../styles/styleGuideStyle'

const CommentCard = props => {
  const classes = useStyles()

  return (
    <Card className={classes.commentCard}>
      <CardHeader
        className={classes.commentHeader}
        disableTypography
        avatar={
          <Avatar aria-label="profile-pic" className={classes.commentAvatar}>
            <img className={classes.image} src='https://i.imgur.com/dOx2wRl.jpg' />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant='subtitle2'>{props.comment.user.email}</Typography>}
        subheader={
          <Typography variant='subtitle2' color="textSecondary">
            {props.comment.created_at}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.comment.body}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CommentCard