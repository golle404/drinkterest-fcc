import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {loadSubmissionsRequest} from './../actions/submissionsActions';

import DrinksGrid from './DrinksGrid'

class DrinksPage extends React.Component {

  loadMore(){
    let queryString = this.props.params.sort || "latest"
    queryString += "/" + (this.props.params.user || "")
    queryString += "?skip=" + this.props.idx.length;
    this.props.dispatch(loadSubmissionsRequest(queryString))
  }

  render () {
    const loadMore = <button onClick={this.loadMore.bind(this)}>Load More</button>
    return (
      <div>
        <DrinksGrid data={this.props.submissions} idx={this.props.idx}/>
        {(this.props.idx.length >= this.props.total) || loadMore}
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const queryStr = (ownProps.params.sort || "latest") + "/" + (ownProps.params.user || "");
  const stateQueries = state.submissions.queries.toJS();
  let newProps = {}
  if(stateQueries[queryStr]){
    newProps.idx = stateQueries[queryStr].idx;
    newProps.total = stateQueries[queryStr].total;
  }
  return {
    submissions: state.submissions.data.toJS(),
    total: newProps.total || 0,
    idx: newProps.idx || []
  }
}

export default connect(mapStateToProps)(DrinksPage);
