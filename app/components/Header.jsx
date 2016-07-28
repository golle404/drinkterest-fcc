import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {userLogoutRequest} from './../actions/authActions';

import HeaderBrand from './HeaderBrand';
import HeaderNavDefault from './HeaderNavDefault';
import HeaderNavAuth from './HeaderNavAuth';

class Header extends React.Component {

  handleLogout(){
    this.props.dispatch(userLogoutRequest());
  }

  render () {
    const user = this.props.user;
    return (
        <header className="hg-header">
          <HeaderBrand />
          {user.auth ? <HeaderNavAuth user={user} logoutHandler={this.handleLogout.bind(this)}/> : <HeaderNavDefault/>}
        </header>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    user: state.user.toJS()
  }
}

export default connect(mapStateToProps)(Header);
