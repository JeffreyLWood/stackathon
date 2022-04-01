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
    type: Sequelize.REAL,
  },
  medium: {
    type: Sequelize.STRING,
  },
  width: {
    type: Sequelize.REAL,
  },
  depth: {
    type: Sequelize.REAL,
  },
  metric: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  thumbnails: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  imgId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
  },
  order: {
    type: Sequelize.REAL,
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
  } catch (error) {
    console.log(error);
  }
};

Work.beforeCreate(index);
