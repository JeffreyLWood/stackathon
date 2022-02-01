const Sequelize = require("sequelize");
const db = require("../db");
// const axios = require("axios");

const About = db.define("about", {
  text: {
    type: Sequelize.STRING(2000),
    allowNull: true,
  },
});

module.exports = About;

/**
 * instanceMethods
 */

/**
 * classMethods
 */
