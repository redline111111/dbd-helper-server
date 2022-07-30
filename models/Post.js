import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    character: {
        type: String,
        required: true,
    },
    perks: {
        type: Array,
        required: true,
    },
    viewsCount:{
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: String,
},
{
timestamps: true,
});

export default mongoose.model('Post', PostSchema);