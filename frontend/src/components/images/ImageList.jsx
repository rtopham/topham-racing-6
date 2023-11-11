import { Card } from 'react-bootstrap'
import DeleteRecordButton from '../DeleteRecordButton'
import { Icon, TRASH_ICON, INFO_ICON } from '../icons'
const ImageList = ({ images, deleteImageHandler }) => {
  const imgUrl = '/api/images/'

  return (
    <>
      {images.length === 0 ? (
        <>
          <h6>
            <Icon icon={INFO_ICON} /> No images uploaded yet.
          </h6>
        </>
      ) : (
        <>
          {images.map((image) => {
            return (
              <Card
                key={image._id}
                className='float-start me-2'
                style={{
                  objectFit: 'cover',
                  borderRadius: '55',
                  width: '20vw',
                  height: '20vh'
                }}
              >
                <Card.Img
                  style={{
                    objectFit: 'cover',
                    borderRadius: '55',
                    width: '20vw',
                    height: '20vh'
                  }}
                  src={`${imgUrl}${image.filename}`}
                />
                <Card.ImgOverlay className='text-white'>
                  {image.filename}{' '}
                  <DeleteRecordButton
                    className='float-end'
                    title='Delete Image'
                    icon={TRASH_ICON}
                    recordId={image._id}
                    confirmationText='delete image'
                    confirmationAction={deleteImageHandler}
                  />
                </Card.ImgOverlay>
              </Card>
            )
          })}
        </>
      )}
    </>
  )
}

export default ImageList
