const express = require('express');
const router = express.Router();
const runPuppeteer = require('../utils/puppeteerRunner');

// CORS middleware for this route
router.use('/run-puppeteer', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://1fec766e-41d8-4e0e-9e5c-277ce2efbe11.lovableproject.com');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

router.post('/run-puppeteer', async (req, res) => {
  const { url, prompt } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: 'Missing target URL.' });
  }

  const result = await runPuppeteer(url, prompt);
  res.json(result);
});

module.exports = router;
