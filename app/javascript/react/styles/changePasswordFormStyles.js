import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  submitUpdateButton: {
    margin: '10px 8px 0 8px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
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
  warning: {
    color: theme.palette.primary.main,
  },
  text: {
    paddingTop: 8,
  },
  alert: {
    marginTop: 16,
    color: theme.palette.primary.main,
  },
}))

export default useStyles