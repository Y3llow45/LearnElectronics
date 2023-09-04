const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const verifyToken = require('./middleware/verifyToken');
const generateToken = require('./genToken');
//const getDate = require('./getDate')

const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;
const AtlasUri = process.env.ATLASURI;

const User = require("./models/user");
const Lesson = require("./models/lesson");

app.get('/lessons', (req, res) => {
  fs.readFile('lessons.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

app.get('/search/:category', (req, res) => {
  let { category } = req.params;
  if (category !== 'all' && category !== 'lessons' && category !== 'electric-components' && category !== 'microcontrollers') {
    category = 'all';
  }

  fs.readFile('lessons.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      let lessons = JSON.parse(data).lessons;

      let filteredLessons = lessons;

      if (category != 'all') {
        filteredLessons = lessons.filter(lesson => lesson.category === category);
      } else {
        filteredLessons = lessons;
      }

      res.status(200).json({ lessons: filteredLessons });
    }
  });
});

app.get('/search/:category/:keyword', (req, res) => {
  let { category, keyword } = req.params;
  console.log(category, keyword);
  if (category !== 'all' && category !== 'lessons' && category !== 'electric-components' && category !== 'microcontrollers') {
    category = 'all';
  }
  if (keyword == 'undefined') {
    keyword = '';
  }

  fs.readFile('lessons.json', 'utf8', (err, data) => {
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
  });
});

app.post('/signup', (req, res) => {
  try{
    let { username, email, password } = req.body;
    console.log(username, email, password);
    bcrypt
      .hash(password, saltRounds)
      .then(hash => {
        console.log(hash)
        let newUser = new User({username: username, email: email, password: hash})
        newUser.save();
      })
      .catch((err) => {throw err})
  }
  catch(error){
    res.statusMessage = `${error}`;
    res.status(500).send();
  }
  res.status(201).send();
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
        console.log('Wrong credentials. No such user');
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    bcrypt
      .hash(user.password, saltRounds)
      .then(hash => {
        user.password = hash;
      })
      .catch((err) => {throw err})

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(password, user.password);

    if (!isPasswordValid) {
      console.log('Wrong credentials. Wrong password');
      res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful sign-in
    console.log('Logged in');
    const token = generateToken(user._id);
    res.status(200).json({ message: 'Sign in successful', token, username: user.username });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add', verifyToken, (req, res) => {
  const { title, content, category } = req.body;
  try{
    let newLesson = new Lesson({title:title, content:content, category:category});
    newLesson.save();
    res.status(200).json({ message: 'Successful add'});
  }catch(error){
    res.status(500).json({ message: error});
  }
});


/*mongoose.connect(AtlasUri).then(() => {
  console.log('connected');
  bob.save();
  let firstArticle = User.findOne({});
  console.log(firstArticle);
})*/

mongoose.connect(AtlasUri).then(() => {
  console.log('Connected');
})

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

/*app.get('/search/:category/:keyword', (req, res) => {
  const { category, keyword } = req.params;
  if(keyword)
  fs.readFile('lessons.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const lessons = JSON.parse(data).lessons;
      const filteredLessons = lessons.filter(lesson => {
        const lowercaseTitle = lesson.title.toLowerCase();
        const lowercaseKeyword = keyword.toLowerCase();
        return (
          (category === 'all' || category === lesson.category) &&
          lowercaseTitle.includes(lowercaseKeyword)
        );
        });
        res.status(200).json({ lessons: filteredLessons });
      }
  });
}); */

/*const http = require('http');
const fs = require('fs');
const port = 5000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET' && req.url === '/lessons') {
    fs.readFile('lessons.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));

      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
 */