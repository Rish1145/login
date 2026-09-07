const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const User = mongoose.model("User", {
  username: String,
  password: String
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).json({
      message: "Invalid login"
    });
  }

  res.json({
    message: "Login successful",
    username: user.username
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});