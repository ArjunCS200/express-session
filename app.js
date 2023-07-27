const MongoStore = require("connect-mongo");
const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(
  session({
    name: "USER_SESSION",
    resave: false,
    saveUninitialized: false,
    secret: "top secret",
    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/",
      dbName: "express_session",
    }),
    cookie: {
      maxAge: 600000,
    },
  })
);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "app is running",
  });
});

app.get("/login", (req, res) => {
  if (
    req.query.email !== "arjun.cs@gmail.com" ||
    req.query.password !== "123456"
  ) {
    throw new Error("Unauthorized");
  }
  req.session.user = "arjunarjun";
  res.send({
    message: "logged in",
  });
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    res.status(401).send({
      message: "Unauthorized",
    });
  } else {
    req.session.visited = 1;
    res.send({
      message: "secret info",
    });
  }
});

app.listen(3000);
