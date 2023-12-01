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

// 1. pre hook is a method and isme jo bhi function execute krana hai likh do
// 2. "save" event par lga rhe hai
// 3. save event hote hi password ko encrpyt krna hai. User save pr click krega and hum encrypt kr denge.
// 4. async isliye ki requests mei time lgta hai usse handle krne ke liye
// 5. (next) iss liye use kr rhe hai ki jb bhi kaam ho jaye usse aage paas kr do (middleware things), this knows saare fields
//  6. bcrpyt aapke password ko hash krke encrypt kr dega and then next. 
// 7. issue yeh hai ki banda username, email, avatar kuch bhi chnge krega mera password automatically change ho jaega
// 8. iss code ko tabhi excetue krna hai tab password field mei modfication ho
userSchema.pre("save", async function(next){
    if(this.modified("password")) return next();

    this.password = bcrypt.hash(this.password,10 )
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
    
}

// yaha humne token env mei declare krke method call kr liya
// below is the standard procedure for generating a token
// Payload ko aap id, email,username sab dedo, dusra 
// token_secret aap provide krdo  along with its expiry
// refresh tokenn baar baar refresh hota rhta hai isliye data kam hota hai
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}







export const User = mongoose.model("User",userSchema);
