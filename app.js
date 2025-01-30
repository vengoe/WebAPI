const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const FavoriteThings = require("./models/FavoriteThings")

const app = express();
const port = process.env.port||3000;


//MongoDB connection setup
const mongoURI = "mongodb://localhost:27017/crudapp";
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", ()=>{
    console.log("Connected to MongoDB Database");
});

//Middleware to serve static data

app.use(express.static(path.join(__dirname, "public")));

//Set up middleware to parse json requests
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));



//our first example route
app.get("/", function(req,res){
    //res.send("Hello Everyone");
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



app.get("/testjson",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "json/games.json"))
});

setTimeout(()=>{
    console.log("Hello 2 seconds later");
}, 2000);

setTimeout(()=>{
    console.log("Hello now");
}, 0);

//Read routes
app.get("/favoritethings", async (req, res) => {
    try {
      const favoritethings = await FavoriteThings.find();
      res.json(favoritethings);
      console.log(favoritethings);
    } catch (err) {
      res.status(500).json({ error: "Failed to get favoritethings." });
    }
  });
  

app.get("/favoritethings/:id", async (req,res)=>{
    try{
        console.log(req.params.id);
        const favthing = await FavoriteThings.findById(req.params.id);
        if(!favthing){
            return res.status(404).json({error:"{FavoriteThing not found}"});
        }
        res.json(person);

    }catch(err){
        res.status(500).json({error:"Failed to get FavoriteThing."});
    }
});

//Add Route
app.post('/addfavoritething', async (req, res) => {
  try {
    const newThing = new FavoriteThings(req.body);
    const savedFavoritething = await newThing.save();
    res.redirect("/index.html");
    console.log(savedFavoritething);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add new favorite thing.' });
  }
});






// Delete route
app.delete("/deletefavoritething/:id", async (req, res) => {
    try {
      const itemId = req.params.id;
      await FavoriteThings.findByIdAndDelete(itemId);
      res.json({ message: "Item deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  });
  
  // Update route
  app.put("/updatefavoritething/:id", async (req, res) => {
    try {
      const itemId = req.params.id;
      const updatedData = req.body;
      const updatedItem = await FavoriteThings.findByIdAndUpdate(itemId, updatedData, {
        new: true,
        runValidators: true,
      });
      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ error: "Failed to update item" });
    }
  });
  
//Starts the server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

