const axios = require('axios');

//Only look for config file if it's not production!
if (process.env.NODE_ENV !== 'production') {
  const config = require('../config.js');
}

let getReposByUsername = (username) => {
  let options = {
    url: 'https://api.github.com/users/' + username.toString(),
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUB_API_TOKEN || config.TOKEN}`
    }
  };

  return axios.get(options.url)
    .then((response) => {
      return axios.get(response.data.repos_url);
    })
    .then((all_repos) => {
      var repos = [];

      for (var i = 0; i < all_repos.data.length; i++) {
        var repo = all_repos.data[i];
        var repoDetails = {
          repo_id: repo.id,
          repo_name: repo.name,
          repo_url: repo.html_url,
          repo_description: repo.description,
          repo_forks: repo.forks_count
        };

        repos.push(repoDetails);
      }

      return Promise.resolve(repos);
    })
    .catch((err) => {
      console.log('Error retrieving user repos: ', err);
    })
}

module.exports.getReposByUsername = getReposByUsername;