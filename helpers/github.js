const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username.toString(),
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(options.url)
    .then((response) => {
      console.log('axios response... repos url: ', response.data.repos_url);
      axios.get(response.data.repos_url)
        .then((response_two) => {
          console.log('axios response 2... after getting all repors: ', response_two);
        })
    })
}

module.exports.getReposByUsername = getReposByUsername;