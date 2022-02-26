const Sequelize = require("sequelize");
const db = require("../db");

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
  index: {
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

// const index = (work) => {
//   try {
//     let idx = work.id
//     Work.
//   } catch (error) {}
// };

// Work.beforeCreate(index)
