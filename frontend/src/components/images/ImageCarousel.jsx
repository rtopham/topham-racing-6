import { Carousel } from 'react-bootstrap'

const ImageCarousel = ({ images }) => {
  const imgUrl = '/api/images/'

  console.log(window.innerHeight)

  let height = '50vh'

  if (window.innerHeight < 1000) height = '75vh'

  return (
    <Carousel className='mb-3' fade interval={null}>
      {images.map((image, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              id={image._id}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                height: height,
                overflow: 'hidden'
              }}
              className='d-block w-100'
              //src={image}
              src={`${imgUrl}${image.filename}`}
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
