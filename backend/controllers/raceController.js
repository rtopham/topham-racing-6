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
// @desc Get Last Race
// @route GET /api/races
// @access Public

const getAllRaces = asyncHandler(async (req, res) => {
  const userId = req.query.userId

  const races = await Race.find({ postedBy: userId }).sort({ race_date: -1 })

  res.status(200).json(races)
})

const getLastRace = asyncHandler(async (req, res) => {
  const userId = req.query.userId

  const [race] = await Race.find({ postedBy: userId })
    .sort({ race_date: -1 })
    .limit(1)

  res.status(200).json(race)
})

export { getRaces, getAllRaces, getLastRace }
