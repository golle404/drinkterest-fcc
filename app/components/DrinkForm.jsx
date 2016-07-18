import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {addDrinkRequest, editDrinkRequest} from './../actions/drinksActions';

class DrinkForm extends React.Component {

  onSubmit(e){
    e.preventDefault();
    const newDrink = {
      name: this.refs.name.value,
      url: this.refs.url.value,
      image: this.refs.image.value,
      id: this.props.drink._id
    }
    if(newDrink.id){
      this.props.dispatch(editDrinkRequest(newDrink))
    }else{
      this.props.dispatch(addDrinkRequest(newDrink))
    }
  }

  render () {
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        <div>Add drink</div>
        <input type="text" ref="name" placeholder="name" defaultValue={this.props.drink.name} />
        <input type="text" ref="url" placeholder="url" defaultValue={this.props.drink.url}/>
        <input type="text" ref="image" placeholder="image" defaultValue={this.props.drink.image}/>
        <input type="submit" />
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    drink: state.drinks.data.toJS()[ownProps.params.id] || {}
  }
}

export default connect(mapStateToProps)(DrinkForm);
