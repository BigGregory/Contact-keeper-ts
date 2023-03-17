const mongoose = require('mongoose');
import config from 'config';

const dbConnectString: string = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbConnectString);
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
