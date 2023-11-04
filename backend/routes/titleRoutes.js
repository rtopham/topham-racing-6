import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getAllTitles } from '../controllers/titleController.js'

const router = express.Router()

router.route('/').get(getAllTitles)
//router.route('/all').get(getAllRaces)
//router.route('/last-race').get(getLastRace)

export default router
