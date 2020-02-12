import React,{ Component} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import './App.css'
import Users from './Components/Users/Users'
import axios from 'axios';
import Search from './Components/Users/Search'
import Alert from './Components/Layout/Alert'
import About from './Components/pages/About';
import User from './Components/Users/User'


class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  }
 
  
  searchUsers = async text => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     
    this.setState({users : res.data.items, loading: false})
  }
  
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }
  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type}})
    setTimeout(()=> this.setState({alert: null}), 5000)
  }
  
  getUser = async (username) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     console.log(res.data);
     
    this.setState({user : res.data, loading: false}) 
  }
  
  getUserRepos = async (username) => {
    this.setState({ loading: true});
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data)
    this.setState({repos : res.data, loading: false}) 
  }
  
  render() {
    return (
      <Router>
        
      <div className="App">
        <Navbar />
        <div className="container">
        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path='/' render={
            props => (
              <div>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 } setAlert={this.setAlert}/>
                <Users loading={this.state.loading} users={this.state.users}  />
              </div>
            )
          } />
          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props => (
            <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={this.state.repos} user={this.state.user} loading={this.state.loading} />
          )} />
        </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
