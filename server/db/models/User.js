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
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
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

// Sets default images upon creation of an account
const defaultImages = async (user) => {
  try {
    let default0 = await Work.create({
      title: "A Brewery in Brooklyn",
      year: 2021,
      medium: "photograph",
      imgId: "stackathonImgs/IMG_7154_x8snqb",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });

    let default1 = await Work.create({
      title: "Capote's House",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7112_gbspsm",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default2 = await Work.create({
      title: "Ice Cream",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7139_ge5z2c",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default3 = await Work.create({
      title: "Brooklyn Heights",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7144_zmq2mk",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default4 = await Work.create({
      title: "Sidewalk",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7153_mkpd70",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default5 = await Work.create({
      title: "Corner",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7150_wrnlwf",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });

    let default7 = await Work.create({
      title: "Street 1",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7170_wkrsd8",
      height: 5,
      width: 4,
      status: "available",
    });
    let default8 = await Work.create({
      title: "Street 2",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7149_fci6ka",
      height: 5,
      width: 4,
      status: "available",
    });

    // Put defaults into array for mapping
    let array = [
      default0,
      default1,
      default2,
      default3,
      default4,
      default5,
      default7,
      default8,
    ];
    // Map over works array and setUser to the new user.
    // Sets default images in the user's database and displays them on their new site.
    let workCollection = await Collection.create({
      userId: user.id,
      title: "Rose",
      hidden: false,
    });

    await Collection.create({
      userId: user.id,
      title: "Hidden",
      hidden: true,
    });

    let default9 = await Work.create({
      title: "Court Street",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8549_z45itv",
      height: 4,
      width: 5,
      status: "available",
    });

    let default10 = await Work.create({
      title: "Brick",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8622_otmj6a",
      height: 4,
      width: 5,
      status: "available",
    });

    let default11 = await Work.create({
      title: "Grand Central",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8757_b93blk",
      height: 4,
      width: 5,
      status: "available",
    });

    let default12 = await Work.create({
      title: "Canal",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8744_1_hnb1c5",
      height: 4,
      width: 5,
      status: "available",
    });

    let blueWork = [default9, default10, default11, default12];

    let Blue = await Collection.create({
      userId: user.id,
      title: "Blue",
      hidden: false,
    });

    array.map(async (work) => {
      return await work.setCollection(workCollection);
    });

    blueWork.map(async (work) => {
      await work.setCollection(Blue);
    });
  } catch (error) {
    console.log(error);
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
    user.username = username + count;
  }
};

User.beforeCreate(unique);
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
User.afterCreate(defaultVals);
// User.afterCreate(defaultImages);
