const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

/* Top 25: number of forks... more forks at the top of the list */

let repoSchema = mongoose.Schema({
  owner_name: String,
  // repos: {
  //   type: Array,
  //   repo_id: Number,
  //   repo_name: String,
  //   repo_url: String,
  //   repo_description: String,
  //   repo_forks: Number
  // }
  repo_name: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (newDocument) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // var newDocumentInstance = new Repo({
  //   owner_name: newDocument.owner_name,
  //   repo_name: newDocument.repo_name
  // });

  // newDocumentInstance.save((err) => {
  //   if (err) {
  //     return handleError(err);
  //   } else {
  //     console.log('saved doc');
  //   }
  // })

  /*  Use this to remove all documents from db while testing  */
  Repo.find({}, (err, doc) => {
    console.log('find: ', doc);
  })
  .catch(() => {
    console.log('err');
  })

  // Repo.findOne({owner_name: newDocument.owner_name}, (err, doc) => {
  //   if (!doc) {
  //     // Repo.create(newDocument, (err) => {
  //     //   console.log('newDocument: ', newDocument);
  //     //   if (err) {
  //     //     return handleError(err);
  //     //   } else {
  //     //     console.log('Successfully created document');
  //     //   }
  //     // })
  //     // .catch((err) => {
  //     //   console.log('Error creating document: ', err);
  //     // })
  //   }
  //   else {
  //     console.log('Document already exists: ', doc);
  //   }
  // })
  // .catch((err) => {
  //     console.log('Error querying the database: ', err);
  // })
}

module.exports.save = save;