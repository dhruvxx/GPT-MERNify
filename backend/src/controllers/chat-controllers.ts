import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const {message} = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user)
            return res.status(401).json({message: "User does not exist"});
        const chats = user.chats.map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[]; 
        chats.push({role: "user", content: message});
        user.chats.push({role: "user", content: message});
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: chats});
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chat: user.chats});
        
    } catch (error) {
        console.log(error);
        // 500 is internal server error
        res.status(500).json({message: "Error", cause: error.message});
    }
};

export const sendChatsToUser = async (
    req:Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const user = await User.findById({email: res.locals.jwtData.email});
        if(!user) {
            return res.status(401).send("User does not exist");
        }
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Something is incorrect");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        return res.status(200).json({message: "Works", chats: user.chats});
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    } 
}

export const deleteChats = async (
    req:Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const user = await User.findById({email: res.locals.jwtData.email});
        if(!user) {
            return res.status(401).send("User does not exist");
        }
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Something is incorrect");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "Works"});
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    } 
}