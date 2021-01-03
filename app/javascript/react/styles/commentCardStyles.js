import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  commentCard: {
    marginTop: 10,
    background: theme.palette.quaternary.main
  },
  commentAvatar: {
    height: 40,
    width: 40,
    objectFit: 'cover',
    objectPosition: 'center',
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