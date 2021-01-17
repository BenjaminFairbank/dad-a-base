import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  jokeCard: {
    borderRadius: 8,
    marginBottom: 10,
    margin: 'auto',
    width: '100%',
    background: theme.palette.tertiary.main,
  },
  cardHeader: {
    paddingBottom: 0,
    height: 82
  },
  avatar: {
    height: 50,
    width: 50,
    objectFit: 'cover',
    objectPosition: 'center',
  },
  userNameTextWrapper: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right'
    },
    overflow: 'hidden',
    height: 28
  },
  userName: {
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&:focus': {
      color: 'white',
    },
    textDecoration: 'none',
  },
  timestamp: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right',
    },
  },
  notYetRated: {
    padding: '8px 8px 0 0',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right',
      padding: '0 16px',
    },
  },
  ratingBox: {
    padding: '8px 8px 0 0',
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.only('xs')]: {
      padding: '0 16px'
    },
  },
  ratingInnerBox: {
    display: 'flex',
  },
  rating: {
    paddingTop: 6,
    display: 'inline-flex',
  },
  ratingCount: {
    paddingLeft: 8,
    display: 'inline-flex',
    fontSize: 22,
  },
  ratingLabel: {
    marginTop: 0,
    textAlign: 'right',
    [theme.breakpoints.only('xs')]: {
      paddingTop: 6
    },
  },
  jokeCardContent: {
    padding: '8px 16px 0 16px'
  },
  jokeBody: {
    paddingTop: 3,
    whiteSpace: 'pre-line',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
  jokeUpdateField: {
    width: '100%',
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        lineHeight: 1.5
      }
    }
  },
  dropzone: {
    textAlign: 'center',
    borderStyle: 'dashed',
    borderColor: theme.palette.quaternary.main,
    borderRadius: 5,
    margin: '8px 16px 0 16px'
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
  dropzoneTextWithImage: {
    textAlign: 'center',
    color: theme.palette.secondary.main
  },
  dropzoneUploadTextWithImage: {
    textAlign: 'center',
  },
  dropzoneButtonWithImage: {
    borderRadius: 0
  },
  media: {
    padding: '8px 0'
  },
  commentFormBox: {
    padding: '0 8px 0 16px',
  },
  commentForm: {
    display: 'flex'
    // to overide foundation css:
    // '& .MuiInputBase-root': {
    //   '& .MuiInputBase-input': {
    //     height: 0,
    //     minHeight: 0,
    //     boxShadow: 'none',
    //     '&:focus': {
    //       height: 19,
    //       border: 0,
    //       background: 'none',
    //     }
    //   },
    // },
  },
  commentFormField: {
    display: 'inline-flex',
    flex: 1,
  },
  postCommentButton: {
    height: 59,
    width: 59,
  },
  cardActions: {
    paddingTop: 0,
    [theme.breakpoints.only('xs')]: {
      paddingBottom: 0
    },
  },
  cardActions2: {
    paddingTop: 0,
  },
  rateText: {
    margin: '0 8px'
  },
  hoverRating: {
    width: 240,
    display: 'flex',
    alignItems: 'center',
  },
  editDeleteJokeButtonBox: {
    textAlign: 'right',
    paddingRight: 8,
  },
  updatingText: {
    display: 'inline-flex',
    marginRight: 16,
    marginLeft: 10
  },
  spinner: {
    marginLeft: 22,
    marginTop: 8,
    float: 'left'
  },
  commentsSectionIndicator: {
    marginLeft: 'auto',
    paddingRight: 5,
  },
  expand: {
    padding: 6,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    padding: 6,
    transform: 'rotate(180deg)',
  },
  commentsSection: {
    paddingTop: 0,
  },
}))

export default useStyles