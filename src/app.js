import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors"
import createHttpError from "http-errors";
import router from "./routes/index.js";
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:'2mb'}))
app.use("/api/v1",router)


app.use(async (req,res,next) =>{
    next(createHttpError.NotFound("This route does not exit"))
})

app.use(async (err, req, res, next) => {
    
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

dotenv.config();
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}


export default app