import Mongoose from 'mongoose'

const DatabaseService = {
  async connect(): Promise<void> {
    if (Mongoose.connection.readyState === 0) {
      await Mongoose.connect(`${process.env.MONGO_URL ?? 'mongodb://localhost:27017'}/test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
    }
  },
}

export default DatabaseService
