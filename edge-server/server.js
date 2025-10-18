const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const ORIGIN_URL = 'http://localhost:3100';
const CACHE_DIR = path.join(__dirname, 'cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);

const app = express();
app.use(cors());

app.get('/*', async (req, res) => {
  const filePath = req.path.substring(1) || 'index.html';
  const cacheFile = path.join(CACHE_DIR, filePath.replace(/\//g, '_'));

  if (fs.existsSync(cacheFile)) return res.sendFile(cacheFile);

  try {
    const response = await fetch(`${ORIGIN_URL}${req.path}`);
    if (!response.ok) throw new Error(`Origin responded with ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(cacheFile, buffer);
    res.sendFile(cacheFile);
  } catch (err) {
    console.error('❌ Fetch error:', err.message);
    res.status(500).send('Error fetching from origin');
  }
});

app.listen(8081, () => console.log('✅ Edge server running on port 8081'));
