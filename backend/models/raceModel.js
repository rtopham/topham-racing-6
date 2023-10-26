import { Schema, model } from 'mongoose'

const RaceSchema = new Schema({
  race_name: {
    type: String,
    required: 'Race Name is required'
  },
  series: {
    type: String,
    required: 'Series Name is Required'
  },
  race_date: {
    type: Date,
    required: 'Race Date is Required'
  },
  location: String,
  time: {
    type: String,
    required: 'Race Time is Required'
  },
  rank: {
    type: Number,
    required: 'Rank is Required'
  },
  category: {
    type: String,
    required: 'Category is Required'
  },
  postedBy: { type: Schema.ObjectId, ref: 'User' }
})

export default model('Race', RaceSchema)
