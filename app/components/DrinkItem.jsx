import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {deleteSubmissionRequest, likeSubmissionRequest} from './../actions/submissionsActions';

class DrinkItem extends React.Component {

  deleteDrink(){
    this.props.dispatch(deleteSubmissionRequest(this.props.submission._id));
  }

  likeDrink(){
    this.props.dispatch(likeSubmissionRequest(this.props.submission._id));
  }

  render () {
    const submission = this.props.submission;
    const userId = this.props.userId
    return (
      <li>
        <button onClick={this.likeDrink.bind(this)} disabled={!this.props.userAuth}>Like {submission.numLikes}</button>
        <div>{submission.name}</div>
        <Link to={"/submissions/recent/" + submission.submitterName}>{submission.submitterName}</Link>
        {!(submission.submitterId === userId) || <Link to={"/submission/edit/" + submission._id}>Edit</Link>}
        {!(submission.submitterId === userId) || <button onClick={this.deleteDrink.bind(this)}>Delete</button>}
      </li>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.toJS().id,
    userAuth: state.user.toJS().auth
  }
}

export default connect(mapStateToProps)(DrinkItem);
