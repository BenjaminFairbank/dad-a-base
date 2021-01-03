import React, { useState } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import {
  Typography,
  Box,
  Card,
  TextField,
  IconButton,
  Button,
  Grid
} from '@material-ui/core'
import PostAddIcon from '@material-ui/icons/PostAdd';
import useStyles from '../../styles/styleGuideStyle'
import { withStyles } from '@material-ui/core/styles'

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

const NewJokeForm = props => {
  const classes = useStyles()

  const defaultFormData = {
    body: '',
    image: ''
  }

  const [newJokeFormData, setNewJokeFormData] = useState(defaultFormData)

  const postJoke = () => {
    let formPayload = new FormData()
    formPayload.append('joke[body]', newJokeFormData.body)
    formPayload.append('joke[image]', newJokeFormData.image)

    fetch('api/v1/jokes', {
      method: 'POST',
      credentials: 'same-origin',
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
      let joke = body
      if (joke.error) {
        props.displayAlertMessage(joke.error)
      } else {
        clearForm()
        props.displayAlertMessage('')
        props.setJokes([...props.jokes, joke])
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleJokeFormChange = event => {
    setNewJokeFormData({
      ...newJokeFormData,
      body: event.target.value
    })
  }

  const handleFileUpload = acceptedFiles => {
    setNewJokeFormData({
      ...newJokeFormData,
      image: acceptedFiles[0]
    })
  }

  const validForSubmission = () => newJokeFormData.body !== '' || newJokeFormData.image !== ''
  
  const clearForm = () => setNewJokeFormData(defaultFormData)

  const handleJokeFormSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      postJoke()
      props.displayAlertMessage('Posting...')
    }
  }

  return (
    <Card className={classes.newJokeFormCard}>
      <form onSubmit={handleJokeFormSubmit} className={classes.newJokeForm}>

        <Box className={classes.newJokeFormBodyBox}>
          <CssTextField
            label="Post your 'worst' dad joke!"
            placeholder="Let's hear it!"
            value={newJokeFormData.body}
            onChange={handleJokeFormChange}
            multiline
            rowsMax={4}
            className={classes.newJokeFormField}
          />

          <IconButton
            aria-label="Post Dad Joke"
            title="Post Dad Joke"
            type='submit'
            className={classes.postJokeButton}
          >
            <PostAddIcon fontSize="large" />
          </IconButton>
        </Box>

        <Dropzone onDrop={handleFileUpload}>
          {({getRootProps, getInputProps}) => (
            <section className={classes.dropzone}>
              <Button {...getRootProps()} className={classes.dropzoneButton}>
                <input {...getInputProps()} />
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='body2' className={classes.dropzoneText}>
                      Click or drag 'n' drop a 'dad meme' here to upload!
                    </Typography>
                  </Grid>
                  {newJokeFormData.image !== '' &&
                    <Grid item xs={12}>
                      <Typography variant='subtitle2'>
                        Upload: {newJokeFormData.image.name}
                      </Typography>
                    </Grid>
                  }
                </Grid>
              </Button>
            </section>
          )}
        </Dropzone>

      </form>
    </Card>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewJokeForm)