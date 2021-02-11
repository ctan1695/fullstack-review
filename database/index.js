const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

/* Top 25: number of forks... more forks at the top of the list */

let repoSchema = mongoose.Schema({
  owner_name: String,
  repo_urls: [
    repo_url: {
      repo_id: Number,
      repo_name: String,
      repo_url: String,
      repo_description: String
      repo_forks: Number
    }
  ]
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;