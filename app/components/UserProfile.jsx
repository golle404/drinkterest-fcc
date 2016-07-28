import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {userLogoutRequest, userDeleteRequest} from './../actions/authActions';
import {Link} from 'react-router';

class UserProfile extends React.Component {

  handleLogout(){
    this.props.dispatch(userLogoutRequest());
  }

  handleDelete(){
    this.props.dispatch(userDeleteRequest());
  }

  render () {
    const username = this.props.user.username;
    return (
      <div className="profile-container">
        <div className="profile-header center-align">Welcome {username}</div>
          <div className="profile-body center-align">
            <Link className="btn btn-primary-flat" to={"/submissions/latest/" + username}>Your Submissions</Link>
            <Link className="btn btn-primary-flat" to="/submission/add">Submit Drink</Link>
          </div>
          <div className="profile-footer  center-align">
            <button className="btn btn-primary" onClick={this.handleLogout.bind(this)}>Logout</button>
            <button className="btn btn-accent" onClick={this.handleDelete.bind(this)}>Delete Account</button>
          </div>
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
