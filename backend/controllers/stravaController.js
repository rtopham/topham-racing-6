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

// @desc    Update Strava Tokens
// @route   PUT /api/strava/
// @access  public

const updateStravaTokens = asyncHandler(async (req, res) => {
  const stravaProfile = req.body
  const stravaClientId = process.env.STRAVA_CLIENT_ID
  const stravaClientSecret = process.env.STRAVA_CLIENT_SECRET

  const { strava_refresh_token, user } = stravaProfile

  if (stravaProfile) {
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
  } else {
    console.log('Tokens do not need updating')
    res.status(200).json(stravaProfile)
  }
})

/* const updateStravaTokens = asyncHandler(async (req, res) => {
  const userId = req.query.userId
  const user = await User.findById(userId)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const stravaProfile = await StravaProfile.findOne({ user: userId })
  const stravaClientId = process.env.STRAVA_CLIENT_ID
  const stravaClientSecret = process.env.STRAVA_CLIENT_SECRET

  if (stravaProfile) {
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)

    const { strava_token_expires_at, strava_refresh_token } = stravaProfile

    if (strava_token_expires_at < secondsSinceEpoch) {
      //Request new Tokens from Strava

      const newTokens = await axios.post(
        `https://www.strava.com/api/v3/oauth/token?client_id=${stravaClientId}&client_secret=${stravaClientSecret}&grant_type=refresh_token&refresh_token=${strava_refresh_token}`
      )
      const updatedFields = {
        strava_token: newTokens.data.access_token,
        strava_token_expires_at: newTokens.data.expires_at,
        strava_refresh_token: newTokens.data.refresh_token
      }

      const updatedStravaProfile = await StravaProfile.findOneAndUpdate(
        { user: req.params.id },
        { $set: updatedFields },
        { new: true }
      )
      res.status(200).json(updatedStravaProfile)
    } else {
      console.log('Tokens do not need updating')
      res.status(200).json(stravaProfile)
    }
  }
}) */

export { getStravaProfile, updateStravaTokens }
