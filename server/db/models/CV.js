const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const CV = db.define("cv", {
  header: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  from: {
    type: Sequelize.DATE,
  },
  to: {
    type: Sequelize.DATE,
  },
});

module.exports = CV;

/**
 * instanceMethods
 */

/**
 * classMethods
 */
