import asyncHandler from '../middleware/asyncHandler.js'
import Image from '../models/imageModel.js'
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

export { getAllImages, getImage }
