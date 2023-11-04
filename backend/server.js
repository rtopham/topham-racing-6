import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import raceRoutes from './routes/raceRoutes.js'
import titleRoutes from './routes/titleRoutes.js'
import stravaRoutes from './routes/stravaRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
//import uploadRoutes from './routes/uploadRoutes.js' */

//Define Port
const port = process.env.PORT || 5000

//Connect to MongoDB
connectDB()

const app = express()

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/users', userRoutes)
app.use('/api/races', raceRoutes)
app.use('/api/titles', titleRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/strava', stravaRoutes)
//app.use('/api/upload', uploadRoutes) */

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
