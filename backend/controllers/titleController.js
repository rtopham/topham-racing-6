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

// @desc Get Title By Id
// @route GET /api/titles
// @access Public

const getTitleById = asyncHandler(async (req, res) => {
  const titleId = req.params.id

  const title = await Title.findById(titleId)

  res.status(200).json(title)
})

// @desc    Create Title
// @route   POST /api/titles
// @access  private

const createTitle = asyncHandler(async (req, res) => {
  const { title, title_date, category } = req.body
  if (!title || !title_date || !category) {
    res.status(400)
    throw new Error('Please provide full title details')
  }
  const newTitle = await Title.create({
    title,
    title_date,
    category,
    postedBy: req.user.id
  })

  res.status(201).json(newTitle)
})

// @desc    Update Title
// @route   PUT /api/titles/:id
// @access  private

const updateTitle = asyncHandler(async (req, res) => {
  const title = await Title.findById(req.params.id)

  if (!title) {
    res.status(404)
    throw new Error('Title not found')
  }

  if (title.postedBy.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTitle = await Title.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedTitle)
})

// @desc Delete Title
// @route DELETE /api/titles/:id
// @access Private

const deleteTitle = asyncHandler(async (req, res) => {
  const title = await Title.findById(req.params.id)
  if (title) {
    await Title.deleteOne({ _id: title._id })
    res.status(200).json({ message: 'Title deleted successfully' })
  } else {
    res.status(404)
    throw new Error('Title not found')
  }
})

export { getAllTitles, getTitleById, createTitle, updateTitle, deleteTitle }
