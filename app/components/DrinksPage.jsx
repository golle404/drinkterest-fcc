import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import DrinksGrid from './DrinksGrid'

class DrinksPage extends React.Component {
  render () {
    return (
      <DrinksGrid data={this.props.drinks} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drinks: state.drinks.data
  }
}

export default connect(mapStateToProps)(DrinksPage);
