const Sequelize = require("sequelize");
const db = require("../db");
const Collection = require("./Collection");

const Work = db.define("work", {
  // heading: {
  //   type: Sequelize.STRING,
  //   defaultValue: "Work",
  // },
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
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  order: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Work;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

//Hooks

const index = async (work) => {
  try {
    let count = await Work.count();
    work.order = count;
    console.log(work.order);
  } catch (error) {
    console.log(error);
  }
};

Work.beforeCreate(index);
