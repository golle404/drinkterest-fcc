import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {userLogoutRequest} from './../actions/authActions';

class User extends React.Component {

  onClick(){
    this.props.dispatch(userLogoutRequest());
  }

  render () {
    console.log(this.props.user.username);
    return (
      <div>
        <p>{this.props.user.username}</p>
        <button onClick={this.onClick.bind(this)}>Logout</button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user.toJS()
  }
}
export default connect(mapStateToProps)(User);
