const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            //YOUR USER ID
            author: '5ff2895897090a0effbc9623',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias amet beatae sit recusandae delectus explicabo officiis minus odit architecto. Natus minus veritatis consequuntur eaque expedita, amet autem! Facere, aut! Suscipit.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzwt5umya/image/upload/v1611456461/YelpCamp/iybrup5fpk5n8rznqbvh.jpg',
                    filename: 'YelpCamp/aicksmchxwkv9nep9x1w'
                },
                {
                    url: 'https://res.cloudinary.com/dzwt5umya/image/upload/v1611456461/YelpCamp/iybrup5fpk5n8rznqbvh.jpg',
                    filename: 'YelpCamp/ni5zgcfv9s9kd8woctru'
                }
            ],
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})