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
//const Jsoup = require('jssoup')
//const sanitizeHtml = require('sanitize-html');
//const DOMPurify = require('dompurify');

const port = process.env.PORT;
const AtlasUri = process.env.ATLASURI;
const User = require("./models/user");
const Lesson = require("./models/lesson");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(AtlasUri).then(() => {
  console.log('Connected');
})

app.get('/edit',verifyToken, async (req, res) => {
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
    const lessonData = await Lesson.find({title: title});
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
    const page = parseInt(req.params.page);
    if(page < 0){
      page = 0;
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
    for(let i = 0; i< user.liked.length; i++){
      lesson = await Lesson.findOne({_id: user.liked[i]});
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
        : { category, title: { $regex: keyword, $options: 'i' }
      });
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  /*fs.readFile('lessons.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      let lessons = JSON.parse(data).lessons;

      let filteredLessons = lessons;

      if (category !== 'all') {
        filteredLessons = lessons.filter(lesson => lesson.category === category);
      }

      if (keyword) {
        filteredLessons = filteredLessons.filter(lesson => {
          let lowercaseTitle = lesson.title.toLowerCase();
          let lowercaseKeyword = keyword.toLowerCase();
          return lowercaseTitle.includes(lowercaseKeyword);
        });
      }
      res.status(200).json({ lessons: filteredLessons });
    }
  });*/
});

app.get('/api/getUserRole', verifyToken, async (req, res) => {
  try{
    const username = req.username;
    const user = await User.findOne({ username });
    res.status(200).json({ role: user._doc.role });
  }
  catch(error) {
    console.log(error);
    res.status(401).json({ message: 'server error' });
  }
});

app.get('/api/getUserLiked', verifyToken, async (req, res) => {
  try{
    const username = req.username;
    const user = await User.findOne({ username });
    res.status(200).json({ role: user._doc.liked });
  }
  catch(error) {
    console.log(error);
    res.status(401).json({ message: 'server error' });
  }
});

app.post('/signup',async (req, res) => {
  try{
    let { username, email, password } = req.body;
    const testUsername = await User.find({username: username})
    if (testUsername.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const testEmail = await User.find({email: email})
    if (testEmail.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    bcrypt
      .hash(password, saltRounds)
      .then(hash => {
        let newUser = new User({username: username, email: email, password: hash, role: 'user', liked: []})
        newUser.save();
      })
      .catch((err) => {throw err})
  }
  catch(error){
    res.statusMessage = `${error}`;
    res.status(500).send();
  }
  res.status(201).json({message: 'Account created'});
})

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt
      .hash(user.password, saltRounds)
      .then(hash => {
        user.password = hash;
      })
      .catch((err) => {throw err})

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
  //const sanitizedContent = DOMPurify.sanitize(lesson[0].content);
  //const sanitizedInput = Jsoup.clean(content, Jsoup.cleaner.safeLists.relaxed());
  /*console.log(content)
  const cleanInput = sanitizeHtml(content, {
    allowedTags: ['p', 'a', 'h1', 'h1', 'h2', 'h3', 'h4', 'div', 'img', 'a', 'canvas'],
    allowedAttributes: {},
  });
  console.log(cleanInput)*/
  //safe = Jsoup.clean(unsafe, Whitelist.basic());
  try{
    let newLesson = new Lesson({title:title, content:cleanInput, category:category, user: username});
    await newLesson.save();
    res.status(201).json({message: 'created!'});
  }catch(error){
    res.status(500).json({ message: error.message});
  }
});

app.put('/edit', verifyToken, async (req, res) => {
  try{
    const { id ,title, content, category } = req.body;
    const username = req.username;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    if (lesson.user === username) {
      lesson.title = title;
      lesson.content = content;
      lesson.category = category;
      await lesson.save();
      res.status(200).json({ message: 'updated!' });
  }
  }catch(error){
    res.status(500).json({ message: error.message});
  }
});

app.delete('/delete/:id', verifyToken, async (req, res) => {
  try{
    let { id } = req.params;
    const username = req.username;
    const role = req.role;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    if (lesson.user === username || role == 'admin' || role == 'moderator') {
      await lesson.deleteOne();
      res.status(200).json({ message: 'deleted!' });
    }
  }catch(error){
    res.status(500).json({ message: error.message});
  }
});

app.put('/like/:id', verifyToken, async (req, res) => {
  try{
    let { id } = req.params;
    const username = req.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.liked.includes(id)) {
      await user.updateOne({ $addToSet: { liked: id } });
      await Lesson.findByIdAndUpdate(id, { $inc: { likes: 1 } });
      res.status(200).json({ message: 'liked!' });
    }
  }catch(error){
    res.status(500).json({ message: error.message});
  }
});

app.put('/unlike/:id', verifyToken, async (req, res) => {
  try{
    let { id } = req.params;
    const username = req.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.liked.includes(id)) {
      await user.updateOne({ $pull: { liked: id } });
      await Lesson.findByIdAndUpdate(id, { $inc: { likes: -1 } });
      res.status(200).json({ message: 'unliked!' });
    }
  }catch(error){
    res.status(500).json({ message: error.message});
  }
});

app.get('/check/:type/:input', async (req, res) => {
  try{
    let { type, input } = req.params;
    let user;
    let lesson;
    if(type == 'Username'){
      user = await User.findOne({ username: input });
    }else if(type == 'Email') {
      user = await User.findOne({ email: input });
    }else if(type == 'Title') {
      lesson = await Lesson.findOne({title: input})
      if (!lesson) {
        return res.status(200).json({ message: 'false' });
      }
        return res.status(200).json({ message: 'true' });
    }else {
      return res.status(404).json({ message: 'No such type' });
    }
    if (!user) {
      return res.status(200).json({ message: 'false' });
    }
      return res.status(200).json({ message: 'true' });
  }catch(error){
    res.status(500).json({ message: error.message});
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
