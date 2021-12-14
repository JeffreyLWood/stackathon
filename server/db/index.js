//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const About = require("./models/About");
const Contact = require("./models/Contact");
const CV = require("./models/CV");
const Work = require("./models/Work");
//associations could go here!

User.hasOne(About);
User.hasOne(Contact);
User.hasOne(CV);
User.hasMany(Work);

About.belongsTo(User);
Contact.belongsTo(User);
CV.belongsTo(User);
Work.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    About,
    Contact,
    CV,
    Work,
  },
};
