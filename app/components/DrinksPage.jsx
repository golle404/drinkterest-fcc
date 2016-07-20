import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {loadDrinksRequest} from './../actions/drinksActions';

import DrinksGrid from './DrinksGrid'

class DrinksPage extends React.Component {

  loadMore(){
    const params = {
      submitterName: this.props.params.user || "",
      sort: this.props.params.sort || "recent",
      start: this.props.idx.length
    }
    this.props.dispatch(loadDrinksRequest(params))
  }

  render () {
    const loadMore = <button onClick={this.loadMore.bind(this)}>Load More</button>
    return (
      <div>
        <DrinksGrid data={this.props.drinks} idx={this.props.idx}/>
        {(this.props.idx.length >= this.props.total) || loadMore}
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const queryStr = (ownProps.params.sort || "recent") + "/" + (ownProps.params.user || "");
  const stateQueries = state.drinks.queries.toJS();
  let newProps = {}
  if(stateQueries[queryStr]){
    newProps.idx = stateQueries[queryStr].idx;
    newProps.total = stateQueries[queryStr].total;
  }
  return {
    drinks: state.drinks.data.toJS(),
    total: newProps.total || 0,
    idx: newProps.idx || []
  }
}

export default connect(mapStateToProps)(DrinksPage);
