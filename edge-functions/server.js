const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/user-profile', (req, res) => {
  res.json({
    userId: req.query.id || 1,
    name: "John Doe",
    cachedAtEdge: true
  });
});

app.listen(9000, () => console.log('✅ Edge function server running on port 9000'));
