import React, { Component } from 'react';
import Header from './common/header';
import Navigation from './common/navigation';
import Notification from './common/notification';
import Loader from './common/loader';

export default class App extends Component {
  render() {
    const initial_state = false;
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
        <Loader show={initial_state} />
      </div>
    );
  }
}