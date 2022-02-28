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
  order: {
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

// const newCollection = (collection) => {
//   try {
//    if(collection.title === "New Collection"){
//      await Collection.find
//    }
//   } catch (error) {}
// };

// Work.beforeCreate(newCollection)
