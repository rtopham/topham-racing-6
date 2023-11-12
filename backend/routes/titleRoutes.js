import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getAllTitles,
  createTitle,
  getTitleById,
  deleteTitle,
  updateTitle
} from '../controllers/titleController.js'

const router = express.Router()

router.route('/').get(getAllTitles).post(protect, createTitle)
router
  .route('/:id')
  .get(getTitleById)
  .put(protect, updateTitle)
  .delete(protect, deleteTitle)
//router.route('/all').get(getAllRaces)
//router.route('/last-race').get(getLastRace)

export default router
