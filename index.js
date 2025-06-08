const express = require('express');
const app = express();
const puppeteerRoute = require('./routes/puppeteerRoute');

app.use(express.json());
app.use('/api', puppeteerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
