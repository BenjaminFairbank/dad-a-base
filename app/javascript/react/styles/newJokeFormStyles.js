import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  newJokeFormCard: {
    borderRadius: 8,
    background: theme.palette.tertiary.main,
    margin: '10px 0'
  },
  newJokeForm: {
    padding: '4px 8px 16px 16px'
  },
  newJokeFormBodyBox: {
    display: 'flex',
  },
  newJokeFormField: {
    display: 'inline-flex',
    flex: 1,
  },
  postJokeButton: {
    height: 59,
    width: 59,
  },
  dropzoneCropperBox: {
    display: 'flex',
  },
  dropzone: {
    display: 'inline-flex',
    flex: 1,
    textAlign: 'center',
    borderStyle: 'dashed',
    borderColor: theme.palette.quaternary.main,
    borderRadius: 5,
    marginRight: 8,
  },
  dropzoneButton: {
    '&:focus': {
      outline: 'none',
    },
    width: '100%'
  },
  dropzoneText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    padding: '10px 0',
  },
  cropButton: {
    height: 48,
    width: 48,
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