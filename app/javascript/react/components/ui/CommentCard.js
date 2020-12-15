import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  TextField
} from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import UpdateIcon from '@material-ui/icons/Update';
import useStyles from '../../styles/styleGuideStyle'

const CommentCard = props => {
  const classes = useStyles()

  const [commentEditingMode, setCommentEditingMode] = useState(false)
  const [updateCommentFormData, setUpdateCommentFormData] = useState(props.comment.body)

  const fieldID = 'commentForm' + props.comment.id.toString()


  const handleEditCommentClick = event => {
    setCommentEditingMode(!commentEditingMode)
    if (!commentEditingMode) {
      setUpdateCommentFormData(props.comment.body)
      setTimeout(() => { document.getElementById(fieldID).focus() }, 10);
    }
  }

  const handleUpdateCommentFormChange = event => {
    setUpdateCommentFormData(event.target.value)
  }

  const handleUpdateCommentFormSubmit = event => {
    event.preventDefault()
    if (updateCommentFormData !== '') {
      props.updateComment(props.comment.id, updateCommentFormData)
      setCommentEditingMode(false)
    } else {
      if(confirm('Are you trying to delete your comment? If so, press OK and your comment will be deleted.  Warning: This cannot be undone!')) {
        props.deleteComment(props.comment.id)
      } else {
        setCommentEditingMode(false)
        setUpdateCommentFormData(props.comment.body)
      }
    }
  }

  const handleDeleteCommentClick = event => props.deleteComment(props.comment.id)

  let actions = ''
  if (props.comment.user.id === props.currentUser.id) {
    actions = (
      <Box>
        <IconButton aria-label="edit" onClick={handleEditCommentClick} title="Edit Comment">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteCommentClick} title="Delete Comment">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
    )
  }

  let commentCardContent = (
    <Typography variant="body1" color="textSecondary" className={classes.commentBody}>
      {props.comment.body}
    </Typography>
  )
  if (commentEditingMode) {
    commentCardContent = (
      <form onSubmit={handleUpdateCommentFormSubmit} className={classes.commentUpdateForm}>
        <TextField
          id={fieldID}
          value={updateCommentFormData}
          onChange={handleUpdateCommentFormChange}
          className={classes.commentUpdateField}
          size='small'
          multiline
        />
        <IconButton aria-label="update" type='submit' title="Update Comment" className={classes.commentUpdateButton}>
          <UpdateIcon fontSize='small'/>
        </IconButton>
      </form>
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
      <CardContent className={classes.commentCardContent}>
        {commentCardContent}
      </CardContent>
    </Card>
  )
}

export default CommentCard