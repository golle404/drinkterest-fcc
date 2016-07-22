import React, { PropTypes } from 'react';

class FormInputGroup extends React.Component {
  render () {
    const {type, id, autoFocus, label, required, defaultValue} = this.props;
    return (
      <div className="form-input-group">
        <input
          type={type}
          id={id}
          ref={id}
          autoFocus={autoFocus}
          required={required}
          defaultValue={defaultValue}/>
        <label htmlFor={id}>{label}</label>
        <hr/>
      </div>
    )
  }
}

export default FormInputGroup;
