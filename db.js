const mongoose=require('mongoose');
require('dotenv').config()
//const mongoURL= 'mongodb://0.0.0.0:27017/hotels'

const mongoURL=process.env.MONGODB_URL;
mongoose.connect(mongoURL)

const db=mongoose.connection;

db.on('connected',()=>{
  console.log('Connected to MongoDB server');
});
db.on('error',(err)=>{
  console.log('MongoDB connection error',err);
});

db.on('disconnected',()=>{
  console.log('MongoDB disconnected');
});

module.exports=db;