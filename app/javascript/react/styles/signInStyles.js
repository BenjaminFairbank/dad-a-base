import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '8px 0',
    textAlign: 'center',
  },
  signInFormCard: {
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
}))

export default useStyles