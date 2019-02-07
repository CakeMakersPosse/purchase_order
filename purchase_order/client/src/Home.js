import React, { Component } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';

export default class Home extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      message: 'Loading...'
    }
  }
  
/*Home page displaying SignUp and LogIn Components */

  render() {
    return (
      <div>
        <SignUp />
        <br />
        <LogIn />
      </div>
    );
  }
}