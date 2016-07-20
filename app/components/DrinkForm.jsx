import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {addSubmissionRequest, editSubmissionRequest} from './../actions/submissionsActions';

class DrinkForm extends React.Component {

  onSubmit(e){
    e.preventDefault();
    const newDrink = {
      name: this.refs.name.value,
      url: this.refs.url.value,
      image: this.refs.image.value,
      id: this.props.submission._id
    }
    if(newDrink.id){
      this.props.dispatch(editSubmissionRequest(newDrink))
    }else{
      this.props.dispatch(addSubmissionRequest(newDrink))
    }
  }

  render () {
    return(
      <form onSubmit={this.onSubmit.bind(this)}>
        <div>Add submission</div>
        <input type="text" ref="name" placeholder="name" defaultValue={this.props.submission.name} />
        <input type="text" ref="url" placeholder="url" defaultValue={this.props.submission.url}/>
        <input type="text" ref="image" placeholder="image" defaultValue={this.props.submission.image}/>
        <input type="submit" />
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    submission: state.submissions.data.toJS()[ownProps.params.id] || {}
  }
}

export default connect(mapStateToProps)(DrinkForm);
