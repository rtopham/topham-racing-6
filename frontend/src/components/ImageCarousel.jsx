import { Carousel } from 'react-bootstrap'

const ImageCarousel = ({ images }) => {
  return (
    <Carousel className='mb-3' slide fade interval={null}>
      {images.map((image, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                height: '50vh',
                overflow: 'hidden'
              }}
              className='d-block w-100'
              src={image}
              alt={index}
            />
            {/*  <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}
export default ImageCarousel
