const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const conn = require("./config/db");
const AuthRoutes = require("./routes/AuthRoute");
const TaskRoutes = require("./routes/Tasks");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your actual front-end URL
    credentials: true,
  })
);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.use("/api/users", AuthRoutes);
app.use("/api/tasks", TaskRoutes);

//starting server
conn();
app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT + "...");
});
