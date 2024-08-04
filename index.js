const mongoose = require("mongoose");
const Listing = require("./Listing");
const Data = require("./data");
const { default: axios } = require("axios");

const Mong_url = "mongodb://127.0.0.1:27017/dip";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(Mong_url)
}
// app.listen(8080 , ()=>{
//     console.log("Statting the server")
// })

// const D = async  ()=>{
//     await Listing.deleteMany({title:"vivek"})
//     console.log("DELETED MANY")
// }

// async function fetchDataAndSave() {
//     try {
//         const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
//         console.log("Fetched data");

//         // Assuming response.data is an array of objects
//         const data = response.data;

//         // Save data to MongoDB
//         await Listing.insertMany(data);
//         console.log("Data saved successfully");
//     } catch (error) {
//         console.error("Error fetching or saving data:", error);
//     } finally {
//         mongoose.connection.close();
//     }
// }

