//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const About = require("./models/About");
const Contact = require("./models/Contact");
const CV = require("./models/CV");
const Work = require("./models/Work");
const Collection = require("./models/Collection");

//associations could go here!

User.hasOne(About);
User.hasOne(Contact);
User.hasOne(CV);
// User.belongsToMany(Work, { through: Collection });
User.hasMany(Collection);
Collection.hasMany(Work);

About.belongsTo(User);
Contact.belongsTo(User);
CV.belongsTo(User);
// Work.belongsTo(User, { through: Collection });
Work.belongsTo(Collection);
Collection.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    About,
    Contact,
    CV,
    Work,
    Collection,
  },
};
