const path = require("path");
const express = require("express");
const router = require("express").Router();
const morgan = require("morgan");
const User = require("./db/models/User");
const Collection = require("./db/models/Collection");

const app = express();

module.exports = app;

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// // logging middleware
app.use(morgan("dev"));

// // body parsing middleware
app.use(express.json({ limit: "50mb" }));

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api/collections/", require("./api/collections"));
app.use("/api/users/", require("./api/users"));
app.use("/api", require("./api"));
app.use("/heroku", require("./heroku"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
