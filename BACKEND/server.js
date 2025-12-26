const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const createcourse = require("./routes/CreateCourse");
const createoperation = require("./routes/CreateOperation");
const createbda = require("./routes/CreateBDA");
const Mentorship = require("./routes/Mentorship");
const Advance = require("./routes/Advance");
const NewStudentEnroll = require("./routes/NewStudentEnroll");
const CreateMarketing = require("./routes/CreateMarketing");
const sendMailWithAttchement = require("./routes/SendMailWithAttechment");
const Mockai = require("./routes/mock");
const Excercise = require("./routes/excercise");
// const PlacementCoordinator = require("./routes/PlacementCoordinator");
const ResumeATS = require("./routes/resumeats");

const User = require("./routes/User");
const admin = require("./routes/AdminLogin")
const bodyParser = require("body-parser");

const CreateJob = require("./routes/CreateJob"); 
const JobApplication = require("./routes/JobApplication")
const MasterClass = require("./routes/MasterClass") 
const AddEvent = require("./routes/AddEvent")
const Certificate = require("./routes/Certificate")
const ReferAndEarn = require("./routes/ReferAndEarn");
const cookieParser = require("cookie-parser");
const os = require("os");
// const https = require("https")

dotenv.config();
const app = express();

// ✅ GLOBAL MONGO CACHE (VERY IMPORTANT FOR VERCEL)
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(process.env.DB_NAME, {
//       bufferCommands: false,
//       maxPoolSize: 10,
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//   }

//   cached.conn = await cached.promise;
//   console.log("✅ MongoDB connected");
//   return cached.conn;
// }

// ✅ MIDDLEWARES
const allowedOrigins = process.env.FRONTEND_URL
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  } else {
    next();
  }
});

app.options('*', (req, res) => {
  res.sendStatus(204); 
});

app.use(bodyParser.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// Middleware to parse JSON
app.use(express.json());

//create course
app.use("/", createcourse);
//create operation
app.use("/", createoperation);
app.use("/", CreateMarketing);
//create bda
app.use("/", createbda);
// mentorship
app.use("/", Mentorship);
//advance
app.use("/", Advance);
//create new student enroll
app.use("/", NewStudentEnroll);
//user
app.use("/", User);
// admin
app.use("/", admin);

// CREATEJOBS
app.use("/", CreateJob);

//MasterClass
app.use("/", MasterClass);

// JobApplication
app.use("/", JobApplication);

app.use("/",Mockai);

app.use("/",Excercise);

app.use("/",Certificate);
app.use("/",ReferAndEarn);

//AddEvent
app.use("/", AddEvent);

//send mail with attchement
app.use("/", sendMailWithAttchement);

app.use("/", ResumeATS);

// app.use("/", PlacementCoordinator);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});

// Export the app for Vercel
module.exports = app;


// Connect to MongoDB
mongoose
  .connect(
   process.env.DB_NAME,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// // ✅ HEALTH CHECK
// app.get("/", async (req, res) => {
//   await connectDB();
//   res.send("✅ Backend is live and connected");
// });

// // ✅ VERCEL HANDLER
// module.exports = async (req, res) => {
//   await connectDB();
//   return app(req, res);
// };
