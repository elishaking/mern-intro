const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//DB Config
const db = require('./config/keys').mongoURILocal;
// Connect to MongoDB through Mongoose
mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => console.log(err));

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//Passport Middleware
server.use(passport.initialize());

//Passport Config
const passportConfig = require('./config/passport');
passportConfig(passport);

server.get('/', (req, res) => {
  res.send("Hello");
});

server.use('/api/users', users);
server.use('/api/profile', profile);
server.use('/api/posts', posts);
