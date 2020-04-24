const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {
  // Use the request module to request repos for a specific
  // user from the github API
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    }
  };

  let callback = (error, response, body) => {
    if (!error) {
      var info = JSON.parse(body);
      cb(null, info);
    } else {
      console.log(error);
      cb(error);
    }
  };

  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;