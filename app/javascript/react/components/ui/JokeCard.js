import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  Box,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  Collapse
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import clsx from 'clsx'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PostAddIcon from '@material-ui/icons/PostAdd'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

import useStyles from '../../styles/jokeCardStyles'
import { withStyles } from '@material-ui/core/styles'

import CommentCard from './CommentCard'
import ratingEvaluator from '../../functions/ratingEvaluator'

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

  let userRated = false
  if (props.currentUser !== null) {
    userRated = props.currentUser.ratings.map(rating => rating.joke.id).includes(props.joke.id)
  }
  if (userRated) {
    var userRating = props.currentUser.ratings.find(rating => rating.joke.id === props.joke.id)
  }

  const [commentFormData, setCommentFormData] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [hRValue, setHRValue] = useState(userRated ? userRating.value/2 : 0)
  const [hRHover, setHRHover] = useState(-1)
  const [ratedRecently, setRatedRecently] = useState(false)
  const [ratingID, setRatingID] = useState(userRated ? userRating.id : null)
  const [updatedComments, setUpdatedComments] = useState(null)

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
      let rating = body
      setHRValue(rating.value/2)
      setRatingID(rating.id)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const updateRating = value => {
    fetch(`/api/v1/ratings/${ratingID}`, {
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
      const rating = body
      setHRValue(rating.value/2)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const postComment = body => {
    fetch('/api/v1/comments', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        joke_id: props.joke.id,
        body: body
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
      setExpanded(true)
      setCommentFormData('')
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const updateComment = (id, body) => {
    fetch(`/api/v1/comments/${id}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify({
        joke_id: props.joke.id,
        body: body
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
      props.setJokes(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleCommentFormChange = event => {
    setCommentFormData(event.target.value)
  }

  const handleCommentFormSubmit = event => {
    event.preventDefault()
    if (commentFormData !== '') { postComment(commentFormData) }
  }

  const handleExpandCommentsClick = () => setExpanded(!expanded)

  const handleDeleteJokeClick = () => {
    if (props.currentUser.id === props.joke.user.id) {deleteJoke(props.joke.id)}
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

  const jokeRating = ratingEvaluator(props.joke, props.currentUser, hRValue, userRated, ratedRecently)

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
        action={
          <Box className={classes.ratingBox}>
            <Box className={classes.ratingInnerBox}>
              <Rating
                name="half-rating-read"
                value={jokeRating}
                precision={0.5}
                readOnly
                className={classes.rating}
              />
              <Typography variant='subtitle1' className={classes.ratingCount}>
                ({!userRated && ratedRecently ? props.joke.ratings.length + 1 : props.joke.ratings.length})
              </Typography>
            </Box>
            <Typography variant='subtitle1' className={classes.ratingLabel}>
              {ratingLabels[jokeRating]}
            </Typography>
          </Box>
        }
        title={<Typography variant='subtitle1'>{props.joke.user.email}</Typography>}
        subheader={
          <Typography variant='subtitle1' color="textSecondary">
            {props.joke.created_at}
          </Typography>
        }
      />
      {props.joke.body !== '' && 
        <CardContent className={classes.jokeCardContent}>
          <Typography variant="body1" color="textSecondary">
            {props.joke.body}
          </Typography>
        </CardContent>
      }
      {props.joke.image.url && 
        <CardMedia
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
              value={commentFormData}
              onChange={handleCommentFormChange}
              className={classes.commentFormField}
              multiline
              rowsMax={4}
            />
            <IconButton
              aria-label="Post Comment"
              title="Post Comment"
              type='submit'
              className={classes.postCommentButton}
            >
              <PostAddIcon fontSize="large" />
            </IconButton>
          </form>
        </Box>
      }
      <CardActions disableSpacing className={classes.cardActions}>
        {props.currentUser !== null &&
          <>
            {props.currentUser.id === props.joke.user.id &&
              <IconButton aria-label="delete" onClick={handleDeleteJokeClick}>
                <DeleteOutlinedIcon />
              </IconButton>
            }
            <Typography className={classes.rateText} variant='subtitle1'>
              Rate:
            </Typography>
            <Box className={classes.hoverRating}>
              <Rating
                name={`hover-feedback-${props.joke.id}`}
                value={hRValue}
                precision={0.5}
                onChange={(event, newHRValue) => {
                  setRatedRecently(true)
                  if (ratingID === null) {
                    postRating(newHRValue)
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
        <Typography className={classes.commentsSectionIndicator} variant='subtitle1'>
          View comments:
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
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.commentsSection}>
          {commentCards}
        </CardContent>
      </Collapse>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(
  mapStateToProps,
  null
)(JokeCard)