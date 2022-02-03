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
  phone: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  instagram: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  facebook: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  twitter: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    linkedin: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  pinterest: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  tiktok: {
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
