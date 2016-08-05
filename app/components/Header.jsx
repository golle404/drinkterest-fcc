import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {userLogoutRequest} from './../actions/authActions';

import HeaderBrand from './HeaderBrand.jsx';
import HeaderNav from './HeaderNav.jsx';
import Spinner from './Spinner.jsx';

class Header extends React.Component {

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.props.dispatch(userLogoutRequest());
  }

  render () {
    const {user, isFetching} = this.props;
    return (
        <header className="hg-header">
          <div>
            <HeaderBrand />
            <Spinner active={isFetching}/>
          </div>
          <div>
            <HeaderNav user={user} logoutHandler={this.handleLogout}/>
          </div>
        </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.user.toJS(),
    isFetching: state.numFetchRequests > 0
  };
};

export default connect(mapStateToProps)(Header);
