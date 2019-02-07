import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Products from './Products';
import AddItem from './AddItem';


export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/api/profile/:id" component={Profile}/> 
          <Route path="/api/createorder/:id" component={Products} />
          <Route path="/api/additem/:id" component={AddItem} />
        </Switch>
        
      </div>
    );
    
  }
}