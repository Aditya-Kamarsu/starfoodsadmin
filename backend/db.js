const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Star_Foods:ptzyaoKqyRpUWPzP@cluster0.rpi1p.mongodb.net/Starfoods?retryWrites=true&w=majority";
const connectToMongo= () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected");
    });
}

module.exports = connectToMongo;