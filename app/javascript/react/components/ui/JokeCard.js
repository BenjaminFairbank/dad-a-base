import React, { useState } from 'react'
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
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PostAddIcon from '@material-ui/icons/PostAdd';
import useStyles from '../../styles/styleGuideStyle'
import clsx from 'clsx';
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

  const userRated = props.currentUser.ratings.map(rating => rating.joke.id).includes(props.joke.id)
  if (userRated) {
    var userRating = props.currentUser.ratings.find(rating => rating.joke.id === props.joke.id)
  }

  const [commentFormData, setCommentFormData] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [hRValue, setHRValue] = useState(userRated ? userRating.value/2 : 0)
  const [hRHover, setHRHover] = useState(-1)
  const [ratedRecently, setRatedRecently] = useState(false)
  const [ratingID, setRatingID] = useState(userRated ? userRating.id : null)
  const [recentComments, setRecentComments] = useState([])

  const ratingLabels = {
    0.5: 'True Dad Joke',
    1: 'Mirthful',
    1.5: 'Mirthful',
    2: 'Knee-Slapper',
    2.5: 'Knee-Slapper',
    3: 'Side-Splitter',
    3.5: 'Side-Splitter',
    4: 'Humdinger',
    4.5: 'Humdinger',
    5: 'The Bee\'s Knees',
  };

  const postRating = (value) => {
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

  const updateRating = (value) => {
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

  const postComment = (body) => {
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
      const comment = body
      setRecentComments([...recentComments, comment])
      setExpanded(true)
      setCommentFormData('')
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleCommentFormChange = (event) => {
    setCommentFormData(event.target.value)
  }

  const handleCommentFormSubmit = (event) => {
    event.preventDefault()
    postComment(commentFormData)
  }

  const handleExpandCommentsClick = () => setExpanded(!expanded)

  let commentCards = props.joke.comments.concat(recentComments).reverse().map(comment => <CommentCard key={comment.id} comment={comment} />)

  if (props.joke.comments.length === 0 && recentComments.length === 0) {
    commentCards = <Typography variant='body2'>No comments yet</Typography>
  }

  return (
    <Card elevation={3} className={classes.jokeCard}>
      <CardHeader
        className={classes.cardHeader}
        disableTypography
        avatar={
          <Avatar aria-label="profile-pic" className={classes.avatar}>
            <img className={classes.image} src='https://i.imgur.com/dOx2wRl.jpg' />
          </Avatar>
        }
        action={
          <Box className={classes.ratingBox}>
            <Box className={classes.ratingInnerBox}>
              <Rating
                name="half-rating-read"
                value={ratingEvaluator(props.joke, props.currentUser.ratings, hRValue, userRated, ratedRecently)}
                precision={0.5}
                readOnly
                className={classes.rating}
              />
              <Typography variant='subtitle1' className={classes.ratingCount}>
                ({!userRated && ratedRecently ? props.joke.ratings.length + 1 : props.joke.ratings.length})
              </Typography>
            </Box>
            <Typography variant='subtitle1' className={classes.ratingLabel}>
              {ratingLabels[ratingEvaluator(props.joke, props.currentUser.ratings, hRValue, userRated, ratedRecently)]}
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
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.joke.body}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        className={classes.media}
        image={props.joke.image}
        title="meme"
      />
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
          />
          <IconButton aria-label="add to favorites" type='submit' className={classes.postCommentButton}>
            <PostAddIcon fontSize="large" />
          </IconButton>
        </form>
      </Box>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
        <Typography className={classes.commentsSectionIndicator} variant='subtitle1'>
          View comments:
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandCommentsClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
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

export default JokeCard