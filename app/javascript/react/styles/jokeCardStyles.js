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
  email: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right',
    },
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
    paddingTop: 0
  },
  rateText: {
    margin: '0 10px'
  },
  hoverRating: {
    width: 240,
    display: 'flex',
    alignItems: 'center',
  },
  commentsSectionIndicator: {
    marginLeft: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentsSection: {
    paddingTop: 0,
  },
}))

export default useStyles