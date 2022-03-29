const Sequelize = require("sequelize");
const db = require("../db");
// const axios = require("axios");

const CV = db.define("cv", {
  education: {
    type: Sequelize.TEXT(10000),
  },
  soloExhibition: {
    type: Sequelize.TEXT(10000),
  },
  groupExhibition: {
    type: Sequelize.TEXT(10000),
  },
  experience: {
    type: Sequelize.TEXT(10000),
  },
  teaching: {
    type: Sequelize.TEXT(10000),
  },
  awards: {
    type: Sequelize.TEXT(10000),
  },
  press: {
    type: Sequelize.TEXT(10000),
  },
  publications: {
    type: Sequelize.TEXT(10000),
  },
  residencies: {
    type: Sequelize.TEXT(10000),
  },
  advocacy: {
    type: Sequelize.TEXT(10000),
  },
  communityInvolvement: {
    type: Sequelize.TEXT(10000),
  },
});

module.exports = CV;

// Education
// Solo Exhibition
// Group Exhibition
// Related Experience
// Teaching
// Awards
// Press / Publication
// Residencies
// Advocacy
// Community Involvement
/**
 * instanceMethods
 */

/**
 * classMethods
 */
