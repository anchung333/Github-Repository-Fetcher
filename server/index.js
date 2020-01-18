const database = require('../database/index.js');
const helpers = require('../helpers/github.js');
const express = require('express');
let app = express();


app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
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
      database.save(data, (err) => {
        if (err) {
          console.log(`ERROR SAVING REPOS FOR ${username}!`);
          res.send(err);
        } else {
          console.log(`SUCCESSFULLY SAVED REPOS FOR ${username}!`);
          res.status(201).send();
        };
      })
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // Mongoose CRUD helper methods return Query object - Query objects have sort() method
  var top25Starred = database.retrieve25();
  console.log('TOP 25 STARRED REPOS SUCCESSFULLY RETRIEVED!');
  res.send(top25Starred);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

