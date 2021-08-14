const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
// const Review = require('./../../models/reviewModel');
// const User = require('./../../models/userModel');

dotenv.config();

const connectDB = async() => {
  try {
      const conn = await mongoose.connect(process.env.DATABASE_URL, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true
      })
      console.log(`Connected to MongoDB Successfully`);
  } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
  }
}

// READ JSON FILE
// `${__dirname}/tours.json`
const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

// deleteData();
// importData();
