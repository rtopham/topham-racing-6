import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected`.yellow)
    console.log(`Host: ${conn.connection.host}`.cyan.underline)
    console.log(`DB: ${conn.connection.name}`.magenta)
    //console.dir(conn.connection, { depth: null })
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
