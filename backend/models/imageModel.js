import { Schema, model } from 'mongoose'

const ImageSchema = new Schema({
  filename: {
    type: String,
    required: 'File Name is required'
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  postedBy: { type: Schema.ObjectId, ref: 'User' }
})

export default model('Image', ImageSchema)
