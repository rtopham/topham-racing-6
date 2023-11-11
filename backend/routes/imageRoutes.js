import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getAllImages,
  getImage,
  uploadImage,
  deleteImage
} from '../controllers/imageController.js'

const router = express.Router()

router.route('/').get(getAllImages).post(protect, uploadImage)
router.route('/:key').get(getImage)
router.route('/:id').delete(protect, deleteImage)
//router.route('/all').get(getAllRaces)
//router.route('/last-race').get(getLastRace)

export default router
