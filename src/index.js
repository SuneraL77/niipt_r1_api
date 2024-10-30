import dotenv from 'dotenv'; // Add this import
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.config.js";

// Load environment variables
dotenv.config();

const { DATABASE_URL } = process.env; // Ensure DATABASE_URL is available
const PORT = process.env.PORT || 5000;

mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error:${err}`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

mongoose
  .connect(DATABASE_URL) // This should now have a valid string
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

let server;

server = app.listen(PORT, () => {
  logger.info(`server is listening at ${PORT}`);
  console.log("process =>", process.pid);
});

// Handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  }
});
