import asyncHandler from '../middleware/asyncHandler.js'
import Title from '../models/titleModel.js'

// @desc Get All Titles
// @route GET /api/titles/
// @access Public

const getAllTitles = asyncHandler(async (req, res) => {
  const userId = req.query.userId

  const titles = await Title.find({ postedBy: userId }).sort({ title_date: -1 })

  res.status(200).json(titles)
})

export { getAllTitles }
