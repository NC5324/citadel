import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.post('/api/auth/login', (req, res) => {
  // todo
  res.send({
    id: 0,
    username: req.body.username,
    favorites: [],
  });
});

app.post('/api/auth/signup', (req, res) => {
  // todo
  res.send({
    id: 0,
    username: req.body.username,
    favorites: [],
  });
});

app.post('/api/user/:id/favorites/add', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.post('/api/user/:id/favorites/remove', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
