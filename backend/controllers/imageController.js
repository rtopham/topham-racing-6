import asyncHandler from '../middleware/asyncHandler.js'
import Image from '../models/imageModel.js'
import path from 'path'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand
} from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'us-west-2'
})

// @desc Get All Images
// @route GET /api/images/
// @access Public

const getAllImages = asyncHandler(async (req, res) => {
  const userId = req.query.userId

  const images = await Image.find({ postedBy: userId })

  res.status(200).json(images)
})

// @desc Get Image
// @route GET /api/images/:key
// @access Public

const getImage = asyncHandler(async (req, res) => {
  const downloadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: process.env.AWS_FOLDER_NAME + req.params.key
  }

  const s3Object = await s3.send(new GetObjectCommand(downloadParams))

  s3Object.Body.pipe(res)
})

//@route    POST api/images
//@desc     Save Image Data to Database and handle upload to Amazon S3
//@access   Private

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400)
    throw new Error('No files uploaded')
  }

  const imageFile = req.files.image
  let imgUrl = ''

  const saveImage = async () => {
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 6; i += 1) {
      imgUrl += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    // Check to See if filename exists
    const existingImages = await Image.find({
      filename: { $regex: imgUrl }
    })

    if (existingImages.length > 0) saveImage()
    else {
      // Upload and save file
      const ext = path.extname(imageFile.name).toLowerCase()

      const newImage = {
        filename: imgUrl + ext,
        postedBy: req.user.id
      }

      //Upoload to AWS S3

      const fileContent = imageFile.data

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: process.env.AWS_FOLDER_NAME + imgUrl + ext,
        Body: fileContent
      }

      try {
        //Send to S3
        const data = await s3.send(new PutObjectCommand(uploadParams))
        //Save Image record to Database

        await Image.create(newImage)

        res.status(201).json({ message: 'Image uploaded successfully' })
      } catch (err) {
        res.status(400)
        throw new Error('Unable to upload image')
      }
    }
  }
  saveImage()
})

const deleteImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id)
  if (image) {
    try {
      //Delete from S3
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: process.env.AWS_FOLDER_NAME + image.filename
      }

      const response = await s3.send(new DeleteObjectCommand(deleteParams))

      //Delete Image Record from Database

      await Image.deleteOne({ _id: image._id })
      res.status(200).json({ message: 'Image deleted successfully' })
    } catch (error) {
      res.status(404)
      throw new Error('Image not found')
    }
  }
})

export { getAllImages, getImage, uploadImage, deleteImage }
