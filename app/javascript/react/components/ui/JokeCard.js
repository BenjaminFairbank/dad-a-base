import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import withWidth from '@material-ui/core/withWidth'

import Rating from '@material-ui/lab/Rating'
import clsx from 'clsx'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PostAddIcon from '@material-ui/icons/PostAdd'
import UpdateIcon from '@material-ui/icons/Update'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import CropSharpIcon from '@material-ui/icons/CropSharp'
import GifRoundedIcon from '@material-ui/icons/GifRounded';

import useStyles from '../../styles/jokeCardStyles'
import { withStyles } from '@material-ui/core/styles'

import CommentCard from './CommentCard'
import ReactCropper from './ReactCropper'
import GiphySearch from './GiphySearch'

import ratingEvaluator from '../../functions/ratingEvaluator'
import timestampConverter from '../../functions/timestampConverter'

import { displayAlertMessage } from '../../modules/alertMessage'

const CssTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.quaternary.main,
    },
  },
}))(TextField);

const JokeCard = props => {
  const classes = useStyles()

  const defaultFormData = {
    body: props.joke.body,
    image: ''
  }
  
  const defaultCommentFormData = {
    body: '',
    gif_url: ''
  }
  
  const [hRHover, setHRHover] = useState(-1)
  const [hRValue, setHRValue] = useState(null)
  const [userRatingID, setUserRatingID] = useState(null)
  const [updatedRatings, setUpdatedRatings] = useState(null)

  const [commentFormData, setCommentFormData] = useState(defaultCommentFormData)
  const [updatedComments, setUpdatedComments] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const [jokeEditingMode, setJokeEditingMode] = useState(false)
  const [updateJokeFormData, setUpdateJokeFormData] = useState(defaultFormData)
  const [newFileUploaded, setNewFileUploaded] = useState(false)

  const [dropzoneHeight, setDropzoneHeight] = useState(100)
  const [updating, setUpdating] = useState(false)
  const [open, setOpen] = useState(false)

  const [gifModalOpen, setGifModalOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleGifSearchOpen = () => {
    setGifModalOpen(true)
    setTimeout(() => {
      document.getElementById('GiphySearch').focus()
    }, 10);
  }
  const handleGifSearchClose = () => setGifModalOpen(false)

  useEffect(() => {
    let userRated = false
    if (props.currentUser !== null) {
      userRated = props.joke.ratings.map(rating => rating.user.id).includes(props.currentUser.id)
    }
    if (userRated) {
      const userRating = props.joke.ratings.find(rating => rating.user.id === props.currentUser.id)
      setHRValue(userRating.value/2)
      setUserRatingID(userRating.id)
    }
  },[])

  const ratingLabels = {
    0.5: 'True Dad Joke',
    1: 'Knee-Slapper',
    1.5: 'Knee-Slapper',
    2: 'Belly-Buster',
    2.5: 'Belly-Buster',
    3: 'Side-Splitter',
    3.5: 'Side-Splitter',
    4: 'Humdinger',
    4.5: 'Humdinger',
    5: 'The Bee\'s Knees',
  };

  const postRating = value => {
    fetch('/api/v1/ratings', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        joke_id: props.joke.id,
        value: 2*value
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let rating = body.rating
      let ratings = body.ratings
      setHRValue(rating.value/2)
      setUserRatingID(rating.id)
      setUpdatedRatings(ratings)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const updateRating = value => {
    fetch(`/api/v1/ratings/${userRatingID}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify({
        joke_id: props.joke.id,
        value: 2*value
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let rating = body.rating
      let ratings = body.ratings
      setHRValue(rating.value/2)
      setUserRatingID(rating.id)
      setUpdatedRatings(ratings)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const deleteRating = id => {
    fetch(`/api/v1/ratings/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let ratings = body
      setHRValue(null)
      setUserRatingID(null)
      setUpdatedRatings(ratings)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const postComment = comment => {
    fetch('/api/v1/comments', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        joke_id: props.joke.id,
        body: comment.body,
        gif_url: comment.gif_url
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      if (!body.error) {
        let updatedCommentsList = body
        setUpdatedComments(updatedCommentsList)
        setExpanded(true)
        setCommentFormData(defaultCommentFormData)
      } else {
        console.log(body.error)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const updateComment = (id, comment) => {
    fetch(`/api/v1/comments/${id}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify({
        joke_id: props.joke.id,
        body: comment.body,
        gif_url: comment.gif_url
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let updatedCommentsList = body
      setUpdatedComments(updatedCommentsList)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const deleteComment = id => {
    fetch(`/api/v1/comments/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let updatedCommentsList = body
      setUpdatedComments(updatedCommentsList)
      if (updatedCommentsList.length === 0) { setExpanded(false) }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const editJoke = () => {
    let formPayload = new FormData()
    formPayload.append('joke[body]', updateJokeFormData.body)
    if (newFileUploaded) {
      formPayload.append('joke[image]', updateJokeFormData.image)
    }

    fetch(`/api/v1/jokes/${props.joke.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Accept': 'image/jpeg'
      },
      body: formPayload
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let jokes = body
      if (jokes.error) {
        props.displayAlertMessage(joke.error)
      } else {
        setNewFileUploaded(false)
        setUpdating(false)
        props.displayAlertMessage('')
        props.setJokes(jokes)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const deleteJoke = id => {
    fetch(`/api/v1/jokes/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let jokes = body
      props.setJokes(jokes)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleCommentFormChange = event => {
    setCommentFormData({
      ...commentFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleCommentFormSubmit = event => {
    event.preventDefault()
    if (commentFormData.body !== '' || commentFormData.gif_url !== '' ) { postComment(commentFormData) }
  }

  const handleExpandCommentsClick = () => setExpanded(!expanded)

  const handleDeleteJokeClick = () => {
    if (props.currentUser.id === props.joke.user.id) {deleteJoke(props.joke.id)}
  }

  const fieldID = 'jokeUpdateForm' + props.joke.id.toString()

  const handleEditJokeClick = () => {
    if (props.joke.image.url !== null && !jokeEditingMode) {
      setDropzoneHeight(document.getElementById(`image${props.joke.id}`).clientHeight)
    }
    setJokeEditingMode(!jokeEditingMode)
    if (!jokeEditingMode) {
      setUpdateJokeFormData(defaultFormData)
      setTimeout(() => {
        const editJokeField = document.getElementById(fieldID)
        var strLength = editJokeField.value.length*2
        editJokeField.focus()
        editJokeField.setSelectionRange(strLength, strLength)
      }, 10);
    }
  }

  const handleJokeUpdateFormChange = event => {
    setUpdateJokeFormData({
      ...updateJokeFormData,
      body: event.target.value
    })
  }

  const handleFileUpload = acceptedFiles => {
    setNewFileUploaded(true)
    setUpdateJokeFormData({
      ...updateJokeFormData,
      image: acceptedFiles[0]
    })
  }

  const validForSubmission = () => updateJokeFormData.body !== props.joke.body || updateJokeFormData.image !== ''

  const handleJokeUpdateFormSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      editJoke()
      setJokeEditingMode(false)
      setUpdating(true)
      props.displayAlertMessage('Updating...')
    }
  }

  let commentsList = updatedComments === null ? props.joke.comments : updatedComments
  let commentCards = commentsList.map(comment => {
    return (
      <CommentCard
        key={comment.id}
        comment={comment}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
    )
  })
  if (props.joke.comments.length === 0 && (updatedComments === null || updatedComments.length === 0)) {
    commentCards = <Typography variant='body2'>No comments</Typography>
  }

  const jokeRating = ratingEvaluator(updatedRatings === null ? props.joke.ratings : updatedRatings)

  const ratingLabel = (
    <Typography variant='subtitle1' className={classes.ratingLabel}>
      "{ratingLabels[jokeRating]}"
    </Typography>
  )

  let ratingBox = <Typography variant='subtitle2' className={classes.notYetRated}>Not yet rated</Typography>
  if (!isNaN(jokeRating)) {
    ratingBox = (
      <Box className={classes.ratingBox}>
          <Grid container>
            <Grid item xs={6} sm={12} className={classes.ratingInnerBox}>
              <Rating
                name="half-rating-read"
                value={jokeRating}
                precision={0.5}
                readOnly
                className={classes.rating}
              />
              <Typography variant='subtitle1' className={classes.ratingCount}>
                ({updatedRatings === null ? props.joke.ratings.length : updatedRatings.length})
              </Typography>
            </Grid>
            {props.width === 'xs' && <Grid item xs={6} sm={12}>{ratingLabel}</Grid>}
          </Grid>
        {props.width !== 'xs' && ratingLabel}
      </Box>
    )
  }

  const viewComments = (
    <>
      <Typography className={classes.commentsSectionIndicator} variant='subtitle1'>
        View comments ({updatedComments === null ? props.joke.comments.length : updatedComments.length})
      </Typography>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandCommentsClick}
        aria-expanded={expanded}
        aria-label="Show/Hide Comments"
        title="Show/Hide Comments"
      >
        <ExpandMoreIcon fontSize='large' />
      </IconButton>
    </>
  )

  const editDeleteJokeButtons = (
    <Box className={classes.editDeleteJokeButtonBox}>
      {updating &&
        <>
          <CircularProgress
            className={classes.spinner}
            color= 'secondary'
            size={35}
            thickness={3}
          />
          <Typography variant='subtitle2' className={classes.updatingText}>Updating...</Typography>
        </>
      }
      {jokeEditingMode && (updateJokeFormData.body !== props.joke.body || updateJokeFormData.image !== '') &&
        <IconButton aria-label="update" type='submit' title='Update Post'>
          <UpdateIcon />
        </IconButton>
      }
      <IconButton aria-label="edit" onClick={handleEditJokeClick} title='Edit Post'>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleDeleteJokeClick} title='Delete Post'>
        <DeleteOutlinedIcon />
      </IconButton>
    </Box>
  )

  let body
  if (props.joke.body !== '' && !jokeEditingMode) {
    body = (
      <CardContent className={classes.jokeCardContent}>
        <Typography variant="body1" color="textSecondary" className={classes.jokeBody}>
          {props.joke.body}
        </Typography>
      </CardContent>
    )
  } else if (jokeEditingMode) {
    body = (
      <form onSubmit={handleJokeUpdateFormSubmit}>
        {props.currentUser && props.joke.user.id === props.currentUser.id && editDeleteJokeButtons}
        <CardContent className={classes.jokeCardContent}>
          <TextField
            placeholder='Add a caption to you post'
            id={fieldID}
            value={updateJokeFormData.body}
            onChange={handleJokeUpdateFormChange}
            className={classes.jokeUpdateField}
            size='small'
            multiline
          />
        </CardContent>
        {props.joke.image.url === null &&
          <Box className={classes.updateDropzoneFlexBox}>
            <Dropzone onDrop={handleFileUpload}>
              {({getRootProps, getInputProps}) => (
                <section className={classes.dropzone}>
                  <Button {...getRootProps()} className={classes.dropzoneButton}>
                    <input {...getInputProps()} />
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant='body2' className={classes.dropzoneText}>
                          Click or drag 'n' drop an image here to add to your post!
                        </Typography>
                      </Grid>
                      {updateJokeFormData.image !== '' &&
                        <Grid item xs={12}>
                          <Typography variant='subtitle2'>
                            Upload: {updateJokeFormData.image.name}
                          </Typography>
                        </Grid>
                      }
                    </Grid>
                  </Button>
                </section>
              )}
            </Dropzone>
            {updateJokeFormData.image !== '' &&
              <IconButton onClick={handleOpen} className={classes.cropButton}>
                <CropSharpIcon />
              </IconButton>
            }
          </Box>
        }
        {props.joke.image.url !== null && 
          <>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='subtitle2' className={classes.dropzoneTextWithImage}>
                  Click the image or drag 'n' drop a new one below to update the posted image!
                </Typography>
              </Grid>
              {updateJokeFormData.image !== '' &&
                <Grid item xs={12}>
                  <Typography variant='subtitle2' className={classes.dropzoneUploadTextWithImage}>
                    Upload: {updateJokeFormData.image.name}
                    &nbsp;&nbsp;&nbsp;
                    <IconButton size='small' onClick={handleOpen}>
                      <CropSharpIcon />
                    </IconButton>
                  </Typography>
                </Grid>
              }
            </Grid>
            <Dropzone onDrop={handleFileUpload}>
              {({getRootProps, getInputProps}) => (
                <div className={classes.dropzoneWithImage}>
                  <Button
                    {...getRootProps()}
                    className={classes.dropzoneButtonWithImage}
                    style={{
                      backgroundImage: `url(${props.joke.image.url})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      width: '100%',
                      height: dropzoneHeight,
                    }}
                  >
                    <input {...getInputProps()} />
                  </Button>
                </div>
              )}
            </Dropzone>
          </>
        }
      </form>
    )
  }

  return (
    <Card elevation={3} className={classes.jokeCard}>
      <CardHeader
        className={classes.cardHeader}
        disableTypography
        avatar={props.joke.user.profile_photo.url &&
          <Avatar
            aria-label="profile-pic"
            className={classes.avatar}
            src={props.joke.user.profile_photo.url}
          />
        }
        title={
          <Typography className={classes.userNameTextWrapper}>
            <Typography
              variant='subtitle1'
              className={classes.userName}
              component={Link}
              to={`/users/${props.joke.user.id}`}
            >
              {props.joke.user.user_name}
            </Typography>
          </Typography>
        }
        subheader={
          <Typography variant='subtitle1' color="textSecondary" className={classes.timestamp}>
            {timestampConverter(props.joke.created_at)}
          </Typography>
        }
        action={props.width !== 'xs' && ratingBox}
      />
      {props.width === 'xs' && ratingBox}
      {props.currentUser && props.joke.user.id === props.currentUser.id && !jokeEditingMode && editDeleteJokeButtons}
      {body}
      {props.joke.image.url && !jokeEditingMode &&
        <CardMedia
          id={`image${props.joke.id}`}
          component="img"
          className={classes.media}
          image={props.joke.image.url}
          title="Meme"
        />
      }
      {props.currentUser !== null &&
        <Box className={classes.commentFormBox}>
          <form
            className={classes.commentForm}
            noValidate
            autoComplete="off"
            onSubmit={handleCommentFormSubmit}
          >
            <CssTextField
              label="Leave a Comment"
              placeholder="Your comment"
              value={commentFormData.body}
              name='body'
              onChange={handleCommentFormChange}
              className={classes.commentFormField}
              multiline
              rowsMax={4}
            />
            <IconButton
              aria-label="Add a GIF to your comment"
              title="Add a GIF to your comment"
              className={classes.postCommentButton}
              onClick={handleGifSearchOpen}
            >
              <GifRoundedIcon fontSize="large" />
            </IconButton>
            {(commentFormData.body !== '' || commentFormData.gif_url !== '') &&
              <IconButton
                aria-label="Post Comment"
                title="Post Comment"
                type='submit'
                className={classes.postCommentButton}
              >
                <PostAddIcon fontSize="large" />
              </IconButton>
            }
            {commentFormData.body === '' && commentFormData.gif_url === '' &&
              <IconButton
                aria-label="Post Comment"
                title="Post Comment"
                className={classes.postCommentButton}
                disabled
              >
                <PostAddIcon fontSize="large" />
              </IconButton>
            }
          </form>
          {commentFormData.gif_url !== '' &&
            <Box className={classes.selectedGifBox}>
              <img 
                className={classes.gif}
                src={`https://media.giphy.com/media/${commentFormData.gif_url}/giphy.gif`}
              ></img>
              <Button
                onClick={() => {
                  setCommentFormData({
                    ...commentFormData,
                    gif_url: ''
                  })
                }}
              >
                <Typography variant='h5' className={classes.buttonText}>&times;</Typography>
              </Button>
            </Box>
          }
        </Box>
      }
      <CardActions disableSpacing className={classes.cardActions}>
        {props.currentUser !== null &&
          <>
            <Typography className={classes.rateText} variant='subtitle1'>
              Rate:
            </Typography>
            <Box className={classes.hoverRating}>
              <Rating
                name={`hover-feedback-${props.joke.id}`}
                value={hRValue}
                precision={0.5}
                onChange={(event, newHRValue) => {
                  if (userRatingID === null) {
                    postRating(newHRValue)
                  } else if (newHRValue === null) {
                    deleteRating(userRatingID)
                  } else {
                    updateRating(newHRValue)
                  }
                }}
                onChangeActive={(event, newHRHover) => {
                  setHRHover(newHRHover)
                }}
              />
              {hRValue !== null && <Box ml={2}>{ratingLabels[hRHover !== -1 ? hRHover : hRValue]}</Box>}
            </Box>
          </>
        }
        {props.width !== 'xs' && viewComments}
      </CardActions>
      {props.width === 'xs' &&
        <CardActions className={classes.cardActions2}>
          {viewComments}
        </CardActions>
      }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.commentsSection}>
          {commentCards}
        </CardContent>
      </Collapse>
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
          <Box className={classes.paper}>
            <ReactCropper
              formData={updateJokeFormData}
              setFormData={setUpdateJokeFormData}
              handleClose={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
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
              formData={commentFormData}
              setFormData={setCommentFormData}
              handleGifSearchClose={handleGifSearchClose}
            />
          </Box>
        </Fade>
      </Modal>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message))
  }
}

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JokeCard)
)