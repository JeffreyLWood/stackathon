const router = require("express").Router();
// const { text } = require("express"); // ?
const {
  models: { User, About, Contact, CV, Work, Collection },
} = require("../db");
module.exports = router;
const Sequelize = require("sequelize");

// Used for creating a new collection
router.post("/", async (req, res) => {
  try {
    let check = await Collection.findAll({
      where: {
        userId: req.body.userId,
        title: { [Sequelize.Op.startsWith]: "New Collection" },
      },
    });
    let newCollection =
      check.length > 0
        ? await Collection.create({
            userId: req.body.userId,
            title: `New Collection ${(check.length += 1)}`,
          })
        : await Collection.create({
            userId: req.body.userId,
            title: "New Collection",
          });

    let allCollections = await Collection.findAll({
      where: { userId: req.body.userId },
    });

    res.status(200).send({ newCollection, allCollections });
  } catch (error) {
    console.log("/api/collections", error);
  }
});

//Toggle hide and show collection
router.put("/:userId/hide/:collection", async (req, res) => {
  try {
    await Collection.update(
      {
        hidden: req.body.toggle,
      },
      { where: { userId: req.params.userId, title: req.params.collection } }
    );
    let collection = await Collection.findOne({
      where: { userId: req.params.userId, title: req.params.collection },
      include: Work,
    });
    res.status(200).send(collection);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:userId/:collection", async (req, res) => {
  try {
    await Collection.update(
      {
        title: req.body.title,
        subheading1: req.body.subheading1,
        subheading2: req.body.subheading2,
        description: req.body.description,
      },
      { where: { userId: req.params.userId, title: req.params.collection } }
    );
    let newCollection = await Collection.findAll({
      where: { userId: req.params.userId, title: req.body.title },
      include: Work,
    });
    let collections = await Collection.findAll({
      where: { userId: req.params.userId },
      include: Work,
    });
    res.status(200).send({ newCollection, collections });
  } catch (error) {
    console.log("/api/collections", error);
  }
});

router.put("/:userId/:collection/reorder", async (req, res) => {
  try {
    await Collection.update(
      {
        order: req.body.order,
        category: req.body.category,
      },
      { where: { userId: req.params.userId, title: req.body.title } }
    );
    let newCollection = await Collection.findAll({
      where: { userId: req.params.userId, title: req.body.title },
      include: Work,
    });

    res.status(200).send(newCollection);
  } catch (error) {
    console.log("/api/collections", error);
  }
});

router.delete("/:userId/:collection", async (req, res) => {
  try {
    let collection = await Collection.findOne({
      where: { userId: req.params.userId, title: req.params.collection },
    });
    await Collection.destroy({
      where: {
        userId: req.params.userId,
        id: collection.id,
      },
      include: Work,
    });
    let collections = await Collection.findAll({
      where: { userId: req.params.userId },
      include: Work,
    });
    res.status(202).send({ collections, collection });
  } catch (error) {
    console.log("/api/collections", error);
  }
});
