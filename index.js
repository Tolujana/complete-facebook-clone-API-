const express = require("express");
var cors = require("cors");

const app = express();
const http = require("http").Server(app);
const bcrypt = require("bcryptjs");
const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const userRoute = require("./route/users");
const conversationRoute = require("./route/conversation");
const messageRoute = require("./route/message");
const authRoute = require("./route/auth");
const postRoute = require("./route/posts");
const path = require("path");
const io = require("socket.io")(http, {
  cors: {
    origin: "https://facebook-clone-apizz.onrender.com/",
    origin: "http://localhost:3000",
    // origin: "*",
    methods: ["GET", "POST"],
  },
});
dotenv.config();

const tolu = "mongodb://127.0.0.1:27017/socialnetwork";

mongoose.connect(process.env.MONGO_DB, (err) => {
  if (err) console.log(err);
  else console.log("mongdb is connected");
});
// middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/images/assets", express.static(path.join(__dirname, "public/images/assets")));
// cors
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log("thisis waht i want", req);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: "public/images  " });

//route
app.post("/api/upload", upload.array("files", 12), (req, res) => {
  try {
    console.log(req);
    return res.status(200).json("file uploaded successfully");
  } catch (error) {
    console.log(error.message);
  }
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use(express.static(path.join(__dirname, "/socialsite/build")));
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => {
    user.socketId !== socketId;
  });
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};
io.on("connection", (socket) => {
  io.emit("rebroadcastUser", socket.id);
  //get users id and socket id from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("see users", users);
    io.emit("users", users);
  });
  socket.on("readdUser", (userId) => {
    addUser(userId, socket.id);
    console.log("see users", users);
    io.emit("users", users);
  });
  io.emit("welcome", "welcome to Finjana. now you can chat");

  //when disconnectecd

  // Send and receive messages
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);
    console.log("user i am looking for", user, user?.socketId);

    io.to(user?.socketId).emit("getMessage", { senderId, message });
  });
  socket.on("disconnect", (reason) => {
    socket.removeAllListeners();
    removeUser(socket.id);
    io.emit("users", users);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/socialsite/build", "index.html"));
});
http.listen(process.env.PORT || 8800, () => console.log("server runnings "));
