import asyncHandler from '../middleware/asyncHandler.js'
import StravaProfile from '../models/stravaProfileModel.js'
import User from '../models/userModel.js'
import axios from 'axios'

// @desc Get Strava Profile
// @route GET /api/strava/
// @access Public

const getStravaProfile = asyncHandler(async (req, res) => {
  const userId = req.query.userId

  //Get user using the id in the url
  const user = await User.findById(userId)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const stravaProfile = await StravaProfile.findOne({ user: userId })

  res.status(200).json(stravaProfile)
})
// @desc Get Strava Activity
// @route GET /api/strava/activity
// @access Public

const getStravaActivity = asyncHandler(async (req, res) => {
  const strava_token = req.query.strava_token
  const theEpoch = req.query.theEpoch
  const stravaClientId = process.env.STRAVA_CLIENT_ID
  const stravaClientSecret = process.env.STRAVA_CLIENT_SECRET

  const config = {
    headers: {
      Authorization: `Bearer ${strava_token}`
    }
  }

  try {
    const response = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?after=${theEpoch}&per_page=5`,
      config
    )
    const stravaRaces = response.data
    let raceId = 0
    let sufferScore = 0
    let loopCount = stravaRaces.length
    if (stravaRaces.length > 3) loopCount = 3

    for (var i = 0; i < loopCount; i++) {
      if (stravaRaces[i].suffer_score > sufferScore) {
        sufferScore = stravaRaces[i].suffer_score
        raceId = stravaRaces[i].id
      }
    }
    //window.open(`https://www.strava.com/activities/${raceId}`)
    res.status(200).json(raceId)
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

// @desc    Update Strava Tokens
// @route   PUT /api/strava/
// @access  public

const updateStravaTokens = asyncHandler(async (req, res) => {
  const stravaProfile = req.body
  const stravaClientId = process.env.STRAVA_CLIENT_ID
  const stravaClientSecret = process.env.STRAVA_CLIENT_SECRET

  const { strava_refresh_token, user } = stravaProfile

  const newTokens = await axios.post(
    `https://www.strava.com/api/v3/oauth/token?client_id=${stravaClientId}&client_secret=${stravaClientSecret}&grant_type=refresh_token&refresh_token=${strava_refresh_token}`
  )
  const updatedFields = {
    strava_token: newTokens.data.access_token,
    strava_token_expires_at: newTokens.data.expires_at,
    strava_refresh_token: newTokens.data.refresh_token
  }

  const updatedStravaProfile = await StravaProfile.findOneAndUpdate(
    { user: user },
    { $set: updatedFields },
    { new: true }
  )
  res.status(200).json(updatedStravaProfile)
})

export { getStravaProfile, getStravaActivity, updateStravaTokens }
