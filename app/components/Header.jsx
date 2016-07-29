import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {userLogoutRequest} from './../actions/authActions';

import HeaderBrand from './HeaderBrand';
import HeaderNav from './HeaderNav';

import Spinner from './Spinner';

class Header extends React.Component {

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
            <HeaderNav user={user} logoutHandler={this.handleLogout.bind(this)}/>
          </div>
        </header>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    user: state.user.toJS(),
    isFetching: state.numFetchRequests > 0
  }
}

export default connect(mapStateToProps)(Header);
