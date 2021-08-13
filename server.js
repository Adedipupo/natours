const app = require('./app');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();
connectDB();


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})