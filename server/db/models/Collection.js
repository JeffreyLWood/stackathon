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
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  order: {
    type: Sequelize.INTEGER,
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
