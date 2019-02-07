import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    //Set default message
    this.state = {
      message: 'I am the add item page!',
      username:'',
      productName:''
    }
    this.onChange = this.onChange.bind(this);
    this.profile = this.profile.bind(this);
    this.additem = this.additem.bind(this);
  }

  /*Sets state for productName as we type in the input box */
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

/*Function for add item route. Posts item to database */
  additem(){ 
    axios.post(`http://localhost:3000/api/additem/${this.props.match.params.id}`,this.state).then((result) => {
        let responseJSON = result;
        console.log(responseJSON);    
        alert('Item Added!');
})
}

/*Function for back to profile route */
  profile() {
    axios.get(`http://localhost:3000/users/api/profile/${this.props.match.params.id}`)
  }

/*Sets state so the add item button Routes back to same add item page */
  componentDidMount(){
    this.setState({username:this.props.match.params.id })
    this.setState({productName:''})

  } 

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
          Add Item!
          <input type="text" name="productName" onChange={this.onChange} required /><br />
          <Link to = {`/api/additem/${this.state.username}`}><button type="submit" onClick={this.additem}>Submit!</button></Link>
        <div>
          <Link to={`/users/api/profile/${this.state.username}`}> <input type="submit" value="Profile" className="button" onClick={this.profile} /></Link>
        </div>
      </div>
    );
  }
}