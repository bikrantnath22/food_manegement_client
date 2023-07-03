import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Carousels() {
    
  return (
    <>
    <Carousel showArrows={true} showThumbs={false} autoPlay={true} showStatus={false}>
                <div className=' '>
                    <img style={{
                        width: '100%',
                        borderRadius:'20px',
                        objectFit:'cover'
                    }} src="https://assets.grab.com/wp-content/uploads/sites/8/2021/06/21202033/Hotdeals-EDM-June2021-GF-GM-1950x700-1.jpg"/>
                    
                </div>
                <div className=''>
                    <img style={{
                        width: '100%',
                        borderRadius:'20px',
                        objectFit:'cover'
                    }} src="https://assets.grab.com/wp-content/uploads/sites/8/2021/06/21202033/Hotdeals-EDM-June2021-GF-GM-1950x700-1.jpg" />
                    
                </div>
                
            </Carousel>
    </>
  )
}

export default Carousels