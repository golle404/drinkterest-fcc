import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {loadSubmissionsRequest} from './../actions/submissionsActions';

import SubmissionsHeader from './SubmissionsHeader.jsx';
import Masonry from './Masonry.jsx';
import SubmissionTile from './SubmissionTile.jsx';

class SubmissionsPage extends React.Component {

  constructor(props){
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(){
    let queryString = (this.props.params.submitter || "");
    queryString += "?skip=" + this.props.idx.length;
    this.props.dispatch(loadSubmissionsRequest(queryString));
  }

  render () {
    const loadMore = this.props.idx.length >= this.props.total;
    return (
      <div className="submissions-container">
        <SubmissionsHeader submitterName={this.props.submitterName} />
        <div className="submissions-body">
          <Masonry  breakPoints={[300, 600, 900]}>
            {this.props.idx.map((id) => {
              const submission = this.props.submissions[id];
              return (
                <SubmissionTile key={id} submission={submission} />
              );
            })}
          </Masonry>
        </div>
        <div className="submissions-footer center-align">
          {loadMore || <button className="btn btn-primary" onClick={this.loadMore}>Load More</button>}
        </div>
      </div>

    );
  }
}

SubmissionsPage.propTypes = {
  submissions: PropTypes.object.isRequired,
  idx: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  submitterName: PropTypes.string.isRequired,
  params:PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const submitterName = ownProps.params.submitter || "*";
  const data = state.submissions.data.toJS() || {};
  const submitters = state.submissions.submitters.toJS() || {};
  const submitter = submitters[submitterName] || {};
  return {
    submissions: data,
    idx: submitter.idx || [],
    total: submitter.total || 0,
    submitterName: ownProps.params.submitter || "Latest"
  };
};

export default connect(mapStateToProps)(SubmissionsPage);
