import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name:String,
    description:String
})

export default mongoose.model('Post',postSchema);