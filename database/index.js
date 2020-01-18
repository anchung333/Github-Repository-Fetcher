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
  "watchers_count": Number,
  "forks_count": Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoDataArray, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //also perform check for dup repos using repo id
  console.log('SAVING REPO DATA...');
  for (let i = 0; i < repoDataArray.length; i++) {
    Repo.findOneAndUpdate({ id: repoDataArray[i].id }, repoDataArray[i], {new: true, upsert: true}, (err) => {
      if (err) {
        cb(err);
      }
    });
  }
  cb(null);
}

let retrieve25 = () => {
  //retrieve the entire database?
  //then sort the query object, and then take the top 25 most starred repos?
  var top25 = [];
  var queryAllSorted = Repo.find({}).sort({ stargazers_count: 'desc'});
  for (let i = 0; i < 25; i++) {
    top25.push(queryAllSorted[i]);
  }
  return top25;
}

module.exports.save = save;
module.exports.retrieve25 = retrieve25;