import mongoose, {Schema} from "mongoose";
import mongoooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({

    videofile:{
        type: String,  // cloudinary url 
        required : true
    },

    thumbnail:{
        type: String,  // cloudinary url 
        required : true
    },
    title:{
        type: String, 
    },
    description:{
        type: String, 
        required : true
    },
    duration:{
        type: String,  // cloudinary url 
        required : true
    },
    views:{
        type: number,  
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true 

    },
    owner:{
        type: Schema.Types.ObjectId,
        ref :"User"
        
    },
    
    
    
},

{
    timestamps: true
}
)





// aggrregate ko export krne se pehle as an method use karna pdega  


videoSchema.plugin(mongoooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)