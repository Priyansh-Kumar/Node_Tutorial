const express = require('express')
const app = express()
const db=require('./db');
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body


// adding this for testing purpose

console.log("chal gya");
app.get('/', function (req, res) {
  res.send('Hello sir')
})

// //POST route to add a person (old method now depricated)
// app.post('/person',(req,res)=>{
//   const data=req.body //Assuming the request body conatins the person data

//   //create a new Person document using the Mongoose model
//   const newPerson=new Person(data);

//   //save the new person to the database 

//   newPerson.save((error,savedPerson)=>{
//     if(error){
//       console.log('Error saving person:',error);
//       res.status(500).json({error:'Internal server error'});
//     }else{
//       console.log('data saves sucessfully');
//       res.status(200).json(savedPerson);
//     }
//   })

// })

//POST route to add a person (new one)


const personRoutes=require('./routes/personRoutes.js');
const menuRoutes=require('./routes/menuRoutes.js')
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

const PORT_NO=process.env.PORT||10000;
app.listen(PORT_NO,()=>{
  console.log("server runnnig on the port number 3000")
})
