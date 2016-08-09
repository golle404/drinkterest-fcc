import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {userLogoutRequest, userDeleteRequest} from './../actions/authActions';
import {Link} from 'react-router';

class UserProfile extends React.Component {

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
            <Link className="btn btn-primary-flat" to={"/user/" + username}>Your Submissions</Link>
            <Link className="btn btn-primary-flat" to="/submission/add">Submit Drink</Link>
          </div>
          <div className="profile-footer  center-align">
            <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
            <button className="btn btn-accent" onClick={this.handleDelete}>Delete Account</button>
          </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    user: state.user.toJS()
  };
}

export default connect(mapStateToProps)(UserProfile);
