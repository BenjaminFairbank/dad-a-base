import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  commentCard: {
    borderRadius: 8,
    marginTop: 10,
    background: theme.palette.quaternary.main
  },
  commentCardHeader: {
    paddingBottom: 0,
  },
  commentAvatar: {
    height: 40,
    width: 40,
    objectFit: 'cover',
    objectPosition: 'center',
  },
  commentUserNameTextWrapper: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right',
    },
  },
  commentUserName: {
    color: 'white',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&:focus': {
      color: 'white',
    },
    textDecoration: 'none',
  },
  commentTimestamp: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right',
    },
  },
  commentActionsBox: {
    padding: '8px 8px 0 0',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right',
      paddingRight: '0 16px 0 0'
    },
  },
  commentUpdateForm: {
    display: 'flex',
  },
  commentUpdateField: {
    paddingTop: 10,
    display: 'inline-flex',
    flex: 1,
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        lineHeight: 1.5
      }
    }
  },
  commentUpdateButton: {
    height: 44,
    width: 44,
  },
  commentBody: {
    paddingTop: 13,
    paddingBottom: 7,
    whiteSpace: 'pre-line',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
  commentCardContent: {
    paddingTop: 0
  },
}))

export default useStyles