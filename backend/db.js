const mongoose=require('mongoose');
const mongoURI="mongodb+srv://Anurag9458:Ramanand9458@cluster0.t263du0.mongodb.net/Notebook"

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  };
  


module.exports = connectToMongo;