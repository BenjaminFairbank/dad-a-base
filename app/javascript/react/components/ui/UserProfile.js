import React, { useState } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CropSharpIcon from '@material-ui/icons/CropSharp'

import { withStyles } from '@material-ui/core/styles'
import useStyles from '../../styles/userProfileStyles'

import { displayAlertMessage } from '../../modules/alertMessage'

import ReactCropper from './ReactCropper'

const CssTextField = withStyles((theme) => ({
  root: {
    marginTop: 5,
    width: '100%',
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
  },
}))(TextField)

const UserProfile = props => {
  const classes = useStyles()

  const initialUserData = {
    user_name: props.user.user_name,
    email: props.user.email,
    about_me: props.user.about_me || '',
    profile_photo: ''
  }

  const [editingMode, setEditingMode] = useState(false)
  const [updateUserFormData, setUpdateUserFormData] = useState(initialUserData)
  const [updating, setUpdating] = useState(false)

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleEditClick = () => {
    setEditingMode(!editingMode)
    setUpdateUserFormData(initialUserData)
  }

  const handleUserFormChange = event => {
    setUpdateUserFormData({
      ...updateUserFormData,
      [event.currentTarget.name]: event.target.value
    })
  }

  const handleFileUpload = acceptedFiles => {
    setUpdateUserFormData({
      ...updateUserFormData,
      profile_photo: acceptedFiles[0]
    })
  }

  const updateUser = (id, userData) => {
    let formPayload = new FormData()
    formPayload.append('user[email]', userData.email)
    formPayload.append('user[user_name]', userData.user_name)
    formPayload.append('user[about_me]', userData.about_me)
    if (userData.profile_photo !== '') {
      formPayload.append('user[profile_photo]', userData.profile_photo)
    }

    fetch(`/api/v1/users/${id}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: formPayload,
      headers: {
        'Accept': 'application/json',
        'Accept': 'image/jpeg'
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
        props.setUser(body)
        setEditingMode(false)
      } else {
        props.displayAlertMessage(body.error)
      }
      setUpdating(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const changeInForm = () => {
    return (
      props.user.email !== updateUserFormData.email ||
      props.user.user_name !== updateUserFormData.user_name ||
      props.user.about_me !== updateUserFormData.about_me ||
      updateUserFormData.profile_photo !== ''
    )
  }

  const updateUserSubmitHandler = event => {
    event.preventDefault()
    setUpdating(true)
    updateUser(props.user.id, updateUserFormData)
  }

  return (
    <Card className={classes.profileCard} elevation={3}>
      <Typography
        variant='h6'
        className={classes.userName}
      >
        {props.user.user_name}
        {props.user.id === props.currentUser.id &&
          <IconButton className={classes.editButton} onClick={handleEditClick}>
            <EditOutlinedIcon size="large"/>
          </IconButton>
        }
      </Typography>
      {updating && <Box className={classes.updatingBox}><CircularProgress color="secondary" /></Box>}
      {!editingMode &&
        <Box className={classes.profileCardContents}>
          {props.user.profile_photo && props.user.profile_photo.url &&
            <Box className={classes.containerBox}>
              <Avatar
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
      }
      {editingMode &&
        <Card className={classes.editingCard}>
          <form className={classes.editingForm} onSubmit={updateUserSubmitHandler}>

            <Box>
              <CssTextField
                label="Email"
                type="text"
                name="email"
                onChange={handleUserFormChange}
                value={updateUserFormData.email}
              />
            </Box>
            <Box>
              <CssTextField
                label="User Name"
                type="text"
                name="user_name"
                onChange={handleUserFormChange}
                value={updateUserFormData.user_name}
                placeholder='(15 character maximum)'
              />
            </Box>

            <Box>
              <CssTextField
                label="About Me"
                type="text"
                name="about_me"
                onChange={handleUserFormChange}
                value={updateUserFormData.about_me}
                multiline
                rowsMax={4}
                placeholder='(255 character maximum)'
              />
            </Box>

            <Box className={classes.dropzoneCropperBox}>
              <Dropzone onDrop={handleFileUpload}>
                {({getRootProps, getInputProps}) => (
                  <section className={classes.dropzone}>
                    <Button {...getRootProps()} className={classes.dropzoneButton}>
                      <input {...getInputProps()} />
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant='body2' className={classes.dropzoneText}>
                            Click or drag new image here to update your profile photo!
                          </Typography>
                        </Grid>
                        {updateUserFormData.profile_photo !== '' &&
                          <Grid item xs={12}>
                            <Typography variant='subtitle2'>
                              Upload: {updateUserFormData.profile_photo.name}
                            </Typography>
                          </Grid>
                        }
                      </Grid>
                    </Button>
                  </section>
                )}
              </Dropzone>
              {updateUserFormData.profile_photo !== '' &&
                <IconButton
                  aria-label="Crop Upload"
                  title="Crop Upload"
                  className={classes.cropButton}
                  onClick={handleOpen}
                >
                  <CropSharpIcon />
                </IconButton>
              }
            </Box>
            {changeInForm() &&
              <Button
                type='submit'
                className={classes.submitUpdateButton}
              >
                Update My Profile
              </Button>
            }
            {!changeInForm() &&
              <Button
                disabled
                className={classes.submitUpdateButton}
              >
                Update My Profile
              </Button>
            }
          </form>
        </Card>
      }
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
              formData={updateUserFormData}
              setFormData={setUpdateUserFormData}
              handleClose={handleClose}
              userForm={true}
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
    assignCurrentUser: (userData) => dispatch(assignCurrentUser(userData)),
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)