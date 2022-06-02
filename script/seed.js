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
        email: "selectedworkteam@gmail.com",
        password: "123",
        firstName: "Jane",
        lastName: "Isidor",
      }),
    ]);
    await About.update(
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        header:
          "Jane Isidor's photographs transcend the obvious and reexamine the connection between time and place. -- The New York Times, 2022",
        imgId: "stackathonImgs/ql16osoyk2uapohzgpzt.jpg",
        caption: null,
      },
      { where: { userId: 1 } }
    );
    await Contact.update(
      {
        phone: 1234567890,
        address: "Brooklyn, NY",
        imgId: "stackathonImgs/pljdts0qzmhdq9itqnv9.jpg",
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
      imgId: "stackathonImgs/otuplyrqyh8ghvhpcks9.jpg",
    });

    await cv.setUser(users[0]);
    let default0 = await Work.create({
      title: "Summit",
      year: 2021,
      medium: "photograph",
      imgId: "stackathonImgs/pexels-val-apollonio-5077838_owyive.jpg",
      height: 4,
      width: 5,
      status: null,
      hidden: false,
    });

    let default1 = await Work.create({
      title: "Rise",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-eberhard-grossgasteiger-1292115_ekdosa.jpg",
      height: 4,
      width: 5,
      status: null,
      hidden: false,
    });
    let default2 = await Work.create({
      title: "Come Apart",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-philip-ackermann-1666015_eikhjs.jpg",
      height: 4,
      width: 5,
      status: null,
      hidden: false,
    });
    let default3 = await Work.create({
      title: "Emerald",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-sergei-primo-5343282_e85p3c.jpg",
      height: 4,
      width: 5,
      status: null,
      hidden: false,
    });
    let default4 = await Work.create({
      title: "Cobalt",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-lumn-167699_z0yzyt.jpg",
      height: 4,
      width: 5,
      status: null,
      hidden: false,
    });
    let default5 = await Work.create({
      title: "Summit 2",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-abdulrhman-alkady-9432828_zys79n.jpg",
      height: 4,
      width: 5,
      status: null,
      hidden: false,
    });
    let default7 = await Work.create({
      title: "Winter Sea",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-arthouse-studio-4347808_pc03nl.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default8 = await Work.create({
      title: "Caelis",
      medium: "photograph",
      year: 2021,
      imgId:
        "stackathonImgs/pexels-eberhard-grossgasteiger-1699021_1_hpyb7n.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default9 = await Work.create({
      title: "Alpine",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-valeriia-miller-2527562_bkmqlj.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default10 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-magda-ehlers-3575282_mqgdwt.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default11 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-drone-trotter-7974790_ylsxtk.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default12 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-3941243_bv4z1y.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default13 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-drone-trotter-7974790_ylsxtk.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default14 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-nicolas-3936957_amssqz.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default15 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-3301325_sncqbe.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default16 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-1792202_ohsfod.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default17 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-3116030_npdrnh.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default18 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-1709993_q8xhmq.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default19 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-3819185_rwodft.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default20 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-3819189_nln6c3.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default21 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-3819191_waqgov.jpg",
      height: 5,
      width: 4,
      status: null,
    });
    let default22 = await Work.create({
      title: "Under Current",
      medium: "photograph",
      year: 2021,
      imgId: "stackathonImgs/pexels-pok-rie-3941244_xko8lj.jpg",
      height: 5,
      width: 4,
      status: null,
    });

    let summitWorks = [
      default0,
      default1,
      default2,
      default3,
      default4,
      default5,
      default7,
      default8,
      default9,
    ];

    let undercurrentWorks = [
      default10,
      default11,
      default12,
      default13,
      default14,
      default15,
      default16,
      default17,
      default18,
      default19,
      default20,
      default21,
      default22,
    ];

    let collection1 = await Collection.create({
      title: "Summit",
      hidden: false,
      subheading1: "JANUARY 1 - JANUARY 28, 2022",
      subheading2: "HEINES GALLERY, 204 E 12TH STREET, NEW YORK, NY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    });

    let collection2 = await Collection.create({
      title: "Under Current",
      hidden: false,
      subheading1: "March 18 - April 30, 2021",
      subheading2: "ArtBox, 191 W23 St, NEW YORK, NY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    });

    await Collection.create({
      title: "Hidden",
      hidden: true,
    });

    summitWorks.map(async (work) => {
      return await work.setCollection(collection1);
    });

    undercurrentWorks.map(async (work) => {
      return await work.setCollection(collection2);
    });

    await collection2.setUser(1);
    await collection1.setUser(1);

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
