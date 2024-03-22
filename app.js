const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const teacherRoutes = require('./Routes/teacher.route');
const childRoutes = require('./Routes/child.route');
const classRoutes = require('./Routes/class.route');

const app = express();
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`I'm listening on port ${port} ........`);
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
