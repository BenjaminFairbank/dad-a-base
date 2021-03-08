import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import withWidth from '@material-ui/core/withWidth'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import UpdateIcon from '@material-ui/icons/Update'

import useStyles from '../../styles/commentCardStyles'
import timestampConverter from '../../functions/timestampConverter'

import GiphySearch from './GiphySearch'

const CommentCard = props => {
  const classes = useStyles()

  const initialCommentData = {
    body: props.comment.body,
    gif_url: props.comment.gif_url
  }

  const [commentEditingMode, setCommentEditingMode] = useState(false)
  const [updateCommentFormData, setUpdateCommentFormData] = useState(initialCommentData)

  const [gifModalOpen, setGifModalOpen] = useState(false)

  const handleGifSearchOpen = () => {
    setGifModalOpen(true)
    setTimeout(() => {
      document.getElementById('GiphySearch').focus()
    }, 10);
  }
  const handleGifSearchClose = () => setGifModalOpen(false)

  const fieldID = 'commentForm' + props.comment.id.toString()

  const handleEditCommentClick = event => {
    setCommentEditingMode(!commentEditingMode)
    if (!commentEditingMode) {
      setTimeout(() => {
        const editCommentField = document.getElementById(fieldID)
        var strLength = editCommentField.value.length*2
        editCommentField.focus()
        editCommentField.setSelectionRange(strLength, strLength)
      }, 10);
      setUpdateCommentFormData(initialCommentData)
    }
  }

  const handleUpdateCommentFormChange = event => {
    setUpdateCommentFormData({
      ...updateCommentFormData,
      [event.currentTarget.name]: event.target.value
    })
  }

  const handleUpdateCommentFormSubmit = event => {
    event.preventDefault()
    if (updateCommentFormData === initialCommentData) {
      setCommentEditingMode(false)
    } else if ((updateCommentFormData.body !== props.comment.body || updateCommentFormData.gif_url !== props.comment.gif_url)
        && !(updateCommentFormData.body === '' && updateCommentFormData.gif_url === '')) {
      props.updateComment(props.comment.id, updateCommentFormData)
      setCommentEditingMode(false)
    } else {
      if(confirm('Are you trying to delete your comment? If so, press OK and your comment will be deleted.  Warning: This cannot be undone!')) {
        props.deleteComment(props.comment.id)
      } else {
        setCommentEditingMode(false)
        setUpdateCommentFormData(initialCommentData)
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
    <>
      {props.comment.body !== '' &&
        <Typography variant="body1" color="textSecondary" className={classes.commentBody}>
          {props.comment.body}
        </Typography>
      }
      {props.comment.gif_url !== '' &&
        <a href={`https://media.giphy.com/media/${props.comment.gif_url}/giphy.gif`}>
          <img
            className={classes.gif}
            src={`https://media.giphy.com/media/${props.comment.gif_url}/giphy.gif`}
          ></img>
        </a>
      }
    </>
  )
  if (commentEditingMode) {
    commentCardContent = (
      <>
        <form onSubmit={handleUpdateCommentFormSubmit} className={classes.commentUpdateForm}>
          <TextField
            id={fieldID}
            name="body"
            value={updateCommentFormData.body}
            onChange={handleUpdateCommentFormChange}
            className={classes.commentUpdateField}
            size='small'
            multiline
          />
          {(updateCommentFormData.body !== props.comment.body || updateCommentFormData.gif_url !== props.comment.gif_url) &&
            <IconButton
              aria-label="update"
              type='submit'
              title="Update Comment"
              className={classes.commentUpdateButton}
            >
              <UpdateIcon fontSize='small'/>
            </IconButton>
          }
          {updateCommentFormData.body === props.comment.body && updateCommentFormData.gif_url === props.comment.gif_url &&
            <IconButton
              aria-label="update"
              title="Update Comment"
              className={classes.commentUpdateButton}
              disabled
            >
              <UpdateIcon fontSize='small'/>
            </IconButton>
          }
        </form>
        {updateCommentFormData.gif_url !== '' &&
          <>
            <Typography variant='subtitle2' className={classes.gifClickDirections}>
              Click on the GIF below to pick a replacement
            </Typography>
            <Button onClick={handleGifSearchOpen} className={classes.gifEditButton}>
              <img
                className={classes.gif}
                src={`https://media.giphy.com/media/${updateCommentFormData.gif_url === props.comment.gif_url ? props.comment.gif_url : updateCommentFormData.gif_url}/giphy.gif`}
              ></img>
            </Button>
          </>
        }
        {updateCommentFormData.gif_url === '' &&
          <Box className={classes.addGifButtonWrapper}>
            <Button onClick={handleGifSearchOpen}>
              Add a GIF to your comment
            </Button>
          </Box>
        }
      </>
    )
  }

  return (
    <>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={gifModalOpen}
        onClose={handleGifSearchClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={gifModalOpen}>
          <Box className={classes.paper}>
            <GiphySearch
              formData={updateCommentFormData}
              setFormData={setUpdateCommentFormData}
              handleGifSearchClose={handleGifSearchClose}
            />
          </Box>
        </Fade>
      </Modal>
    </>
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