import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        //Set default message
        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            redirect: false
        }
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /*Function for Sign Up Route */
    signup() {
        axios.post("http://localhost:3000/users/api/register", this.state).then((result) => {
            let responseJSON = result;
            console.log(responseJSON);
        })
    }

    /*Sets state for each input box*/
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <h1>Welcome! Please Sign Up!</h1>
                <div>
                    <label htmlFor="name">First Name: </label>
                    <input type="text" name="firstName" onChange={this.onChange} required />
                </div>
                <div>
                    <label htmlFor="name">Last Name: </label>
                    <input type="text" name="lastName" onChange={this.onChange} required />
                </div>
                <div>
                    <label htmlFor="name">Email: </label>
                    <input type="text" name="email" onChange={this.onChange} required />
                </div>
                <div>
                    <label htmlFor="name">Username: </label>
                    <input type="text" name="username" onChange={this.onChange} required />
                </div>
                <div>
                    <label htmlFor="name">Password</label>
                    <input type="text" name="password" onChange={this.onChange} required />
                </div>
                <div>
                    <Link to={`/users/api/profile/${this.state.username}`}><input type="submit" value="Sign Up" className="button" onClick={this.signup} /></Link>
                </div>
            </div>
        );
    }
}