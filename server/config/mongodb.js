import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.on('Connected', () => console.log('Database Connected'));

  await mongoose.connect(`${process.env.MONGO_URI}/MERNAUTH`);
}

export default connectDB;