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
      axios.get(response.data.repos_url)
        .then((all_repos) => {
          console.log('repo owner name: ', all_repos.data[0].owner.login);
          console.log('repo owner id: ', all_repos.data[0].owner.id);
          console.log('repo id: ', all_repos.data[0].id);
          console.log('repo name: ', all_repos.data[0].name);
          console.log('repo url: ', all_repos.data[0].html_url);
          console.log('repo description: ', all_repos.data[0].description);
          console.log('repo forks: ', all_repos.data[0].forks_count);
        })
    })
}

module.exports.getReposByUsername = getReposByUsername;