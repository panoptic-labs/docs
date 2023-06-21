import React from "react"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import "./UpdatesPage.css"

const UpdatesPage = () => {

  return (
    <div className="updates-page">
      <div className="updates-carousel">
        <Carousel plugins={['arrows']}>
          <img src={imageOne} />
          <img src={imageTwo} />
          <img src={imageThree} />
        </Carousel>
      </div>
    </div>
  )
}

export default UpdatesPage