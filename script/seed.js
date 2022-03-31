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
        email: "jeffreywood.dev@gmail.com",
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
        email: "jeffreywood.dev@gmail.com",
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
        "2022, New York Times, Jane Isidor's Views of Brooklyn Heights Find a Sense of Calm Among Chaos by Wayne Schuman, , https://nytimes.com/notarealarticle\n2021, Harvard Business Review, 30 Photographers Under 30 by Lester C Wiley, , https://harvardbusinessreview.com/notarealarticle",
      publications:
        "2020, Jason Ortega, Photography Today, Yale University Press, https://yalebooks.yale.edu/notarealbook, Pages 20-24",
    });

    await cv.setUser(users[0]);
    let default0 = await Work.create({
      title: "A Brewery in Brooklyn",
      year: 2021,
      medium: "photograph",
      imgId: "stackathonImgs/IMG_7154_x8snqb",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });

    let default1 = await Work.create({
      title: "Capote's House",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7112_gbspsm",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default2 = await Work.create({
      title: "Ice Cream",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7139_ge5z2c",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default3 = await Work.create({
      title: "Brooklyn Heights",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7144_zmq2mk",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default4 = await Work.create({
      title: "Sidewalk",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7153_mkpd70",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });
    let default5 = await Work.create({
      title: "Corner",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7150_wrnlwf",
      height: 4,
      width: 5,
      status: "available",
      hidden: false,
    });

    let default7 = await Work.create({
      title: "Street 1",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7170_wkrsd8",
      height: 5,
      width: 4,
      status: "available",
    });
    let default8 = await Work.create({
      title: "Street 2",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_7149_fci6ka",
      height: 5,
      width: 4,
      status: "available",
    });

    // Put defaults into array for mapping
    let array = [
      default0,
      default1,
      default2,
      default3,
      default4,
      default5,
      default7,
      default8,
    ];
    // Map over works array and setUser to the new user.
    // Sets default images in the user's database and displays them on their new site.
    let workCollection = await Collection.create({
      title: "Rose",
      hidden: false,
    });
    await Collection.create({
      title: "Hidden",
      hidden: true,
    });
    let default9 = await Work.create({
      title: "Court Street",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8549_z45itv",
      height: 4,
      width: 5,
      status: "available",
    });
    let default10 = await Work.create({
      title: "Brick",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8622_otmj6a",
      height: 4,
      width: 5,
      status: "available",
    });
    let default11 = await Work.create({
      title: "Grand Central",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8757_b93blk",
      height: 4,
      width: 5,
      status: "available",
    });
    let default12 = await Work.create({
      title: "Canal",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/IMG_8744_1_hnb1c5",
      height: 4,
      width: 5,
      status: "available",
    });
    let blueWork = [default9, default10, default11, default12];

    let Blue = await Collection.create({
      title: "Blue",
      hidden: false,
    });

    array.map(async (work) => {
      return await work.setCollection(workCollection);
    });

    blueWork.map(async (work) => {
      await work.setCollection(Blue);
    });

    await Blue.setUser(1);
    await workCollection.setUser(1);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);

    return {
      users: {
        jane: users[0],
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
