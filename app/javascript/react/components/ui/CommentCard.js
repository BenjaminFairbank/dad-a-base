import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton
} from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import useStyles from '../../styles/styleGuideStyle'

const CommentCard = props => {
  const classes = useStyles()

  const handleDeleteCommentClick = event => props.deleteComment(props.comment.id)

  let actions = ''
  if (props.comment.user.id === props.currentUser.id) {
    actions = (
      <Box>
        {/* <IconButton aria-label="edit">
          <EditOutlinedIcon />
        </IconButton> */}
        <IconButton aria-label="delete" onClick={handleDeleteCommentClick} title="Delete Comment">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
    )
  }

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
        action={actions}
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