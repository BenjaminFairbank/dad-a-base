import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  TextField,
  withWidth
} from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import UpdateIcon from '@material-ui/icons/Update';
import useStyles from '../../styles/commentCardStyles'
import timestampConverter from '../../functions/timestampConverter';

const CommentCard = props => {
  const classes = useStyles()

  const [commentEditingMode, setCommentEditingMode] = useState(false)
  const [updateCommentFormData, setUpdateCommentFormData] = useState(props.comment.body)

  const fieldID = 'commentForm' + props.comment.id.toString()

  const handleEditCommentClick = event => {
    setCommentEditingMode(!commentEditingMode)
    if (!commentEditingMode) {
      setUpdateCommentFormData(props.comment.body)
      setTimeout(() => {
        const editCommentField = document.getElementById(fieldID)
        var strLength = editCommentField.value.length*2
        editCommentField.focus()
        editCommentField.setSelectionRange(strLength, strLength)
      }, 10);
    }
  }

  const handleUpdateCommentFormChange = event => {
    setUpdateCommentFormData(event.target.value)
  }

  const handleUpdateCommentFormSubmit = event => {
    event.preventDefault()
    if (updateCommentFormData === props.comment.body) {
      setCommentEditingMode(false)
    } else if (updateCommentFormData !== '') {
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
  if (props.currentUser !== null && props.comment.user.id === props.currentUser.id) {
    actions = (
      <Box className={classes.commentActionsBox}>
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
        className={classes.commentCardHeader}
        disableTypography
        avatar={props.comment.user.profile_photo.url &&
          <Avatar
            aria-label="profile-pic"
            className={classes.commentAvatar}
            src={props.comment.user.profile_photo.url}
          />
        }
        title={
          <Typography className={classes.commentUserNameTextWrapper}>
            <Typography
              variant='subtitle2'
              className={classes.commentUserName}
              component={Link}
              to={`/users/${props.comment.user.id}`}
            >
              {props.comment.user.user_name}
            </Typography>
          </Typography>
        }
        subheader={
          <Typography
            variant='subtitle2'
            color="textSecondary"
            className={classes.commentTimestamp}
          >
            {timestampConverter(props.comment.created_at)}
          </Typography>
        }
        action={props.width !== 'xs' && actions}
      />
      {props.width === 'xs' && actions}
      <CardContent className={classes.commentCardContent}>
        {commentCardContent}
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default withWidth()(
  connect(
    mapStateToProps,
    null
  )(CommentCard)
)