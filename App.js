const express = require("express");
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const { Listing, Reviews, addreviews,Comments, Name } = require("./Listing")
const index = require("./index")
const session = require("express-session");
const Mong_url = "mongodb://127.0.0.1:27017/dip";
const { default: axios } = require("axios");



main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(Mong_url)
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080 , ()=>{
    console.log("Statting the server")
})



app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.post("/add", async (req, res)=>{
    const listing = new Name({names : req.body.username, email : req.body.password});
    console.log(listing);
    await listing.save();
    // res.send("SUCCESSFULLY ADDED")
    res.redirect("/")
})
app.get("/Alllist", async (req, res)=>{
    const alllisting = await Name.find();
    
        res.send(`
            <html>
                <body>
                    <ul>
                        ${alllisting.map(item => `<li>${item.names}</li><li>${item.email}</li><button><a href="/${item._id}/delete">Delete</a></button><br><br>`).join('')}
                    </ul>
                </body>
            </html>
        `);
   
})
app.get("/:id/delete", async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const listing = await Name.findByIdAndDelete(id);
    res.redirect("/Alllist")
})
app.get("/:id/update", async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const listing = await Name.findByIdAndUpdate(id);
    res.redirect("/Alllist")
})
app.get("/TextListing", async (req, res)=>{
    const allcomment = await Comments.find();
    
    const mylisting = await Listing.findById('66975bff13632bfe2cf44b8a')
    if(!mylisting){
        console.log("NOT FOUND")
    }
    allcomment.forEach((com)=>{
        mylisting.comments.push(com)
    })

    const review1 = await Reviews.findOne({name:"Good"});
    const review2 = await Reviews.findOne({name:"Bad"});
    
    mylisting.reviews.push(review1);
    mylisting.reviews.push(review2);
    // mylisting.comments.push(comment);
    await mylisting.populate("reviews","comments");
    // await mylisting.populate("comments");
    await mylisting.save();
    console.log("SAVED!!");
    console.log(mylisting);
    res.send("SUCCESSFULLY SAVED")
    // next();
})

app.get("/delete",async (req, res)=>{
    res.send("ALL DELETED")
    await Listing.deleteMany({})
    console.log("DELETED MANY")
})



// app.use((req,res,next)=>{
//     res.send("Wrongggggggg")
// })
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
