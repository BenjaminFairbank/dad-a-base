import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'inline-block',
    padding: 10,
    boxSizing: 'border-box',
  },
  buttonWrapper: {
    marginTop: 20,
    textAlign: 'center'
  },
  button: {
    margin: '0 25px'
  }
}))

export default useStyles