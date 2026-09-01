/*
require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/api/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  res.json(result.rows);
});

app.post('/api/todos', async (req, res) => {
  const title = (req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const result = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.status(201).json(result.rows[0]);
});

app.patch('/api/todos/:id', async (req, res) => {
  const result = await pool.query(
    'UPDATE todos SET is_done = NOT is_done WHERE id = $1 RETURNING *',
    [req.params.id]
  );
  if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
});

app.delete('/api/todos/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('API listening on port ' + port));
*/

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const version = process.env.APP_VERSION || 'v1';
// The to-dos live here, in the server's memory.
// Restart the server and they are gone. That is deliberate - see the lab.
let todos = [];
let nextId = 1;
// how you (and your pipeline) know which version is running
app.get('/api/health', (req, res) => {
 res.json({ status: 'ok', version: version });
});
// list all todos, newest first
app.get('/api/todos', (req, res) => {
 res.json([...todos].reverse());
});
// add a todo
app.post('/api/todos', (req, res) => {
 const title = (req.body.title || '').trim();
 if (!title) return res.status(400).json({ error: 'Title is required' });
 const todo = { id: nextId++, title: title, is_done: false };
 todos.push(todo);

 res.status(201).json(todo);
});
// tick or untick a todo
app.patch('/api/todos/:id', (req, res) => {
 const todo = todos.find((t) => t.id === Number(req.params.id));
 if (!todo) return res.status(404).json({ error: 'Not found' });
 todo.is_done = !todo.is_done;
 res.json(todo);
});
// delete a todo
app.delete('/api/todos/:id', (req, res) => {
 const before = todos.length;
 todos = todos.filter((t) => t.id !== Number(req.params.id));
 if (todos.length === before) return res.status(404).json({ error: 'Not found' });
 res.status(204).end();
});
// serve the built React app, and hand any unknown path to it
const clientDir = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDir));
app.use((req, res) => res.sendFile(path.join(clientDir, 'index.html')));
const port = process.env.PORT || 3001;
app.listen(port, () => console.log('App listening on port ' + port));