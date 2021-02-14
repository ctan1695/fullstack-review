const express = require('express');
const bodyParser = require('body-parser');
const githubHelper = require(__dirname + '/../helpers/github.js');
const dbHelper = require(__dirname + '/../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var repos_schema = {
    owner_name: req.body.username,
    repos: []
  };

  githubHelper.getReposByUsername(req.body.username)
    .then((response) => {
      //console.log('POST response: ', response);
      repos_schema.repos = response;
      dbHelper.save(repos_schema)
    })
    .catch((err) => {
      console.log('Error getReposByUsername: ', err);
    })
    .then(() => {
      console.log('redirecting to /repos');
      res.redirect('/repos');
    })
});

app.get('/repos', function (req, res) {
  console.log('GET REPOS');
  // TODO - your code here!
  // This route should send back the top 25 repos
  dbHelper.getTopRepos()
    .then((result) => {
      //console.log(' GET result: ', result);
      res.send(result);
    })
    .catch((err) => {
      console.log('Error getTopRepos: ', err);
    })
});

let port = process.env.PORT;
console.log('port: ', port);
if (!port || port === '') {
  port = 1128;
}

console.log('port: ', port);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

