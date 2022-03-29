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
    allowNull: true,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  height: {
    type: Sequelize.REAL,
    allowNull: true,
  },
  medium: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  width: {
    type: Sequelize.REAL,
    allowNull: true,
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
    allowNull: true,
  },
  imgId: {
    type: Sequelize.STRING,
    allowNull: false,
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
