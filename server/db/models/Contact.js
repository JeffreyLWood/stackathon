const Sequelize = require("sequelize");
const db = require("../db");
// const axios = require("axios");

const Contact = db.define("contact", {
  text: {
    type: Sequelize.STRING(2000),
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  socialMedia: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Contact;

/**
 * instanceMethods
 */

/**
 * classMethods
 */
