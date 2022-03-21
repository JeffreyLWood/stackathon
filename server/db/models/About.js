const Sequelize = require("sequelize");
const db = require("../db");
// const axios = require("axios");

const About = db.define("about", {
  text: {
    type: Sequelize.STRING(2000),
    allowNull: true,
  },
  header: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  imgId: {
    type: Sequelize.STRING(2000),
    allowNull: true,
  },
  caption: {
    type: Sequelize.STRING(100),
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
