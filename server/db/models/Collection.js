const Sequelize = require("sequelize");
const db = require("../db");

const Collection = db.define("collection", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  hidden: {
    type: Sequelize.STRING,
    defaultValue: true,
  },
  index: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Collection;

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
