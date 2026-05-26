require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'reactdb';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(mongoUri);
let database;

async function connectDatabase() {
  if (!database) {
    await client.connect();
    database = client.db(dbName);
  }
  return database;
}

async function getCollection(name) {
  const db = await connectDatabase();
  return db.collection(name);
}

function sendError(res, error) {
  console.error(error);
  res.status(500).json({ error: error.message || 'Internal server error' });
}

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Video API is running' });
});

app.get('/admin', async (req, res) => {
  try {
    const collection = await getCollection('admin');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    sendError(res, error);
  }
});

app.get('/categories', async (req, res) => {
  try {
    const collection = await getCollection('categories');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    sendError(res, error);
  }
});

app.get('/videos', async (req, res) => {
  try {
    const collection = await getCollection('videos');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    sendError(res, error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const collection = await getCollection('users');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    sendError(res, error);
  }
});

app.get('/videos/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid video id' });
  }

  try {
    const collection = await getCollection('videos');
    const video = await collection.findOne({ VideoId: id });
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    sendError(res, error);
  }
});

app.get('/getvideos/:catid', async (req, res) => {
  const id = Number(req.params.catid);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid category id' });
  }

  try {
    const collection = await getCollection('videos');
    const documents = await collection.find({ CategoryId: id }).toArray();
    res.json(documents);
  } catch (error) {
    sendError(res, error);
  }
});

app.post('/addcategory', async (req, res) => {
  const category = {
    CategoryId: Number(req.body.CategoryId),
    CategoryName: req.body.CategoryName,
  };

  if (!category.CategoryName) {
    return res.status(400).json({ error: 'CategoryName is required' });
  }

  try {
    const collection = await getCollection('categories');
    const result = await collection.insertOne(category);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    sendError(res, error);
  }
});

app.post('/addvideo', async (req, res) => {
  const video = {
    VideoId: Number(req.body.VideoId),
    Title: req.body.Title,
    Url: req.body.Url,
    Likes: Number(req.body.Likes) || 0,
    Dislikes: Number(req.body.Dislikes) || 0,
    Views: Number(req.body.Views) || 0,
    CategoryId: Number(req.body.CategoryId),
  };

  if (!video.Title || !video.Url || Number.isNaN(video.VideoId)) {
    return res.status(400).json({ error: 'VideoId, Title, and Url are required' });
  }

  try {
    const collection = await getCollection('videos');
    const result = await collection.insertOne(video);
    res.status(201).json({ message: 'Video added', insertedId: result.insertedId });
  } catch (error) {
    sendError(res, error);
  }
});

app.post('/registeruser', async (req, res) => {
  const user = {
    UserId: req.body.UserId,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    Mobile: req.body.Mobile,
  };

  if (!user.UserId || !user.UserName || !user.Password) {
    return res.status(400).json({ error: 'UserId, UserName, and Password are required' });
  }

  try {
    const collection = await getCollection('users');
    const result = await collection.insertOne(user);
    res.status(201).json({ message: 'User registered', insertedId: result.insertedId });
  } catch (error) {
    sendError(res, error);
  }
});

app.put('/updatevideo/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid video id' });
  }

  const video = {
    VideoId: Number(req.body.VideoId),
    Title: req.body.Title,
    Url: req.body.Url,
    Likes: Number(req.body.Likes) || 0,
    Dislikes: Number(req.body.Dislikes) || 0,
    Views: Number(req.body.Views) || 0,
    CategoryId: Number(req.body.CategoryId),
  };

  try {
    const collection = await getCollection('videos');
    const result = await collection.updateOne({ VideoId: id }, { $set: video });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ message: 'Video updated' });
  } catch (error) {
    sendError(res, error);
  }
});

app.delete('/deletevideo/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid video id' });
  }

  try {
    const collection = await getCollection('videos');
    const result = await collection.deleteOne({ VideoId: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  } catch (error) {
    sendError(res, error);
  }
});

app.listen(port, () => {
  console.log(`server started: http://127.0.0.1:${port}`);
});

process.on('SIGINT', async () => {
  console.log('Closing database connection');
  await client.close();
  process.exit(0);
});
