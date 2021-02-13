import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: (response) => {
        console.log('Successful GET: ', response.length.toString());
        this.setState({repos: response});
      },
      error: (err) => {
        console.log('Errored GET: ', err);
      }
    })

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: {username: term},
      dataType: 'text',
      success: (response) => {
        this.setState({repos: JSON.parse(response)});
      },
      error: (err) => {
        console.log('Errored POST: ', err);
      }
    })

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));