const Heroku = require("heroku-client");
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
const router = require("express").Router();

module.exports = router;

router.get("/apps", async (res) => {
  // do something with apps
  res.send(heroku.get("/apps"));
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
