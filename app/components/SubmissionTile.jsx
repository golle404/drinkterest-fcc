import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {likeSubmissionRequest, deleteSubmissionRequest} from './../actions/submissionsActions';

import {Link} from 'react-router';
import SubmissionToolbar from './SubmissionToolbar';

class SubmissionTile extends React.Component {

  likeRequest(){
    this.props.dispatch(likeSubmissionRequest(this.props.submission._id))
  }

  deleteRequest(){
    this.props.dispatch(deleteSubmissionRequest(this.props.submission._id));
  }
  render () {
    const submission = this.props.submission;
    const user = this.props.user;
    const voted = user.auth && submission.likes.indexOf(user.id) != -1;
    return (
      <div className="submission-tile">
        <div className="submission-tile-image">
          <img src={submission.image} />
          <a
            className="submission-tile-overlay"
            href={submission.url}>
            {submission.name}
          </a>
        </div>
        <div className="submission-tile-footer">
          <span>
            by <Link to={"/user/" + submission.submitterName}>{submission.submitterName}</Link>
          </span>
          <span>
            <button
              className={"btn like-button " + (voted ? "voted" : "")}
              disabled={!user.auth}
              onClick={this.likeRequest.bind(this)}>
              {submission.numLikes}
            </button>
          </span>
        </div>
        {submission.submitterId != user.id || <SubmissionToolbar
          onDelete={this.deleteRequest.bind(this)}
          id={submission._id}/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.toJS()
  }
}
export default connect(mapStateToProps)(SubmissionTile);
