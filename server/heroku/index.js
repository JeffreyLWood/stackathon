const Heroku = require("heroku-client");
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
const router = require("express").Router();

router.get("/apps", (res) => {
  // do something with apps
  heroku.get("/apps").then((apps) => {
    // do something with apps
    res.status(200).send(apps);
  });
});

// POST requests
// heroku.post("/apps").then((app) => {});

// // POST requests with body
// heroku.post("/apps", { body: { name: "my-new-app" } }).then((app) => {});

// // PATCH requests with body
// heroku
//   .patch("/apps/my-app", { body: { name: "my-renamed-app" } })
//   .then((app) => {});

// // DELETE requests
// heroku.delete("/apps/my-old-app").then((app) => {});
