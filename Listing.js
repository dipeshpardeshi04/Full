const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    name: String,
    rate: Number
});
const commentsSchema = new Schema({
    msg: String
})
const listingSchema = new Schema({
    createdAt: String,
    avatar: String,
    Bio: String,
    jobTitle: String,
    profile: {
        username: String,
        firstName: String,
        lastName: String,
        email: String
    },
    id: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reviews"
        }
    ],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }]
});
const name = new Schema({
    names: String,
    email: String
})
listingSchema.post("findOneAndDelete", async (doc) => {
    if (doc && doc.reviews && doc.reviews.length > 0) {
        let res = await Reviews.deleteMany({ _id: { $in: doc.reviews } });
        console.log("DELETED COMMENTS");
        console.log(res);
    }
});

const Name = mongoose.model("Name", name);
const Comments = mongoose.model("Comments", commentsSchema);
const Reviews = mongoose.model("Reviews", reviewsSchema);
const Listing = mongoose.model("Listing", listingSchema);


const addreviews = async () => {
    const res = await Reviews.insertMany([
        { name: "Good", rate: 2 },
        { name: "Bad", rate: 1 },
        { name: "Inter", rate: 5 }
    ]);
    console.log("REVIEW ADDED");
    console.log(res);
};
const addcomment = async () => {
    await Comments.insertMany([
        { msg: "Very Good" },
        { msg: "Very Bad" },
        { msg: "Very Inter" }
    ]);
    console.log("COMMENTS ADDED");
}

const delCus = async () => {
    
    let res = await Listing.findByIdAndDelete("66975bff13632bfe2cf44b8a");
    // next(res);
    console.log("DELETED Customer");
    console.log(res);

}
// addreviews();
// addcomment();
// delCus();

module.exports = { Listing, Reviews, addreviews, Comments, Name };
