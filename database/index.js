const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

/* Top 25: number of forks... more forks at the top of the list */

let repoSchema = mongoose.Schema({
  owner_name: String,
  repo_urls: {
    type: Array,
    repo_id: Number,
    repo_name: String,
    repo_url: String,
    repo_description: String,
    repo_forks: Number
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (newDocument) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  Repo.findOne({owner_name: newDocument.owner_name}, (err, doc) => {
    if (!doc) {
      Repo.create(newDocument, (err) => {
        if (err) {
          return handleError(err);
        } else {
          console.log('Successfully created document');
        }
      })
      .catch((err) => {
        console.log('Error creating document: ', err);
      })
    }
    else {
      Repo.find({}, (err, docs) => {
        console.log('Document already exists: ', docs);
        })
      .catch((err) => {
        console.log('Error finding existing document: ', err);
      })
    }
  })
  .catch((err) => {
    // Repo.find({}, (err, docs) => {
      console.log('Error querying the database: ', err);
    // })
  })
}

module.exports.save = save;