import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import {userAuthRequest} from './../actions/authActions';

import FormInputGroup from './FormInputGroup';

class AuthForm extends React.Component {

  onFormSubmit(e){
    e.preventDefault()
    const loginData = {
      username: this.refs.username.refs.input.value,
      password: this.refs.password.refs.input.value,
      register: this.props.register
    }
    this.props.dispatch(userAuthRequest(loginData));
  }

  render () {
    return (
      <div className="form-body">
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <FormInputGroup id="username" ref="username" label="Username" type="text" autoFocus={true} />
          <FormInputGroup id="password" ref="password" label="Password" type="password" />
            <div className="form-input-group center-align">
              <button type="submit" className="btn btn-primary">{this.props.register ? "Register" : "Login"}</button>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(AuthForm);
