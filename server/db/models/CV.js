const Sequelize = require("sequelize");
const db = require("../db");
// const axios = require("axios");

const CV = db.define("cv", {
  exhibition: {
    type: Sequelize.TEXT,
  },
  education: {
    type: Sequelize.TEXT(100000),
  },
});

module.exports = CV;

/**
 * instanceMethods
 */

/**
 * classMethods
 */
