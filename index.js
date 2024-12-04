const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const UserRoutes = require('./routes/User');
const MovieRoutes = require('./routes/Movie');

const app = express();
const port = 3000 || process.env.PORT;

dotEnv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('DB CONNECTED')
}).catch(error => console.log(error));

//User Routes
app.use('/api/v1/user', UserRoutes);

//Movie Routes
app.use('/api/v1/movie', MovieRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
