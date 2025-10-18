const express = require('express');
const path = require('path');
const app = express();

// Serve static public files (HTML, images, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve SDK as /sdk
app.use('/sdk', express.static(path.join(__dirname, '../sdk')));

app.listen(3100, () => console.log('✅ Origin server running on port 3100'));
