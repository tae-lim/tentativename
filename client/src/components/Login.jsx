import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      isLoggedIn: true
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  onSubmitHandler(e) {
    console.log('onSubmitHandler', this.state)
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(data => {
      //if the server indicates that the user is logged in
      //isLoggedIn is true
      this.setState({
        isLogged: true
      });
    })
    .then(() => {
      if (this.state.isLoggedIn) {
        this.props.history.push("/home");
      }
    })
    .catch(() => {
      window.alert('Incorrect Username and Password. Please try again');
      //e.preventDefault();
    })
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name] : e.target.value
    }, () => console.log(this.state));
  }

  onRegister() {
    this.props.history.push("/signup");
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Slytherin</h1>
          <form>
            <div>
              Login: <br/>
              <input value={this.state.name} type="text" name="name" placeholder="Username" onChange={this.onChangeHandler} required/>
            </div><br/>
            <div>
              Password: <br/>
              <input value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.onChangeHandler} required/>
            </div><br/>
            <div>
              <button type="submit" onClick={this.onSubmitHandler}>Login</button>
              <button type="submit" onClick={this.onRegister}>Register</button>
            </div>
          </form>
        </div>
      </Router>
    );
  }
}


export default withRouter(Login);