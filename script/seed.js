"use strict";

const {
  db,
  models: { User, About, Work, Contact, CV, Collection },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  try {
    const users = await Promise.all([
      User.create({
        username: "jeffreywood",
        email: "jeffreywood.dev@gmail.com",
        password: "ambergris",
        firstName: "Jeffrey",
        lastName: "Wood",
      }),
    ]);
    let about = await About.create({
      text: "Hello welcome to my website.",
      imgId: "stackathonImgs/IMG_7149_fci6ka",
    });

    let cv = await CV.create({
      education:
        "2019-2021, The New York Academy of Art, MFA Painting, New York NY \n 2013-2017, Angel/Florence Academy of Art, Drawing and Painting, Florence Italy",
    });
    // await Work.create({ imgId: "test" });
    await about.setUser(users[0]);
    await cv.setUser(users[0]);
    // await Collection.create({ title: "2020", userId: users[0].id });
    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    return {
      users: {
        cody: users[0],
        murphy: users[1],
      },
    };
  } catch (error) {
    console.log(error);
    return "Seed Issue";
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
