import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getStravaProfile,
  getStravaActivity,
  updateStravaTokens
} from '../controllers/stravaController.js'

const router = express.Router()

router.route('/').get(getStravaProfile).put(updateStravaTokens)
router.route('/activity').get(getStravaActivity)
//router.route('/last-race').get(getLastRace)

export default router
