import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getRaces,
  getAllRaces,
  getLastRace
} from '../controllers/raceController.js'

const router = express.Router()

router.route('/').get(getRaces)
router.route('/all').get(getAllRaces)
router.route('/last-race').get(getLastRace)

export default router
