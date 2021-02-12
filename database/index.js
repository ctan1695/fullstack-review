const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

/* Top 25: number of forks... more forks at the top of the list */

let repoSchema = mongoose.Schema({
  owner_name: String,
  repos: {
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

  /*  Use this to remove all documents from db while testing  */
  // Repo.remove({}, () => {
  //   console.log('removed')
  // })

  Repo.find({}, (err, doc) => {
    console.log('All documents: ', doc);
  })
  .catch(() => {
    console.log('err');
  })

  Repo.findOne({owner_name: newDocument.owner_name}, (err, doc) => {
    console.log('findingbyowner', doc);
    if (err) {
      return handleError(err);
    } else if (!doc) {
      var repoSchemaInstance = new Repo({
        owner_name: newDocument.owner_name,
        repos: newDocument.repos
      })
      repoSchemaInstance.save()
        .then(() => {
          console.log('Successfully saved document: ', repoSchemaInstance);
        })
    } else {
      console.log('Document already exists for: ', newDocument);
    }
  })
  .catch((err) => {
      console.log('Error querying the database (findOne): ', err);
  })
}

module.exports.save = save;