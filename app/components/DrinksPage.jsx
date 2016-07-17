import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {drinksListRequest} from './../actions/drinksActions';

import DrinksGrid from './DrinksGrid'

class DrinksPage extends React.Component {

  loadMore(){
    const params = {
      submitterName: this.props.params.user || "",
      sort: this.props.params.sort || "recent",
      start: this.props.drinks.size
    }
    this.props.dispatch(drinksListRequest(params))
  }

  render () {
    const loadMore = <button onClick={this.loadMore.bind(this)}>Load More</button>
    return (
      <div>
        <DrinksGrid data={this.props.drinks} />
        {(this.props.drinks.size >= this.props.total) || loadMore}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    drinks: state.drinks.data,
    total: state.drinks.info.get("total")
  }
}

export default connect(mapStateToProps)(DrinksPage);
