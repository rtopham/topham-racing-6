import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getAllImages, getImage } from '../controllers/imageController.js'

const router = express.Router()

router.route('/').get(getAllImages)
router.route('/:key').get(getImage)
//router.route('/all').get(getAllRaces)
//router.route('/last-race').get(getLastRace)

export default router
