import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        //Set default message
        this.state = {
            message: 'Default Profile',
            FirstName: '',
            userid: '',
            username:''
        }
        this.additem = this.additem.bind(this);
        this.purchase = this.purchase.bind(this);
        this.logout = this.logout.bind(this);
        
    }

/*Function for Logout Route */
    logout() {
        axios.get("http://localhost:3000/users/logout")
    }

/*Function for Purchase Order Route */
   purchase() {
        axios.get(`http://localhost:3000/api/createorder/${this.props.match.params.id}`, this.state).then((result) => {
            let responseJSON = result;
            console.log(responseJSON);
        });
    } 

/*Function for Add Item Route*/
    additem() {
        axios.get(`http://localhost:3000/api/additem/${this.props.match.params.id}`, this.state).then((result) => {
            let responseJSON = result;
            console.log(responseJSON);
        });
    } 

/*This sets the state to display the username */
componentDidMount(){
    this.setState({username:this.props.match.params.id })
    
  }
    render() {
        return (
            <div>
                <h1>Welcome {this.state.username} to your profile!</h1>
                <p>{this.state.message}</p>
                <div>
                    <Link to={`/api/createorder/${this.state.username}`}><input type="submit" value="Purchase" className="button" onClick={this.purchase} /></Link>
                </div>
                <div>
                <Link to = {`/api/additem/${this.state.username}`}><input type="submit" value="AddItem" className="button" onClick={this.additem} /></Link>
                </div>
                <div>
                    <Link to={`/`}> <input type="submit" value="LogOut" className="button" onClick={this.logout} /></Link>
                </div>
            </div>
        );
    }
}