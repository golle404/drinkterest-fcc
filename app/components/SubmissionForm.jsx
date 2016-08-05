import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {addSubmissionRequest, editSubmissionRequest} from './../actions/submissionsActions';

import FormInputGroup from './FormInputGroup.jsx';

class SubmissionForm extends React.Component {

  constructor(props){
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();
    const newDrink = {
      name: this.refs.name.refs.input.value,
      url: this.refs.url.refs.input.value,
      image: this.refs.image.refs.input.value,
      id: this.props.submission._id
    };
    if(newDrink.id){
      this.props.dispatch(editSubmissionRequest(newDrink));
    }else{
      this.props.dispatch(addSubmissionRequest(newDrink));
    }
  }

  render () {
    const {_id, name, url, image} = this.props.submission;

    return(
      <div className="form-container">
        <div className="form-header">
          <div className="form-header-tab">
            <span>{_id ? "Edit" : "Submit New"} Drink</span>
          </div>
        </div>
        <div className="form-body">
          <form onSubmit={this.onFormSubmit}>
            <FormInputGroup
              id="name"
              ref="name"
              label="Name"
              type="text"
              autoFocus
              required
              defaultValue={name} />
            <FormInputGroup
              id="url"
              ref="url"
              label="Link to page"
              type="text"
              defaultValue={url} />
            <FormInputGroup
              id="image"
              ref="image"
              label="Image src"
              type="text"
              required
              defaultValue={image} />
              <div className="form-input-group center-align">
                <button type="submit" className="btn btn-primary">
                  {_id ? "Update" : "Save"}
                </button>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

SubmissionForm.propTypes = {
  submission: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    submission: ownProps.params.id ? state.submissions.data.get(ownProps.params.id).toJS() : {}
  };
};

export default connect(mapStateToProps)(SubmissionForm);
