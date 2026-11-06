require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const verifyToken = require('./middleware/verifyToken');
const { getLessons } = require('./services/getLessons');
const generateToken = require('./services/genToken');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sanitizeHtml = require('sanitize-html');

const port = process.env.PORT;
const AtlasUri = process.env.ATLASURI;
const User = require("./models/user");
const Lesson = require("./models/lesson");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(AtlasUri).then(() => {
  console.log('Connected');
})

app.get('/edit', verifyToken, async (req, res) => {
  try {
    const username = req.username;
    const lessonData = await getLessons(username);
    if (lessonData) {
      res.status(200).json(lessonData);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/lesson/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const lessonData = await Lesson.find({ title: title });
    if (lessonData) {
      res.status(200).json(lessonData);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/lessons/:page', async (req, res) => {
  try {
    const page = Number(req.params.page);
    if (!Number.isSafeInteger(page) || page < 0) {
      return res.status(400).json({ error: 'Invalid page number' });
    }
    const pageSize = 10;
    const skip = page * pageSize;
    const lessonCount = await Lesson.count();
    const lessons = await Lesson.find({})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(pageSize)
      .exec();

    res.status(200).json({
      lessons: lessons,
      totalPages: Math.ceil(lessonCount / pageSize)
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/search/liked', verifyToken, async (req, res) => {
  try {
    const username = req.username;
    const user = await User.findOne({ username: username });
    let lessons = [];
    for (let i = 0; i < user.liked.length; i++) {
      const lesson = await Lesson.findOne({ _id: user.liked[i] });
      lessons.push(lesson);
    }
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/search/:category', async (req, res) => {
  let { category } = req.params;

  if (category !== 'all' && category !== 'lessons' && category !== 'electric-components' && category !== 'microcontrollers') {
    category = 'all';
  }

  try {
    const lessons = await Lesson.find(category === 'all' ? {} : { category });
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/search/:category/:keyword', async (req, res) => {
  let { category, keyword } = req.params;
  if (category !== 'all' && category !== 'lessons' && category !== 'electric-components' && category !== 'microcontrollers') {
    category = 'all';
  }
  if (keyword == 'undefined') {
    keyword = '';
  }

  try {
    const lessons = await Lesson.find(
      category === 'all'
        ? { title: { $regex: keyword, $options: 'i' } }
        : {
          category, title: { $regex: keyword, $options: 'i' }
        });
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getUserRole', verifyToken, async (req, res) => {
  try {
    const username = req.username;
    const user = await User.findOne({ username });
    res.status(200).json({ role: user._doc.role });
  }
  catch (error) {
    console.log(error);
    res.status(401).json({ message: 'server error' });
  }
});

app.get('/api/getUserLiked', verifyToken, async (req, res) => {
  try {
    const username = req.username;
    const user = await User.findOne({ username });
    res.status(200).json({ role: user._doc.liked });
  }
  catch (error) {
    console.log(error);
    res.status(401).json({ message: 'server error' });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body || {};
    if (typeof username !== 'string' || !username.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof password !== 'string' || password.length < 10) {
      return res.status(400).json({ message: 'Invalid registration details' });
    }
    if (await User.exists({ username })) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    if (await User.exists({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    await User.create({ username, email, password: hash, role: 'user', liked: [] });
    return res.status(201).json({ message: 'Account created' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    console.error('Sign-up failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = generateToken(user._id, user.username, user.role);
    res.status(200).json({ message: 'Sign in successful', token, username: user.username, liked: user.liked, role: user.role });

  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add', verifyToken, async (req, res) => {
  const { title, content, category } = req.body;
  const username = req.username;
  const cleanInput = sanitizeHtml(content, {
    allowedTags: ['p', 'h1', 'h1', 'h2', 'h3', 'h4', 'div', 'img', 'canvas', 'figure', 'strong', 'bold', 'italic', 'src', 'em', 'code', 'u', 'a'],
    allowedAttributes: {
      img: ['src']
    },
  });
  try {
    const lesson = await Lesson.findOne({ title: title })
    if (lesson) {
      return res.status(400).json({ message: 'Title already exists' });
    }
    if (cleanInput.length > 100000 || cleanInput.length < 120) {
      return res.status(400).json({ message: 'Too short or too long' });
    }
    let newLesson = new Lesson({ title: title, content: cleanInput, category: category, user: username });
    await newLesson.save();
    res.status(201).json({ message: 'created!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/edit', verifyToken, async (req, res) => {
  try {
    const { id, title, content, category } = req.body;
    const username = req.username;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    if (lesson.user !== username) {
      return res.status(403).json({ message: 'Not allowed to edit this lesson' });
    }
    if (lesson.user === username) {
      const cleanInput = sanitizeHtml(content, {
        allowedTags: ['p', 'h1', 'h1', 'h2', 'h3', 'h4', 'div', 'img', 'canvas', 'figure', 'strong', 'bold', 'italic', 'src', 'em', 'code', 'u', 'a'],
        allowedAttributes: {
          img: ['src']
        },
      });
      lesson.title = title;
      lesson.content = cleanInput;
      lesson.category = category;
      await lesson.save();
      res.status(200).json({ message: 'updated!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    let { id } = req.params;
    const username = req.username;
    const role = req.role;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    if (lesson.user === username || role == 'admin' || role == 'moderator') {
      await lesson.deleteOne();
      return res.status(200).json({ message: 'deleted!' });
    }
    return res.status(403).json({ message: 'Not allowed to delete this lesson' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/like/:id', verifyToken, async (req, res) => {
  try {
    let { id } = req.params;
    const username = req.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.liked.includes(id)) {
      await user.updateOne({ $addToSet: { liked: id } });
      await Lesson.findByIdAndUpdate(id, { $inc: { likes: 1 } });
      return res.status(200).json({ message: 'liked!' });
    }
    return res.status(200).json({ message: 'Already liked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/unlike/:id', verifyToken, async (req, res) => {
  try {
    let { id } = req.params;
    const username = req.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.liked.includes(id)) {
      await user.updateOne({ $pull: { liked: id } });
      await Lesson.findByIdAndUpdate(id, { $inc: { likes: -1 } });
      return res.status(200).json({ message: 'unliked!' });
    }
    return res.status(200).json({ message: 'Already unliked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/check/:type/:input', async (req, res) => {
  try {
    let { type, input } = req.params;
    let user;
    let lesson;
    if (type == 'Username') {
      user = await User.findOne({ username: input });
    } else if (type == 'Email') {
      user = await User.findOne({ email: input });
    } else if (type == 'Title') {
      lesson = await Lesson.findOne({ title: input })
      if (!lesson) {
        return res.status(200).json({ message: 'false' });
      }
      return res.status(200).json({ message: 'true' });
    } else {
      return res.status(404).json({ message: 'No such type' });
    }
    if (!user) {
      return res.status(200).json({ message: 'false' });
    }
    return res.status(200).json({ message: 'true' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
