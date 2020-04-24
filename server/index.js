const database = require('../database/index.js');
const helpers = require('../helpers/github.js');
const express = require('express');
let app = express();


app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  username = req.body.term;
  //call helpers + save
  helpers.getReposByUsername(username, (err, data) => {
    if (err) {
      console.log(`ERROR RETRIEVING REPOS FOR ${username}: `, err);
      res.send(err);
    } else {
      console.log(`SUCCESSFULLY RETRIEVED REPOS FOR ${username}! `);
      database.save(data, (err, data) => {
        if (err) {
          console.log(`ERROR SAVING REPOS FOR ${username}!`);
          res.send(err);
        } else {
          console.log(`SUCCESSFULLY SAVED REPOS FOR ${username}!`);
          res.sendStatus(201);
        };
      })
    }
  });
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  database.retrieve25((err, data) => {
    if (err) {
      console.log('ERROR RETRIEVING REPOS: ', err);
      res.send(err);
    } else {
      console.log('SUCCESSFULLY RETRIEVED REPOS FROM DATABASE');
      res.status(200).send(data);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

