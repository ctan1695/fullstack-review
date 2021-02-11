const express = require('express');
const bodyParser = require('body-parser');
const helper = require(__dirname + '/../helpers/github.js');
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

  var helperResults = helper.getReposByUsername(req.body.username);

  console.log('helperResults: ', helperResults);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

