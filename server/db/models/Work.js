const Sequelize = require("sequelize");
const db = require("../db");

const Work = db.define("work", {
  heading: {
    type: Sequelize.STRING,
    defaultVal: "Selected Work",
  },
  title: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
  },

  height: {
    type: Sequelize.INTEGER,
  },
  medium: {
    type: Sequelize.STRING,
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
  hidden: {
    type: Sequelize.STRING,
    defaultVal: "off",
  },
});

module.exports = Work;

/**
 * instanceMethods
 */

/**
 * classMethods
 */
