import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {likeSubmissionRequest, deleteSubmissionRequest} from './../actions/submissionsActions';

import {Link} from 'react-router';
import ImageLoader from 'react-imageloader';
import SubmissionToolbar from './SubmissionToolbar.jsx';


class SubmissionTile extends React.Component {

  constructor(props){
    super(props);
    this.likeRequest = this.likeRequest.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  likeRequest(){
    this.props.dispatch(likeSubmissionRequest(this.props.submission._id));
  }

  deleteRequest(){
    this.props.dispatch(deleteSubmissionRequest(this.props.submission._id));
  }

  render () {
    const submission = this.props.submission;
    const user = this.props.user;
    const voted = user.auth && submission.likes.indexOf(user.id.toString()) != -1;
    return (
      <div className="submission-tile">
        <div className="submission-tile-image">
          <ImageLoader src={submission.image} />
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
              onClick={this.likeRequest}>
              {submission.numLikes}
            </button>
          </span>
        </div>
        {submission.submitterId != user.id || <SubmissionToolbar
          deleteRequest={this.deleteRequest}
          id={submission._id.toString()} />}
      </div>
    );
  }
}

SubmissionTile.propTypes = {
  user: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.user.toJS()
  };
};

export default connect(mapStateToProps)(SubmissionTile);
