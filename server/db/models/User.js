const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Work = require("./Work");
const CV = require("./CV");
const About = require("./About");
const Contact = require("./Contact");

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
      medium: "oil on panel",
      imgId: "stackathonImgs/d2ncnihvslo8hlcttyqx",
      height: 4,
      width: 5,
      status: "available",
      hidden: "off",
    });

    let default1 = await Work.create({
      title: "Capote's House",
      medium: "oil on panel",
      year: 2021,
      imgId: "stackathonImgs/xv4pownj9m3mtx7ljjzc",
      height: 4,
      width: 5,
      status: "available",
      hidden: "off",
    });
    let default2 = await Work.create({
      title: "Ice Cream",
      medium: "oil on panel",
      year: 2021,
      imgId: "stackathonImgs/zgxhhmgkfdqn1kwzqyiw",
      height: 4,
      width: 5,
      status: "available",
      hidden: "off",
    });
    let default3 = await Work.create({
      title: "Brooklyn Heights",
      medium: "oil on panel",
      year: 2021,
      imgId: "stackathonImgs/veolqujeugdq34z8g8rq",
      height: 4,
      width: 5,
      status: "available",
      hidden: "off",
    });
    let default4 = await Work.create({
      title: "Sidewalk",
      medium: "oil on panel",
      year: 2021,
      imgId: "stackathonImgs/y9zvgvli3a3yhtih9etu",
      height: 4,
      width: 5,
      status: "available",
      hidden: "off",
    });
    let default5 = await Work.create({
      title: "Corner",
      medium: "oil on panel",
      year: 2021,
      imgId: "stackathonImgs/hxsibu6aszagkpjkevhz",
      height: 4,
      width: 5,
      status: "available",
      hidden: "off",
    });
    // let default6 = await Work.create({
    //   title: "A Street in Brooklyn",
    //   medium: "oil on panel",
    //   year: 2021,
    //   imgId: "stackathonImgs/xv4pownj9m3mtx7ljjzc",
    //   height: 4,
    //   width: 5,
    //   status: "available",
    //   hidden: "off",
    // });
    let default7 = await Work.create({
      title: "Street 1",
      medium: "oil on panel",
      year: 2021,
      imgId: "stackathonImgs/IMG_7170_ripehb",
      height: 5,
      width: 4,
      status: "available",
      hidden: "off",
    });
    let default8 = await Work.create({
      title: "Street 2",
      medium: "oil on panel",
      year: 2021,
      imgId: "stackathonImgs/IMG_7147_nyupzz",
      height: 5,
      width: 4,
      status: "available",
      hidden: "off",
    });
    // Put defaults into array for mapping
    let array = [
      default0,
      default1,
      default2,
      default3,
      default4,
      default5,
      // default6,
      default7,
      default8,
    ];
    // Map over works array and setUser to the new user.
    // Sets default images in the user's database and displays them on their new site.
    array.map(async (work) => await work.setUser(user));
  } catch (error) {
    console.log(error);
  }
};

const defaultVals = async (user) => {
  try {
    let about = await About.create({
      text: null,
      imgId: null,
    });
    let cv = await CV.create({
      header: "Exhibition",
    });
    let contact = await Contact.create({
      text: "Reach out to me at one of the following:",
    });
    await about.setUser(user);
    await cv.setUser(user);
    await contact.setUser(user);
  } catch (error) {
    console.log(error);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
User.afterCreate(defaultImages);
User.afterCreate(defaultVals);
