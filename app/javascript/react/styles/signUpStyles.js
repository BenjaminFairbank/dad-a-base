import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '8px 0',
    textAlign: 'center',
  },
  signUpFormCard: {
    borderRadius: 8,
    margin: '10px auto',
    textAlign: 'center',
    background: theme.palette.tertiary.main,
    padding: '10px 25px',
    width: 300,
  },
  button: {
    marginTop: 18,
    background: theme.palette.quaternary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    marginBottom: 15,
  },
  dropzone: {
    textAlign: 'center',
    borderStyle: 'dashed',
    borderColor: theme.palette.tertiary.main,
    borderRadius: 5,
    marginTop: 16,
  },
  dropzoneButton: {
    '&:focus': {
      outline: 'none',
    },
    width: '100%',
    overflow: 'hidden',
  },
  dropzoneText: {
    fontWeight: 'bold',
    padding: '10px 0',
  },
  fileName: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
  passwordBox: {
    display: 'flex',
  },
  passwordField: {
    display: 'inline-flex',
    flex: 1,
  },
  passwordVisButton: {
    padding: 0,
    marginTop: 20,
    height: 30,
    width: 30,
  },
  icon: {
    marginTop: 1,
  },
  alert: {
    color: theme.palette.primary.main
  },
  aboutMe: {
    marginTop: 0
  },
  cropButton: {
    marginTop: 8
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '95%',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[5],
    borderRadius: 8,
    padding: theme.spacing(2, 4, 3),
  },
}))

export default useStyles