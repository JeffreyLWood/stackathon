const Sequelize = require("sequelize");
const db = require("../db");
// const axios = require("axios");

const CV = db.define("cv", {
  header: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
  },
});

module.exports = CV;

/**
 * instanceMethods
 */

/**
 * classMethods
 */
