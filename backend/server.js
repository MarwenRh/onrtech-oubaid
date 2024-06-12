import dotenv from "dotenv";
dotenv.config();
// import http from "http";
import express, { application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { router } from "./routes/userRoute.js";
import formRouter from "./routes/FormRoute.js";
import applicationRouter from "./routes/applicationRoute.js";
import JobsRouter from "./routes/JobRoute.js";
import ArticlesRouter from "./routes/articleRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import subscriptionRoutes from "./routes/subscriptionRoute.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/users", router);
app.use("/api/jobs", JobsRouter);
app.use("/api/articles", ArticlesRouter);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/forms", formRouter);
app.use("/api/applications", applicationRouter);

const PORT = process.env.PORT || 5000;
// Error Handler
app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();
