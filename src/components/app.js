import React, { Component } from 'react';
import Header from './common/header';
import Navigation from './common/navigation';
import Notification from './common/notification';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Notification />
        <div className="row">
          <div className="col-md-3">
            <Navigation/>
          </div>
          <div className="col-md-9">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}