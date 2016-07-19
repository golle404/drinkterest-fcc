import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {deleteDrinkRequest, likeDrinkRequest} from './../actions/drinksActions';

class DrinkItem extends React.Component {

  deleteDrink(){
    this.props.dispatch(deleteDrinkRequest({id:this.props.drink._id}));
  }

  likeDrink(){
    this.props.dispatch(likeDrinkRequest({id:this.props.drink._id}));
  }

  render () {
    const drink = this.props.drink;
    const userId = this.props.userId
    return (
      <li>
        <button onClick={this.likeDrink.bind(this)} disabled={!this.props.userAuth}>Like {drink.numLikes}</button>
        <div>{drink.name}</div>
        <Link to={"/drinks/recent/" + drink.submitterName}>{drink.submitterName}</Link>
        {!(drink.submitterId === userId) || <Link to={"/drink/edit/" + drink.id}>Edit</Link>}
        {!(drink.submitterId === userId) || <button onClick={this.deleteDrink.bind(this)}>Delete</button>}
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
