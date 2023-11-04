import { Schema, model } from 'mongoose'

const TitleSchema = new Schema({
  title: {
    type: String,
    required: 'Title Name is required'
  },
  title_date: {
    type: Date,
    required: 'Title Date is Required'
  },
  category: {
    type: String,
    required: 'Category is Required'
  },
  postedBy: { type: Schema.ObjectId, ref: 'User' }
})

export default model('Title', TitleSchema)
