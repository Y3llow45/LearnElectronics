The server was made using express. It also uses mongoose to connect to the database and bcrypt to hash passwords.

Enable CORS and parse incoming JSON data with bodyParser.
```javascript
app.use(cors());
app.use(bodyParser.json());
```

Connect to the database
```javascript
mongoose.connect(AtlasUri).then(() => {
  console.log('Connected');
})
```

Listen on the specific port
```javascript
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

This route sends every lesson user has created
```javascript
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
```

This route fetches lessons from database, sorts them from newest to oldest, arrange them into pages and send all
lessons page by page to the client. There are 10 lessons per page.
```javascript
app.get('/lessons/:page', async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const pageSize = 10;
    const skip = page * pageSize;

    const lessons = await Lesson.find({})
      .sort({ $natural: -1 })
      .skip(skip)
      .limit(pageSize)
      .exec();
    
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
```

This route searches lessons using category, keyword or both in the database. Both category and keyword are optional and searches
can be performed without them.
```javascript
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
});
```

This route creates accounts with given username, password and email. The password is then hashed using bcrypt and salt.
```javascript
app.post('/signup', (req, res) => {
  try{
    let { username, email, password } = req.body;
    bcrypt
      .hash(password, saltRounds)
      .then(hash => {
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
```

This route logs in users. First it receives username and password. Server checks if such user exists and if yes it hashesh the given
password and checks if the hash matches the hash inside the database. If they match, the user is sent encrypted token which contains
id, username and role. If password hashes don't match or there is no such user with the given username, the user receives 'Invalid
credentials' message.
```javascript
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
    res.status(200).json({ message: 'Sign in successful', token, username: user.username });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
```

All other routes work in a very similar way.