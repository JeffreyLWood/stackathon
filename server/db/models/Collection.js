const Sequelize = require("sequelize");
const db = require("../db");

const Collection = db.define("collection", {
  title: {
    type: Sequelize.STRING,
  },
  subheading1: {
    type: Sequelize.STRING(70),
  },
  subheading2: {
    type: Sequelize.STRING(70),
  },
  description: {
    type: Sequelize.STRING(1500),
  },
  hidden: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  order: {
    type: Sequelize.REAL,
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: "Primary",
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

// Applies an index to each collection made for ordering/reordering purposes
const index = async (collection) => {
  try {
    let count = await Collection.count();
    collection.order = count;
  } catch (error) {
    console.log(error);
  }
};

Collection.beforeCreate(index);
