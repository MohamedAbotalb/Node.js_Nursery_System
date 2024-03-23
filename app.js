const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const autoIncrement = require('@alec016/mongoose-autoincrement');

autoIncrement.initialize(mongoose.connection);

const teacherRoutes = require('./Routes/teacher.route');
const childRoutes = require('./Routes/child.route');
const classRoutes = require('./Routes/class.route');

const app = express();
const port = process.env.PORT || 8081;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB Connected....');
    app.listen(port, () => {
      console.log(`I am listening on port ${port}..........`);
    });
  })
  .catch((error) => {
    console.log('DB Problem ...' + error);
  });

// Logging Middleware
app.use(morgan('dev'));

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(express.json());

// URL encoded Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(teacherRoutes);
app.use(childRoutes);
app.use(classRoutes);

// Not found MiddleWare
app.use((req, res, next) => {
  res.status(404).json({ data: 'Not Found page' });
});

// Error MiddleWare
app.use((err, req, res, next) => {
  res.status(500).json({ data: `${err}` });
});
