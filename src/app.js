import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    // use to talk with the frontend, url daalo frontend jiise aapko backend connect krwana hai
    origin : process.env.CORS_ORIGIN
}))

// Yeh woh tarika hua jisse aap user dwara submitted data store krwa rahe ho

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export {app}