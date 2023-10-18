const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://aarjun8060:Samarpal08%40@cluster0.adxlu1n.mongodb.net/management_github");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
