const app = require('./app');
const { connectDB } = require('./config/db');

connectDB();


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})