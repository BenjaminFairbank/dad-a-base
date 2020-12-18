import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  primary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.primary.main
  },
  secondary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.secondary.main
  },
  tertiary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.tertiary.main
  },
  quaternary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quaternary.main
  },
  quinary: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quinary.main
  },
  primary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.primary2.main
  },
  secondary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.secondary2.main
  },
  tertiary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.tertiary2.main
  },
  quaternary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quaternary2.main
  },
  quinary2: {
    textAlign: 'center',
    height: 50,
    width: 100,
    background: theme.palette.quinary2.main
  },
  floatLeft: {
    float: 'left',
  },
  floatRight: {
    float: 'right',
  },
  tightBox: {
    margin: 'auto',
    width: 200,
  },
  textStyles: {
    padding: 20,
  },
  colorThemes: {
    textAlign: 'center',
  },
  jokeCard: {
    borderRadius: 8,
    marginBottom: 10,
    margin: 'auto',
    width: '100%',
    background: theme.palette.tertiary.main,
  },
  media: {
    padding: '8px 0'
  },
  styleGuide: {
    textAlign: 'center',
    paddingTop: 20,
  },
  cardHeader: {
    paddingBottom: 0,
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
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardActions: {
    paddingTop: 0
  },
  ratingBox: {
    padding: '8px 8px 0 0',
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  ratingInnerBox: {
    display: 'flex',
  },
  rating: {
    marginTop: 6,
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
  },
  commentsSectionIndicator: {
    marginLeft: 'auto',
  },
  avatar: {
    height: 50,
    width: 50,
  },
  commentHeader: {

  },
  commentAvatar: {
    height: 40,
    width: 40,
  },
  commentCard: {
    marginTop: 10,
    background: theme.palette.quaternary.main
  },
  image: {
    maxWidth: '100%'
  },
  rateText: {
    margin: '0 10px'
  },
  commentsSection: {
    paddingTop: 0,
  },
  hoverRating: {
    width: 240,
    display: 'flex',
    alignItems: 'center',
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
  jokeCardContent: {
    padding: '8px 16px 0 16px'
  },
  newJokeFormCard: {
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
  dropzone: {
    textAlign: 'center',
    borderStyle: 'dashed',
    borderColor: theme.palette.quaternary.main,
    marginRight: 8,
    padding: '10px 0'
  },
  dropzoneText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  }
}))

export default useStyles