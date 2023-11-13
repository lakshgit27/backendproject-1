import dotenv from "dotenv";

import connectDB from "../db/db.js";

dotenv.config({
    path :'./env'
})


connectDB()

.then(()=>{
    // app listen karega kisi port par ya in case of error default 8000 port par usme fir callback register hoga
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at PORT :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!", err)
})

//using IIFFEE wrapper to connnect with the database

/*
(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    // Express ke paas listners hote hai .Few are defined below 
     app.on("error",(error)=>{
        console.log("ERROR:",error);
        throw error
     })

     app.listen(process.env.PORT, ()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
     })

        
    } catch (error) {
        console.error("ERROR:",error)
        throw error
        
    }
 })()
 */

