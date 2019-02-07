import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

export default class Products extends Component {
  constructor(props) {
    super(props);
    //Set default message
    this.state = {
      message: 'I am the purchase page!',
      productData: [],
      productId: '',
      username: '',
      amountOrdered: '',
      purchaseOrderId: new Date().getUTCFullYear() + '' + (new Date().getUTCMonth() + 1) + '' + new Date().getUTCDate() + '' + new Date().getHours() + '' + new Date().getMinutes(),
      list: []
    }

    this.submitOrder = this.submitOrder.bind(this);
    this.postItem = this.postItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.profile = this.profile.bind(this);
  }

  /*Sets state for productName as we type in the input box */
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  /*Function for add item route. Posts item to database */
  submitOrder() {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", `http://localhost:3000/api/submitorder/${this.props.match.params.id}`);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(this.state.list));
    alert('Order Submitted!')
  }


  postItem() {
    axios.post(`http://localhost:3000/api/postitem/${this.props.match.params.id}`, this.state).then((result) => {
      function id(purchaseOrderId, username, productId, amountOrdered) {
        this.purchaseOrderId = purchaseOrderId;
        this.username = username;
        this.productId = productId;
        this.amountOrdered = amountOrdered;
      }

      this.setState(state => ({ list: [...state.list, new id(parseInt(this.state.purchaseOrderId), this.state.username, parseInt(this.state.productId), parseInt(this.state.amountOrdered))] }))
      console.log(JSON.stringify(this.state.list))
    })
  }

  profile() {
    axios.get(`http://localhost:3000/users/api/profile/${this.props.match.params.id}`)
  }

  fetchProductData = () => {
    return axios.get('http://localhost:3005/api/itemlist').then(response => {
      this.setState(() => {
        return {
          productData: response.data
        };
      });
    });
  };

  componentDidMount() {
    this.setState({ username: this.props.match.params.id });
    this.setState({ productId: '' });
    this.setState({ amountOrdered: '' });
    this.fetchProductData();
  }

  render() {
    console.log(this.state.purchaseOrderId);
    console.log(this.state.productData);
    console.log(this.state.list);
    if (this.state.productData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    }
    const products = this.state.productData.map(product => (
      <div key={product.ProductName}>
        <em>{product.ProductName}</em>: {product.ProductId}
      </div>

    ));
    return <div>
      <input type="text" name="productId" onChange={this.onChange} placeholder="Product ID" required /><br />
      <input type="text" name="amountOrdered" onChange={this.onChange} placeholder="Amount to Order" required /><br />
      <Link to={`/api/createorder/${this.state.username}`}><button type="submit" onClick={this.postItem}>Post Item</button></Link>
      <Link to={`/api/createorder/${this.state.username}`}><button type="submit" onClick={this.submitOrder}>Submit Order!</button></Link>
      <Link to={`/users/api/profile/${this.state.username}`}><button type="submit" value="Profile" className="button" onClick={this.profile}>Profile</button></Link>
      {products}
      <h3>Current Order</h3>
      <div>
        {this.state.list.map((product, index) => (
          <p>Id: {product.productId} Amount Ordered {product.amountOrdered}</p>
        ))}
      </div>

    </div>;
  }
}


