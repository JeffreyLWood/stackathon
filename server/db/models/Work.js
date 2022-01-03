const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Work = db.define("work", {
  heading: {
    type: Sequelize.STRING,
    defaultVal: "Selected Work",
  },
  title: {
    type: Sequelize.STRING,
  },
  height: {
    type: Sequelize.INTEGER,
  },
  width: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING,
  },
  imgId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Work;

/**
 * instanceMethods
 */

/**
 * classMethods
 */
