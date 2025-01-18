const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Task = require('./models/task');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// CRUD API Endpoints

app.get('/', (req, res) => {
  res.end("Welcome to your DB");
});

// Obtenir toutes les tâches
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ completed: false });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Ajouter une nouvelle tâche
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add task', details: err.message });
  }
});

// Supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Mettre à jour une tâche
app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update task', details: err.message });
  }
});

module.exports = app; // Exporte uniquement l'application sans écouter

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
}
