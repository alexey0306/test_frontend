import React, { Component } from 'react';
import Header from './common/header';
import Navigation from './navigation/navigation';
import Notification from './common/notification';
import Loader from './common/loader';
import SocketListener from './common/socket_listener';
import {Thumbnail,Panel} from 'react-bootstrap';
import BreadcrumbNew from './common/breadcrumb_new';
import {setLastItem,toggleSidebar} from '../actions/navigation_actions';
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
    this.props.toggleSidebar(open);
  }

  onBarsClicked(){
    this.props.toggleSidebar(true);
  }

  render() {
    this.props.setService(this.props.params.id);
    const header = <BreadcrumbNew service={this.props.service} style={{margin:'0px'}} />

    // Checking if user is authenticated
    if (this.props.loggedIn){
      return (
        <div>{this.props.children}</div>
      )
    }
    

    return (
      <div>
        <Sidebar 
            open={this.props.sidebarOpened} 
            docked={false} shadow={true} 
            pullRight={false} sidebar={sidebarContent} touch={false} 
            transitions={true} onSetOpen={this.onSetOpen} >
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
            <SocketListener />
        </Sidebar>        
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    service: state.accounts.service,
    sidebarOpened: state.breadcrumbs.sidebarOpened,
    loggedIn: state.auth.loggedIn
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setService,toggleSidebar},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);