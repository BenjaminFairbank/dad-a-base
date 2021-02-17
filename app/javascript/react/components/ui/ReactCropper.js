import React, { useState, useEffect } from 'react'
import Cropper from 'react-cropper'
import useStyles from '../../styles/reactCropperStyles'

import Button from '@material-ui/core/Button'

const ReactCropper = props => {
  const classes = useStyles()
  
  const [image, setImage] = useState('')
  const [cropper, setCropper] = useState('')

  const imageFormVar = props.userForm ? props.formData.profile_photo : props.formData.image

  const provideInitialImage = () => {
    const initialReader = new FileReader()
    initialReader.onload = () => {
      setImage(initialReader.result)
    };
    initialReader.readAsDataURL(imageFormVar);
  }

  useEffect(() => { provideInitialImage() }, [])

  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    var byteCharacters = atob(b64Data)
    var byteArrays = []
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize)
      var byteNumbers = new Array(slice.length)
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
      }
      var byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    var blob = new Blob(byteArrays, {type: contentType, endings: 'native'})
    return blob
  }

  const useCroppedImage = () => {
    const url = cropper.getCroppedCanvas().toDataURL()
    var block = url.split(";")
    var contentType = block[0].split(":")[1]
    var realData = block[1].split(",")[1]
    var blob = b64toBlob(realData, contentType)
    blob.lastModifiedDate = new Date()
    var file = new File([blob], imageFormVar.name)
    const field = props.userForm ? 'profile_photo' : 'image'
    props.setFormData({
      ...props.formData,
      [field]: file
    })
    props.handleClose()
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <Cropper
          style={{ height: '75vh', width: "100%", marginTop: '16px' }}
          initialAspectRatio={1}
          src={image}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.button}
          onClick={useCroppedImage}
        >
          Use Cropped Selection
        </Button>
        <Button
          className={classes.button}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default ReactCropper
