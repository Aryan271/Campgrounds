const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const localDB = "mongodb://localhost:27017/campgrounds";
const serverDB = process.env.DB_URL || localDB;

mongoose.connect(serverDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany();

  for (let i = 0; i < 60; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      author: "610885a976bf7f001541fecc",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam laborum quibusdam quae accusantium dolores, dolore odio consequatur necessitatibus obcaecati odit corporis dolor autem. Est similique esse dolores dignissimos. Nam, sint.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/cloudinary-static/image/upload/v1627935294/Campgrounds/ekikucpuofj5vxxeoyrp.jpg",
          filename: "Campgrounds/ekikucpuofj5vxxeoyrp",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
