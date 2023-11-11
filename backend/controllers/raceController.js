import asyncHandler from '../middleware/asyncHandler.js'
import Race from '../models/raceModel.js'
import mongoose from 'mongoose'

// @desc Get All Races by User
// @route GET /api/races
// @access Public

const getRaces = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 5000
  const page = Number(req.query.pageNumber) || 1
  const sortBy = req.query.sortBy || '_id'
  const sortOrder = Number(req.query.sortOrder) || 1
  const userId = req.query.userId

  const count = await Race.countDocuments({ postedBy: userId })

  const races = await Race.aggregate([
    { $match: { postedBy: new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        race_name: 1,
        series: 1,
        race_date: 1,
        category: 1,
        location: 1,
        time: 1,
        rank: 1,
        loweritem: { $toLower: `$${sortBy}` }
      }
    },
    { $sort: { loweritem: sortOrder } },
    { $skip: pageSize * (page - 1) },
    { $limit: pageSize }
  ])

  //aggregate is used above instead of the following to ensure case insensitive alphabetical sorting
  /* const users = await User.find({})
    .sort({ [sortBy]: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1)) */

  res.status(200).json({ races, page, pages: Math.ceil(count / pageSize) })
})

// @desc Get All Races for User
// @route GET /api/races/all
// @access Public

const getAllRaces = asyncHandler(async (req, res) => {
  const userId = req.query.userId

  const races = await Race.find({ postedBy: userId }).sort({ race_date: -1 })

  res.status(200).json(races)
})

// @desc Get Last Race
// @route GET /api/races
// @access Public

const getLastRace = asyncHandler(async (req, res) => {
  const userId = req.query.userId

  const [race] = await Race.find({ postedBy: userId })
    .sort({ race_date: -1 })
    .limit(1)

  res.status(200).json(race)
})
// @desc Get Race By Id
// @route GET /api/races
// @access Public

const getRaceById = asyncHandler(async (req, res) => {
  const raceId = req.params.id

  const race = await Race.findById(raceId)

  res.status(200).json(race)
})

// @desc    Create Race
// @route   POST /api/races
// @access  private

const createRace = asyncHandler(async (req, res) => {
  const { race_name, series, race_date, location, rank, category, time } =
    req.body
  if (!race_name || !series || !race_date || !rank || !category || !time) {
    res.status(400)
    throw new Error('Please provide full face details')
  }
  const race = await Race.create({
    race_name,
    series,
    race_date,
    location,
    rank,
    category,
    time,
    postedBy: req.user.id
  })

  res.status(201).json(race)
})

// @desc    Update Race
// @route   PUT /api/races/:id
// @access  private

const updateRace = asyncHandler(async (req, res) => {
  const race = await Race.findById(req.params.id)

  if (!race) {
    res.status(404)
    throw new Error('Race not found')
  }

  if (race.postedBy.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedRace = await Race.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedRace)
})

// @desc Delete Race
// @route DELETE /api/races/:id
// @access Private

const deleteRace = asyncHandler(async (req, res) => {
  const race = await Race.findById(req.params.id)
  if (race) {
    await Race.deleteOne({ _id: race._id })
    res.status(200).json({ message: 'Race deleted successfully' })
  } else {
    res.status(404)
    throw new Error('Race not found')
  }
})

export {
  getRaces,
  getAllRaces,
  getLastRace,
  getRaceById,
  createRace,
  updateRace,
  deleteRace
}
