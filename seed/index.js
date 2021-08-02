const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/campgrounds", {
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

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      author: "6103bacee4526d32587aac50",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam laborum quibusdam quae accusantium dolores, dolore odio consequatur necessitatibus obcaecati odit corporis dolor autem. Est similique esse dolores dignissimos. Nam, sint.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/cloudinary-static/image/upload/v1627726158/Campgrounds/oqemcjo4rht4nuxo9ncn.jpg",
          filename: "Campgrounds/oqemcjo4rht4nuxo9ncn",
        },
        {
          url: "https://res.cloudinary.com/cloudinary-static/image/upload/v1627726158/Campgrounds/drsokqpum18l4e3qtus3.jpg",
          filename: "Campgrounds/drsokqpum18l4e3qtus3",
        },
        {
          url: "https://res.cloudinary.com/cloudinary-static/image/upload/v1627726158/Campgrounds/k3tadlzbcc8l7wznvzpe.jpg",
          filename: "Campgrounds/k3tadlzbcc8l7wznvzpe",
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
