const path = require("path");
const express = require("express");
const router = require("express").Router();
const morgan = require("morgan");
const wildcardSubdomains = require("wildcard-subdomains");
const User = require("./db/models/User");
const Collection = require("./db/models/Collection");
const app = express();
const url = require("url");
const { database } = require("pg/lib/defaults");
module.exports = app;

// // logging middleware
app.use(morgan("dev"));

// // body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  wildcardSubdomains({
    namespace: "_sub",
    whitelist: ["www"],
  })
);

app.get("/_sub/:firstSubdomain/*", function (req, res) {
  res.redirect(`https://www.selected-work.com/${req.params.firstSubdomain}/`);
});

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
