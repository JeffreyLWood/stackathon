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
        username: "janeisidor",
        email: "jisidor@janeisidor.com",
        password: "123",
        firstName: "Jane",
        lastName: "Isidor",
      }),
    ]);
    await About.update(
      {
        text: "Jane Isidor is not a real person. She is not a real photographer based in Brooklyn, nor did she obtain degrees from Boston University or Columbia University. She is merely a figmant of the engineers' imagination at Selected-Work.com who may or may not be a figmant of someone else's imagination. Possibly yours? You may never really know with absolute certainty. \n \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        header:
          "Jane Isidor's photographs transcend the obvious and reexamine the connection between time and place. --New York Times, 2022",
        imgId: "stackathonImgs/janeisidor_rvlm1p",
        caption: null,
      },
      { where: { userId: 1 } }
    );
    await Contact.update(
      {
        phone: 1234567890,
        address: "Brooklyn, NY",
        instagram: "https://instagram.com/",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        email: "jisidor@janeisidor.com",
        twitter: "https://twitter.com",
      },
      { where: { userId: 1 } }
    );
    let cv = await CV.create({
      education:
        "2018, Columbia University, MFA Photography, New York NY\n2016, Boston University, BFA Theatre Design, Boston MA",
      groupExhibition:
        "2021, Groupthink, On Being and Somethingness, New York NY\n2020, Hutchison Gallery, 2020 Vision, New York NY\n2019, Grover and Co., Lower East Siders, New York NY\n2018, Hutchison Gallery, Belief Disbelief: Reality Reassessed, New York NY\n2017, Lombardy Gallery, Feline Gaze: Photographer's and Their Cats, Cambridge MA",
      soloExhibition:
        "2022, Howel Gallery, Views of Brooklyn Heights, New York NY",
      awards: "2021, Halfbright Scholarship, Photography, Berlin",
      experience:
        "2020, New England College, Adjunct Faculty - Intro. to Photography, Cornish NH \n 2020, Salem University, Visiting Lecturer, Salem MA, 1 hour lecture with slides",
      press:
        "2022, Wayne Schuman, Jane Isidor's Views of Brooklyn Heights Find a Sense of Calm Among Chaos, New York Times, https://nytimes.com/notarealarticle\n2021, Lester C Wiley, 30 Photographers Under 30, Harvard Business Review, https://hbr.com/notarealarticle",
      publications:
        "2020, Jason Ortega, Photography Today, Yale University Press, https://yalebooks.yale.edu/notarealbook, Pages 20-24",
    });

    await cv.setUser(users[0]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    return {
      users: {
        jane: users[0],
        // murphy: users[1],
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
