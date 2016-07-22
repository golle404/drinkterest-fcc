import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import HeaderBrand from './HeaderBrand';
import HeaderNavDefault from './HeaderNavDefault';
import HeaderNavAuth from './HeaderNavAuth';

class Header extends React.Component {
  render () {
    return (
        <header className="hg-header">
          <HeaderBrand/>
          {this.props.user.auth ? <HeaderNavAuth user={this.props.user}/> : <HeaderNavDefault/>}
        </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.toJS()
  }
}

export default connect(mapStateToProps)(Header);
