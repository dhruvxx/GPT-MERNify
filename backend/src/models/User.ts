import mongoose from "mongoose";
import { randomUUID } from "crypto"; // for generating unique ids

const chatSchema = new mongoose.Schema({
    // _id is the unique id of the chat which is automatically generated but for example has been shown here
    id:{
        type: String,
        default: randomUUID(),
    },
    role:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    chats:[chatSchema], // array of chats
});

const User = mongoose.model("User", userSchema); // creating the model
export default User // exporting the model