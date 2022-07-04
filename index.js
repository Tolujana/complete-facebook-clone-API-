const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const userRoute = require('./route/users');
const conversationRoute = require('./route/conversation');
const messageRoute = require('./route/message');
const authRoute = require('./route/auth');
const postRoute = require('./route/posts');
const path = require('path');
dotenv.config();

mongoose.connect(process.env.MONGO_DB, (err) => {
  if (err) console.log(err.message);
  else console.log('mongdb is connected');
});
// middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(
  '/images/assets',
  express.static(path.join(__dirname, 'public/images/assets'))
);

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    console.log(req);
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

//route
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('file uploaded successfully');
  } catch (error) {
    console.log(error);
  }
});
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);
app.use(express.static(path.join(__dirname, '/socialsite/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/socialsite/build', 'index.html'));
});
app.listen(process.env.PORT || 8800, () => console.log('server runnings '));

// app.get('/', (req, res) => {
//   res.send('welcome home');
// });
// app.get('/users', (req, res) => {
//   res.send('welcome homeusers');
// });
