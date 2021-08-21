'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/book', {useNewUrlParser:true, useUnifiedTopology: true })
const client = jwksClient({
  jwksUrl: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`
});

app.get('/test', (request, response) => {


  // TODO: 
  // STEP 1: get the jwt from the headers

  const token = request.headers.authorization.split(' ')[0];
  jwt.verify(token, getKey, {}, (err, user) => {
    if(err) {
      response.send('error');
    }
    response.send(user);
  }); 
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

const BookSchema = new mongoose.Schema({
  title: String , 
  decription: String ,
  status: String ,
  
  
});

const ownerSchema= new mongoose.Schema({
  email: String,
  book:[BookSchema]
 }) 

const bookModel = mongoose.model('user', ownerSchema); 

const seedBook=()=>{
  const noortan=new bookModel({
      email: 'norajbree7@gmail.com',
      book:[ {
          title: 'Java',
          description: 'talk about Java programming language',
          status: 'available',
         
      },
      {
          title: 'JavaScript',
          description: 'talk about JavaScript programming language',
          status: 'available',
         
      }]
     
      
  })

 
  noortan.save()
    
  console.log(noortan)

}

//bookCollection();
app.get("/books", getFavouriteBooks);
function getFavouriteBooks (req, res){
  let {email}= req.query;

  reFormSchema.myUserModel.find({email : email} ,(error ,userData)=>{
    if(error){
      res.send('book not found ');
    }else{
      res.send(userData[0].books);
    }
  })
}

//seedBook() ;
app.listen(PORT, () => console.log(`listening on ${PORT}`));


