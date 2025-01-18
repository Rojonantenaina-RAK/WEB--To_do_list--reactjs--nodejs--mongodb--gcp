const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app');
const Task = require('./models/task'); // Modèle Mongoose

let mongoServer;

beforeAll(async () => {
  // Lancer MongoDB en mémoire
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Arrêter MongoDB et fermer la connexion
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Nettoyer la base de données avant chaque test
  await Task.deleteMany({});
});

describe('API Endpoints', () => {
  test('GET /tasks - Should return an empty array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /tasks - Should create a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
    };

    const res = await request(app).post('/tasks').send(newTask);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newTask.title);
    expect(res.body.description).toBe(newTask.description);

    // Vérifiez que la tâche est stockée dans la base de données
    const tasks = await Task.find();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe(newTask.title);
  });

  test('PUT /tasks/:id - Should update an existing task', async () => {
    const task = await Task.create({ title: 'Old Task', description: 'Old Description' });

    const res = await request(app).put(`/tasks/${task._id}`).send({
      title: 'Updated Task',
      description: 'Updated Description',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Task');

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.title).toBe('Updated Task');
  });

  test('DELETE /tasks/:id - Should delete a task', async () => {
    const task = await Task.create({ title: 'Task to delete', description: 'To be removed' });

    const res = await request(app).delete(`/tasks/${task._id}`);
    expect(res.statusCode).toBe(204);

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});
