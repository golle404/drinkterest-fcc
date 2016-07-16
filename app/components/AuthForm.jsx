import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import {userAuthRequest} from './../actions/authActions';

class AuthForm extends React.Component {

  onFormSubmit(e){
    e.preventDefault()
    const loginData = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      register: this.props.register
    }
    this.props.dispatch(userAuthRequest(loginData));
  }

  render () {
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <input type="text" ref="username" autoFocus/>
        <input type="password" ref="password"/>
        <input type="submit" />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(AuthForm);
