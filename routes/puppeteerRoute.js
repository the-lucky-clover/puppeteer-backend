const express = require('express');
const router = express.Router();
const runPuppeteer = require('../utils/puppeteerRunner');

router.post('/run-puppeteer', async (req, res) => {
  const { url, prompt } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: 'Missing target URL.' });
  }

  const result = await runPuppeteer(url, prompt);
  res.json(result);
});

module.exports = router;
