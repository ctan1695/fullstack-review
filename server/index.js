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
    // repos: []
    repo_name: ''
  };

  githubHelper.getReposByUsername(req.body.username)
    .then((response) => {
      // repos_schema.repos = response;
      repos_schema.repo_name = response[0].repo_name;
      dbHelper.save(repos_schema);
    })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

