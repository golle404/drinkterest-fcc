import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {userLogoutRequest} from './../actions/authActions';
import {Link} from 'react-router';

class UserProfile extends React.Component {

  onClick(){
    this.props.dispatch(userLogoutRequest());
  }

  render () {
    return (
      <div>
        <p>{this.props.user.username}</p>
        <button onClick={this.onClick.bind(this)}>Logout</button>
        <Link to="/add_drink">Add Drink</Link>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user.toJS()
  }
}
export default connect(mapStateToProps)(UserProfile);
