import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  warning: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    paddingTop: 15,
  },
  imgBox: {
    display:'flex',
    justifyContent:'center',
    marginTop: 20,
  },
  imgCard: {
    width: 300,
    height: 277,
  },
  img: {
    height: 277
  },
  text: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    padding: '10px 16px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid',
    outline: 'none',
    boxShadow: theme.shadows[5],
    borderColor: theme.palette.primary.main,
    padding: '10px 25px',
    width: 300,
    textAlign: 'center',
    borderRadius: 8,
  },
  gridContainer: {
    textAlign: 'center',
    paddingBottom: 25
  },
  warningGridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningBox: {
    padding: 16
  },
}))

export default useStyles