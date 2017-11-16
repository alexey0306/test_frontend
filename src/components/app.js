import React, { Component } from 'react';
import Header from './common/header';
import Navigation from './common/navigation';
import Notification from './common/notification';
import Loader from './common/loader';
import SocketListener from './common/socket_listener';
import {Thumbnail,Panel} from 'react-bootstrap';
import BreadcrumbNew from './common/breadcrumb_new';
import { browserHistory } from 'react-router';
import {setLastItem} from '../actions/navigation_actions';


export default class App extends Component {
  render() {
    const initial_state = false;
    const items = [{id:1, name:"Users",link:"",isLink:false},{id:1, name:"Users",link:"",isLink:false},{id:1, name:"Users",link:"",isLink:false}];
    const header = <BreadcrumbNew style={{margin:'0px'}} />
    return (
      <div>
        <Header />
        <Notification />
        <div className="row">
          <div className="col-md-3">
            <Navigation/>
          </div>
          <div className="col-md-9" style={{padding:'20px'}}>
            <div className="saferoomContainer">
               <div className="saferoomHeader">{header}</div>
               <div className="saferoomContent">{this.props.children}</div>
            </div>
          </div>
        </div>
        <Loader show={initial_state} />
        <SocketListener />
      </div>
    );
  }
}

browserHistory.listen( location =>  {
  setLastItem(null);
});