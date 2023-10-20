const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw Error("Failed to connect to database!");
  }
};

export default connectToMongo;
