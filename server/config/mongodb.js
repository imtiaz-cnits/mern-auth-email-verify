import mongoose from 'mongoose';

const connectDB = async () => {
  try {
      mongoose.connection.on('connected', () => console.log("Database connected successfully"));
    const connectDB = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;