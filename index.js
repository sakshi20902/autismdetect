const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('db connected');
}
// here we used moongose and connected our mongodb to it. here when ever we are using it it is supposed to on server. 
//creating a folder then using command ---- mongod --dbpath ./foldername

const userSchema = new mongoose.Schema({
    username: String,
    password: String                //validations that it will only string
});
const User = mongoose.model('User', userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

//crud -- create
server.post('/demo',async (req,res)=>{

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    const doc = await user.save();


    console.log(doc);
    res.json(doc);
})

server.get('/demo',async (req,res)=>{
    const docs = await User.find({});
    res.json(docs)
})
server.listen(8080,() => {
    console.log("server started")
})