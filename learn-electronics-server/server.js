const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/lessons', (req, res) => {
  fs.readFile('lessons.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

app.get('/search/:category/:keyword', (req, res) => {
  const { category, keyword } = req.params;

  // Read lessons data from the JSON file
  fs.readFile('lessons.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const lessons = JSON.parse(data).lessons;

      // Filter the lessons based on the search criteria
      const filteredLessons = lessons.filter(lesson => {
        const lowercaseTitle = lesson.title.toLowerCase();
        const lowercaseKeyword = keyword.toLowerCase();
        return (
          (category === 'All' || category === lesson.category) &&
          lowercaseTitle.includes(lowercaseKeyword)
        );
      });

      res.status(200).json({ lessons: filteredLessons });
    }
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

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