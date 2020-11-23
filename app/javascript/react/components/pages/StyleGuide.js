import React from 'react'
import {
  Typography,
  Box,
  Container,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  Collapse,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from '../../styles/styleGuideStyle'
import clsx from 'clsx';
import HoverRating from '../ui/HoverRating'
import { withStyles } from '@material-ui/core/styles'

const CssTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.quaternary.main,
    },
  },
}))(TextField);

const StyleGuide = props => {
  const classes = useStyles()

  const [comment, setComment] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.background}>

      <div className={classes.styleGuide}>
        <Typography variant="h5">
          Style Guide
        </Typography>
      </div>
      <div className={classes.textStyles}>
        <Typography variant="h4">
          Headers: Stalinist One
        </Typography>
        <Typography variant="subtitle1">
          Subtitles: Goldman
        </Typography>
        <Typography variant="caption">
          Else: Roboto
        </Typography>
      </div>

      <Container>
        <Card elevation={3} className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            disableTypography
            avatar={
              <Avatar aria-label="profile-pic" className={classes.avatar}>
                <img className={classes.image} src='https://i.imgur.com/dOx2wRl.jpg' />
              </Avatar>
            }
            action={
              <div className={classes.rating}>
                <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
              </div>
            }
            title={<Typography variant='subtitle1'>OneBadDad</Typography>}
            subheader={
              <Typography variant='subtitle1' color="textSecondary">
                September 14, 2016
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              What do you guys think?  Good? Bad? or Terrible?
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            className={classes.media}
            image="https://i.pinimg.com/564x/4a/cd/04/4acd04c3659f6752e9887e7e00eec72d.jpg"
            title="meme"
          />
          <div className={classes.formContainer}>
            <form className={classes.form} noValidate autoComplete="off">
              <CssTextField
                id="custom-css-standard-input"
                label="Leave a Comment"
                placeholder="Your comment"
                multiline
                value={comment}
                onChange={handleChange}
              />
            </form>
          </div>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Typography className={classes.rateText} variant='subtitle1'>
              Rate:
            </Typography>
            <HoverRating />
            <Typography className={classes.commentsSectionIndicator} variant='subtitle1'>
              View comments:
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.commentsSection}>
              <Card className={classes.commentCard}>
                <CardHeader
                  className={classes.commentHeader}
                  disableTypography
                  avatar={
                    <Avatar aria-label="profile-pic" className={classes.commentAvatar}>
                      <img className={classes.image} src='https://i.imgur.com/dOx2wRl.jpg' />
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={<Typography variant='subtitle2'>OneBadDad</Typography>}
                  subheader={
                    <Typography variant='subtitle2' color="textSecondary">
                      September 14, 2016
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    No one? It's so quiet in here!
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.commentCard}>
                <CardHeader
                  className={classes.commentHeader}
                  disableTypography
                  avatar={
                    <Avatar aria-label="profile-pic" className={classes.commentAvatar}>
                      <img className={classes.image} src='https://i.imgur.com/dOx2wRl.jpg' />
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={<Typography variant='subtitle2'>OneBadDad</Typography>}
                  subheader={
                    <Typography variant='subtitle2' color="textSecondary">
                      September 14, 2016
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    CAN ANYONE HEAR ME!
                  </Typography>
                </CardContent>
              </Card>
            </CardContent>
          </Collapse>
        </Card>
      </Container>

      <div className={classes.colorThemes}>
        <Typography variant="h4">
          Themes
        </Typography>
        <div className={classes.tightBox}>
          <div className={classes.floatLeft}>
            <Box className={classes.primary}>
              <Typography variant="caption">
                primary
              </Typography>
            </Box>
            <Box className={classes.secondary}>
              <Typography variant="caption">
                secondary
              </Typography>
            </Box>
            <Box className={classes.tertiary}>
              <Typography variant="caption">
                tertiary
              </Typography>
            </Box>
            <Box className={classes.quaternary}>
              <Typography variant="caption">
                quaternary
              </Typography>
            </Box>
            <Box className={classes.quinary}>
              <Typography variant="caption">
                quinary
              </Typography>
            </Box>
          </div>
          <div className={classes.floatRight}>
            <Box className={classes.primary2}>
              <Typography variant="caption">
                primary
              </Typography>
            </Box>
            <Box className={classes.secondary2}>
              <Typography variant="caption">
                secondary
              </Typography>
            </Box>
            <Box className={classes.tertiary2}>
              <Typography variant="caption">
                tertiary
              </Typography>
            </Box>
            <Box className={classes.quaternary2}>
              <Typography variant="caption">
                quaternary
              </Typography>
            </Box>
            <Box className={classes.quinary2}>
              <Typography variant="caption">
                quinary
              </Typography>
            </Box>
          </div>
        </div>
      </div>

    </div>
  )
}

export default StyleGuide