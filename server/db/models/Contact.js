const Sequelize = require("sequelize");
const db = require("../db");
// const axios = require("axios");

const Contact = db.define("contact", {
  text: {
    type: Sequelize.STRING(200),
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
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
  },
  youtube: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  linkedin: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },

  etsy: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
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
