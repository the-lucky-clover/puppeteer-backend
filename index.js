const express = require('express');
const app = express();
const puppeteerRoute = require('./routes/puppeteerRoute');

app.use(express.json());

// Option 3: Add logging to see what requests are coming in
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Option 1: Change from '/api' to '/' for route registration
app.use('/', puppeteerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
