// Handle request.

import { request, response } from "express";
import { User } from "../models/user.model.js";

const registerUser = async (request, response) => {
    try {
        const { username, email, password } = request.body;

        //basic validation
        if (!username || !email || !password) {
            return response.status(400).json({message: "All fields are important!"})
        }

        //check existing user
        const existing = await User.findOne({email: email.toLowerCase()})
        if (existing)
            return response.status(400).json({message: "User already exists"});

        //create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        response.status(201).json({message: "User registered succesfully!"});

    } catch (error) {
        response.status(500).json({message: "Internal server error", error: error.message });
    }
};

const loginUser = async (request, response) => {
    try {
        //checking if the user already exists
        const { email, password } = request.body;

        const user = await User.findOne({ email: email.toLowerCase()});

        //If user doesnt exist
        if(!user) return response.status(400).json({message: "User not found"});

        //if exist


        //password checking and comparing
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return response.status(400).json({message: "Invalid credentials"})
        
        response.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        response.status(500).json({message: "Internal server error"})
    
    }
}

const logoutUser = async (request, response) => {
    try {
        const user = await User.findOne({
            email
        });

        if(!user) return response.status(404).json({
            message: "User not found"
        });

        response.status(200).json({
            message:"Logout successful"
        });
        
    } catch (error) {
        response.status(500).json({
            message: "Internal Server Error", error
        });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};