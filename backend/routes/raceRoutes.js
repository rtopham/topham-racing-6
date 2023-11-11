import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getRaces,
  getAllRaces,
  getLastRace,
  getRaceById,
  createRace,
  updateRace,
  deleteRace
} from '../controllers/raceController.js'

const router = express.Router()

router.route('/').get(getRaces).post(protect, createRace)
router.route('/all').get(getAllRaces)
router.route('/last-race').get(getLastRace)
router
  .route('/:id')
  .get(getRaceById)
  .put(protect, updateRace)
  .delete(protect, deleteRace)

export default router
