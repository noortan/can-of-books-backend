"use strict";
const mongoose = require('mongoose');

let reFormSchema ={};
 
reFormSchema.bookSchema = new mongoose.Schema({
    name : String ,
    description : String ,
    states : String ,
    img :String
});

reFormSchema.userSchema = new mongoose.Schema({
    email : String ,
    books : [reFormSchema.bookSchema]
});

reFormSchema.bookModel = mongoose.model("book" ,reFormSchema.bookSchema);
reFormSchema.userModel = mongoose.model("user" ,reFormSchema.userSchema);

module.exports = reFormSchema;