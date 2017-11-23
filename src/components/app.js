import React, { Component } from 'react';
import Header from './common/header';
import Navigation from './common/navigation';
import Notification from './common/notification';
import Loader from './common/loader';
//import SocketListener from './common/socket_listener';
import {Thumbnail,Panel} from 'react-bootstrap';
import BreadcrumbNew from './common/breadcrumb_new';
import { browserHistory } from 'react-router';
import {setLastItem} from '../actions/navigation_actions';
import {setService} from '../actions/globals_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class App extends Component {

  render() {
    this.props.setService(this.props.params.id);
    const initial_state = false;
    const header = <BreadcrumbNew service={this.props.service} style={{margin:'0px'}} />
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
               <div className="saferoomHeader saferoom-default">{header}</div>
               <div className="saferoomContent">{this.props.children}</div>
            </div>
          </div>
        </div>
        <Loader show={initial_state} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {service: state.accounts.service};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setService},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);