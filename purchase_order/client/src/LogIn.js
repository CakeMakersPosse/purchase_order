import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        //Set default message
        this.state = {
            userid:'',
            username: '',
            password: '',
            email:'',
            redirect: false
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /*Function for Login Route */
    login(){
        axios.post("http://localhost:3000/users/api/login",this.state).then((result) => {
            let responseJSON = result;
            let userid = responseJSON.data.UserId;
            console.log(responseJSON);
            console.log(JSON.stringify(responseJSON.data.Email));
            console.log(JSON.stringify(userid));
            
    })
}

/*Sets state username and password as its typed in*/
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <h1>Welcome! Please log in</h1>
                    <div>
                        <label htmlFor="name">Username: </label>
                        <input type="text" name="username" onChange={this.onChange} required />
                    </div>
                    <div>
                        <label htmlFor="name">Password: </label>
                        <input type="text" name="password" onChange={this.onChange} required />
                    </div>
                    <div>
                        <Link to = {`/users/api/profile/${this.state.username}`}><input type="submit" value="Login" className="button" onClick={this.login} /></Link>
                    </div>
            </div>
        );
    }
}