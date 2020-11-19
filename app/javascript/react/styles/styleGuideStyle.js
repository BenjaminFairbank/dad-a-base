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
  background: {
    background: theme.palette.secondary.main,
    paddingBottom: 300,
  },
  card: {
    borderRadius: 8,
    marginBottom: 25,
    margin: 'auto',
    width: '100%',
    background: theme.palette.tertiary.main,
  },
  media: {

  },
  styleGuide: {
    textAlign: 'center',
    paddingTop: 20,
  },
  cardHeader: {
    paddingBottom: 0,
  },
  formContainer: {
    padding: '5px 10px 0 10px',
  },
  form: {
    '& .MuiTextField-root': {
      width: '100%',
      '& .MuiInputBase-root': {
        '& .MuiInputBase-input': {
          height: 0,
          minHeight: 0,
          boxShadow: 'none',
          '&:focus': {
            height: 19,
            border: 0,
            background: 'none',
          }
        },
      },
    },
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
    paddingTop: 5,
  },
  rating: {
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  commentsSectionIndicator: {
    marginLeft: 'auto',
  },
  avatar: {
    height: 50,
    width: 50,
  },
}))

export default useStyles