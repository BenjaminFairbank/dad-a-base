import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'
// import IconButton from '@material-ui/core/IconButton'

// import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import { makeStyles } from '@material-ui/core/styles'

import { GiphyFetch } from "@giphy/js-fetch-api"
import { Carousel } from "@giphy/react-components"

// import giphyBadge from '../../../../assets/images/Poweredby_100px_Badge.gif'
import poweredByGiphy from '../../../../assets/images/PoweredBy_640_Horizontal_Light-Backgrounds_With_Logo.gif'

const useStyles = makeStyles((theme) => ({
  textField: {
    display: 'inline-flex',
    flex: 1,
  },
  form: {
    display: 'flex',
    paddingBottom: 8
  },
  searchButton: {
    margin: '0 5px'
  },
  imageWrapper: {
    textAlign: 'center',
    overflow: 'hidden',
  },
  poweredByGiphy: {
    margin: 'auto',
    maxWidth: 300,
    paddingTop: 16,
  },
  giphyBadge: {
    height: 48
  },
  carouselWrapper: {
    height: 222,
  },
}))

const GiphySearch = props => {
  const classes = useStyles()

  const [searchFormData, setSearchFormData] = useState('')
  // const [searchEntry, setSearchEntry] = useState('')

  const handleSearchFormChange = event => {
    setSearchFormData(event.currentTarget.value)
  }
  
  // const handleSearchSubmit = event => {
  //   event.preventDefault()
  //   if (searchFormData !== '') {
  //     setSearchEntry(searchFormData)
  //   }
  // }

  const giphyFetch = new GiphyFetch("W0ODXcTTd7kGkt0sFJz7KaAdqxzwB4ie")

  const CarouselDemo = ({ onGifClick }) => {
    const fetchGifs = (offset) => giphyFetch.search(searchFormData, { offset, limit: 10 });
    return (
      <Carousel
        onGifClick={onGifClick}
        fetchGifs={fetchGifs}
        gifHeight={200}
        gutter={6}
      />
    )
  }

  return (
    <>
      <div className={classes.form}>
        <TextField
          label="Search for GIFs"
          placeholder="Enter search terms"
          value={searchFormData}
          onChange={handleSearchFormChange}
          className={classes.textField}
        />
      </div>
      {searchFormData !==  '' &&
        <div className={classes.carouselWrapper}>
          <CarouselDemo
            onGifClick={(gif, event) => {
              event.preventDefault()
              props.setFormData({
                ...props.formData,
                gif_url: gif.id
              })
              props.handleGifSearchClose()
            }}
          />
        </div>
      }
      <div className={classes.imageWrapper}>
        <img
          src={poweredByGiphy}
          className={classes.poweredByGiphy}
        ></img>
      </div>
    </>
  )
}

export default GiphySearch


// {searchFormData === '' &&
// <IconButton
//   className={classes.searchButton}
//   disabled
// >
//   <SearchRoundedIcon />
// </IconButton>
// }
// {searchFormData !== '' &&
// <IconButton
//   className={classes.searchButton}
//   type="submit"
// >
//   <SearchRoundedIcon />
// </IconButton>
// }
// <img
// src={giphyBadge}
// className={classes.giphyBadge}
// ></img>