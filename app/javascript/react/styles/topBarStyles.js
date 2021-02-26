import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.tertiary.main,
    },
    '&:focus': {
      color: 'white',
    },
    textDecoration: 'none',
  },
  midSpace: {
    flexGrow: 1,
  },
  button: {
    marginLeft: 15,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  subtitleBox: {
    height: 30,
    width: '100%',
    background: theme.palette.primary.main,
  },
  subtitleText: {
    paddingLeft: 30,
  },
}))

export default useStyles