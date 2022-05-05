const { Sequelize, Op } = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Work = require("./Work");
const CV = require("./CV");
const About = require("./About");
const Contact = require("./Contact");
const Collection = require("./Collection");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  siteTitle: {
    type: Sequelize.STRING,
  },
  picture: {
    type: Sequelize.STRING,
  },
  cname: {
    type: Sequelize.STRING,
  },
  domain: {
    type: Sequelize.STRING,
  },
  template: {
    type: Sequelize.REAL,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

const defaultVals = async (user) => {
  try {
    let about = await About.create({
      text: null,
      header: null,
      imgId: null,
      caption: null,
    });
    let exhibition = await CV.create({
      header: "Exhibition",
      text: null,
    });
    let education = await CV.create({
      header: "Education",
      text: null,
    });
    let contact = await Contact.create({
      text: "Reach out to me at one of the following:",
    });

    let newCollection = await Collection.create({
      title: "New Collection",
    });
    let hidden = await Collection.create({
      title: "Hidden",
    });

    await about.setUser(user);
    await exhibition.setUser(user);
    await education.setUser(user);
    await contact.setUser(user);
    await newCollection.setUser(user);
    await hidden.setUser(user);
  } catch (error) {
    console.log(error);
  }
};

const unique = async (user) => {
  let username = user.username;
  let count = await User.count({
    where: { username: { [Op.startsWith]: username } },
  });
  if (count >= 1) {
    user.username = username + (count += 1);
  }
};

const siteTitle = (user) => {
  user.siteTitle = `${user.firstName} ${user.lastName}`;
};

User.beforeCreate(siteTitle);
User.beforeCreate(unique);
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
User.afterCreate(defaultVals);
