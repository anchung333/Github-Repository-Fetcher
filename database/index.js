const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  "id": Number,
  "name": String,
  "owner": Object,
  "html_url": String,
  "description": String,
  "created_at": String,
  "updated_at": String,
  "stargazers_count": Number,
  "forks_count": Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoDataArray, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //also perform check for dup repos using repo id
  console.log('SAVING REPO DATA...');
  var temp = [];
  for (let i = 0; i < repoDataArray.length; i++) {
    Repo.findOneAndUpdate({ id: repoDataArray[i].id }, repoDataArray[i], {new: true, upsert: true}, (err, data) => {
      if (err) {
        cb(err);
      } else if (temp.length !== repoDataArray.length) {
        temp.push(repoDataArray[i]);
      }
      if (temp.length === repoDataArray.length) {
        console.log('SAVE FINALIZING...')
        cb(null, data);
      }
    });
  }
}

let retrieve25 = (cb) => {
  //retrieve the entire database?
  //then sort the query object, and then take the top 25 most starred repos?
  var top25 = [];
  Repo.find({}, (err, data) => {
    if (err) {
      cb(err);
    }})
    .sort({ stargazers_count: 'desc'})
    .limit(25)
    .exec((err, sorted) => {
      if (err) {
        cb(err);
      } else {
        cb(null, sorted);
      }
  });
}

module.exports.save = save;
module.exports.retrieve25 = retrieve25;