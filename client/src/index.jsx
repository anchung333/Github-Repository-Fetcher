import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repo from './components/Repo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //send POST request to /repos with the term in the req.body
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({'term': term}),
      success: () => {
        console.log('POST REQUEST SUCCESSFULLY SENT TO SERVER');
        this.retrieve25();
      },
      error:  (err) => console.log('ERROR SENDING POST REQUEST TO SERVER: ', err)
    })
  }

  //add a retrieve method here to fill the this.state.repos array with the top 25
  retrieve25 () {
    console.log('RETRIEVAL INITIATED');
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'GET',
      success: (top25Repos) => {
        this.setState({
          repos: top25Repos
        });
        console.log(this.state.repos);
      },
      error: (err) => console.log('ERROR SENDING GET REQUEST TO SERVER: ', err)
    })
  }

  componentDidMount () {
    this.retrieve25();
  }

  render () {
    return (<div>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} retrieve25={this.retrieve25.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));