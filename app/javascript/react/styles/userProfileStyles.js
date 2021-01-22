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
}))

export default useStyles