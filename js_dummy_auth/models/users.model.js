import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "Consumer", 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    registration_date: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export default mongoose.model("User", usersSchema, "users")