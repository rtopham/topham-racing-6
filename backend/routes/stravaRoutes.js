import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getStravaProfile,
  updateStravaTokens
} from '../controllers/stravaController.js'

const router = express.Router()

router.route('/').get(getStravaProfile).put(updateStravaTokens)
//router.route('/all').get(getAllRaces)
//router.route('/last-race').get(getLastRace)

export default router
