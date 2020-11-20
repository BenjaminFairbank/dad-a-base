import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: 'True Dad Joke',
  1: 'Mildy Mirthful',
  1.5: 'Mirthful',
  2: 'Knee-Slapper',
  2.5: 'Knee-Slapper+',
  3: 'Side-Splitter',
  3.5: 'Side-Splitter+',
  4: 'Humdinger',
  4.5: 'Humdinger+',
  5: 'The Bee\'s Knees',
};

const useStyles = makeStyles({
  root: {
    width: 240,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function HoverRating() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
  );
}