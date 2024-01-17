require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

// Mongoose
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

// App
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = 3001;

// Routes
app.use(routes);
app.get("/", (req, res) => {
  res.send("Hello from Express.js!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
