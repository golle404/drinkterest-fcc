import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {loadSubmissionsRequest} from './../actions/submissionsActions';

import SubmissionsHeader from './SubmissionsHeader';
import Masonry from './Masonry';
import SubmissionTile from './SubmissionTile';

class SubmissionsPage extends React.Component {

  loadMore(){
    let queryString = (this.props.params.submitter || "");
    queryString += "?skip=" + this.props.idx.length;
    this.props.dispatch(loadSubmissionsRequest(queryString))
  }

  render () {
    const loadMore = <button className="btn btn-primary" onClick={this.loadMore.bind(this)}>Load More</button>
    return (
      <div className="submissions-container">
        <SubmissionsHeader sort={this.props.sort} submitter={this.props.submitter} />
        <div className="submissions-body">
          <Masonry  breakPoints={[300, 600, 900]}>
            {this.props.idx.map((id) => {
              const submission = this.props.submissions[id]
              return (
                <SubmissionTile key={id} submission={submission} />
              )
            })}
          </Masonry>
        </div>
        <div className="submissions-footer center-align">
          {(this.props.idx.length >= this.props.total) || loadMore}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const submitter = ownProps.params.submitter || "";
  //const submissions = state.submissions.toJS()
  return {
    submissions: state.submissions.data.toJS() || {},
    total: state.submissions.total || 0,
    idx: state.submissions.idx.toJS() || [],
    submitter: submitter
  }
}

export default connect(mapStateToProps)(SubmissionsPage);
