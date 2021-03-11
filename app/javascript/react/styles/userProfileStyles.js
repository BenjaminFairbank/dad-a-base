import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  profileCard: {
    background: theme.palette.tertiary.main,
    borderRadius: 8,
    marginTop: 10,
    padding: 16,
  },
  userName: {
    textAlign: 'center',
    marginBottom: 16,
  },
  editButton: {
    marginLeft: 16,
  },
  updatingBox: {
    textAlign: 'center',
    marginBottom: 16,
  },
  profileCardContents: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  containerBox: {
    textAlign: 'center',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  avatar: {
    borderRadius: 8,
    width: 300,
    objectFit: 'cover',
    objectPosition: 'center',
    marginRight: 16,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      minWidth: '300px',
      height: '100%',
      marginBottom: 16,
    },
    [theme.breakpoints.up('sm')]: {
      height: 300,
    },
  },
  infoCard: {
    padding: 16,
    borderRadius: 8,
    background: theme.palette.quaternary.main,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: 300,
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      minWidth: '300px',
      height: '100%',
    },
  },
  title: {
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 16
  },
  aboutMe: {
    textIndent: 16,
    whiteSpace: 'pre-line',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  },
  editingCard: {
    width: '100%',
    borderRadius: 8,
    padding: 16,
    background: theme.palette.quaternary.main
  },
  editingForm: {
    textAlign: 'center',
  },
  dropzoneCropperBox: {
    marginTop: 16,
    display: 'flex',
  },
  dropzone: {
    display: 'inline-flex',
    flex: 1,
    textAlign: 'center',
    borderStyle: 'dashed',
    borderColor: theme.palette.quinary.main,
    borderRadius: 5,
  },
  dropzoneButton: {
    '&:focus': {
      outline: 'none',
    },
    width: '100%'
  },
  dropzoneText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    padding: '10px 0',
  },
  cropButton: {
    height: 48,
    width: 48,
  },
  submitUpdateButton: {
    marginTop: 16,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
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