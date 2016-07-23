import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {addSubmissionRequest, editSubmissionRequest} from './../actions/submissionsActions';

import FormInputGroup from './FormInputGroup';

class SubmissionForm extends React.Component {

  onFormSubmit(e){
    e.preventDefault();
    const newDrink = {
      name: this.refs.name.refs.input.value,
      url: this.refs.url.refs.input.value,
      image: this.refs.image.refs.input.value,
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
      <div className="form-container">
        <div className="form-header">
          <div className="form-header-tab">
            <span>{this.props.submission._id ? "Edit" : "Submit New"} Drink</span>
          </div>
        </div>
        <div className="form-body">
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <FormInputGroup
              id="name"
              ref="name"
              label="Name"
              type="text"
              autoFocus={true}
              required={true}
              defaultValue={this.props.submission.name} />
            <FormInputGroup
              id="url"
              ref="url"
              label="Link to page"
              type="text"
              defaultValue={this.props.submission.url} />
            <FormInputGroup
              id="image"
              ref="image"
              label="Image src"
              type="text"
              required={true}
              defaultValue={this.props.submission.image} />
              <div className="form-input-group center-align">
                <button type="submit" className="btn btn-primary">
                  {this.props.submission._id ? "Update" : "Save"}
                </button>
              </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    submission: state.submissions.data.toJS()[ownProps.params.id] || {}
  }
}

export default connect(mapStateToProps)(SubmissionForm);

/*
<form onSubmit={this.onSubmit.bind(this)}>
  <div>Add submission</div>
  <input type="text" ref="name" placeholder="name" defaultValue={this.props.submission.name} />
  <input type="text" ref="url" placeholder="url" defaultValue={this.props.submission.url}/>
  <input type="text" ref="image" placeholder="image" defaultValue={this.props.submission.image}/>
  <input type="submit" />
</form>
*/
