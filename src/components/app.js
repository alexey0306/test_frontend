import React, { Component } from 'react';
import Header from './common/header';
import Navigation from './navigation/navigation';
import Notification from './common/notification';
import Loader from './common/loader';
//import SocketListener from './common/socket_listener';
import {Thumbnail,Panel} from 'react-bootstrap';
import BreadcrumbNew from './common/breadcrumb_new';
import { browserHistory } from 'react-router';
// Import section
import {setLastItem} from '../actions/navigation_actions';
import {setService} from '../actions/globals_actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Sidebar from 'react-sidebar';

// Init section
const mql = window.matchMedia(`(min-width: 800px)`);
const sidebarContent = <Navigation />;
const initial_state = false;

// Class section
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
    };
    this.onSetOpen = this.onSetOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onBarsClicked = this.onBarsClicked.bind(this);
  }

  componentWillMount(){
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount(){
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged(){
    this.setState({sidebarDocked: this.state.mql.matches});
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  onBarsClicked(){
    var opened = !this.state.open;
    this.setState({open:opened});
  }

  render() {
    this.props.setService(this.props.params.id);


    const sidebarProps = {
      sidebar: sidebarContent,
      docked: this.state.docked,
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    const header = <BreadcrumbNew service={this.props.service} style={{margin:'0px'}} />

    return (
      <div>
        <Sidebar {...sidebarProps}>
            <Header onBarsClicked={this.onBarsClicked} />
            <Notification />
            <div className="row">
              <div className="col-md-12" style={{padding:'40px'}}>
                <div className="saferoomContainer">
                  <div className="saferoomHeader saferoom-default">{header}</div>
                  <div className="saferoomContent">{this.props.children}</div>
                </div>
              </div>
            </div>
            <Loader show={initial_state} />
        </Sidebar>        
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