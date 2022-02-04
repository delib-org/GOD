const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jwt-simple");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const Ajv = require("ajv");
const ajv = new Ajv();
const port: number | string = process.env.PORT || 4000;

app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

import userRoutes from "./routes/userRoute";
import questionRoutes from "./routes/questionRoute";

app.use("/questions", questionRoutes);
app.use("/user", userRoutes);

//passport settings
const PASSPORT_SECRET = process.env.PASSPORT_SECRET;
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({ secret: PASSPORT_SECRET, resave: false, saveUninitialized: false })
);

require("./controlers/auth"); // get google authentication
require("./controlers/db"); //connect to mongoDB

import { UserSchema } from "./models/db/userModel";

//pasport routes
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/fail",
  }),
  async (req, res) => {
    try {
      const user = req.user;

      user.role = "public";
      user.last_entered = new Date();
      console.log(`user ${user.displayName} logged in`);

      const UserModel = mongoose.model("UserModel", UserSchema);

      // Try to update user
      const userDB = await UserModel.findOneAndUpdate({ id: user.id }, user);

      if (!userDB) {
        const newUser = new UserModel(user);
        const userData = await newUser.save();
        console.log(userData);
      }
      res.user = user;
      const userJWT = jwt.encode(
        { id: user.id, role: user.role, displayName: user.displayName },
        JWT_SECRET
      );
      res.cookie("user", userJWT, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2,
      });
      res.cookie("isLogged", "true", { maxAge: 1000 * 60 * 60 * 24 * 2 });
      res.redirect("http://localhost:3000/questions");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

app.get("/logout", (req: any, res: any) => {
  req.logout();
  res.clearCookie("user");
  res.send({ login: false });
});

//socket io

io.on("connection", (socket) => {
  console.log(socket.rooms);
  console.log("a user connected");

  socket.on("message", (msg) => {
    console.log("message: " + msg.message);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // socket.on('join room', roomId => {
  //     console.log('roomId', roomId)
  //     socket.join(roomId);

  // })
  // rooms

  socket.on("join room", (questionId) => {
    socket.join(questionId); //the client is now in that room
    console.log("joined a room for question ", questionId);
  });

  const roomSchema = {
    questionId: "string",
    msg: "string",
  };

  socket.on(`notification`, (notificationObj) => {
    try {
      
      const validate = ajv.compile(roomSchema);
      const valid = validate(notificationObj);
      if (!valid) throw new Error(validate.errors);

      notificationObj = JSON.parse(notificationObj);

      console.log(notificationObj);

      io.sockets
        .in(notificationObj.questionId)
        .emit("notification", notificationObj.msg);
    } catch (err) {
      console.error(err);
    }
  });
});

http.listen(port, () => {
  console.log("Server listen on port", port);
});
