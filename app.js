const express = require('express');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.get('/about', (req, res) => {
  res.json({ application: 'API du blog', version: '1.0.0' });
});

app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
