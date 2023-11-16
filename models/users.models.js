import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const userSchema = new Schema({

    username :{
        type : true,
        required: true,
        unique :true,
        lowercase: true,
        trim: true,
        // Kisi bhi cheez ko database mei searchable banane ke liye uska index true kr do
        index: true
    },
    email :{
        type : true,
        required: true,
        unique :true,
        lowercase: true,
        trim: true,
        
    },
    fullname :{
        type : true,
        required: true,
        trim: true,
        index: true
        
    },
    avatar :{
        type : true,
        required: true,
        trim: true,
        index: true
        
    },

    // Yeh ek array hoga jisme jo bhi user aakr kuch karega isme daalkr data update kr denge
    watchHistory :[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    // Standard practise mei passwords database mei encrypted rehte hai. It's a challenge for the developer
    password :{
        type: String,
        required :[ true,'Password is required']


    },
    refreshToken :{
        type: String
    }
    
}, {
    timestamps: true
}


);




export const User = mongoose.model("User",userSchema);
