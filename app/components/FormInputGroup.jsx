import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class FormInputGroup extends React.Component {
  constructor(props){
    super(props);
    const isDirty = props.defaultValue && props.defaultValue.length != 0;
    this.state={isDirty: isDirty};
    this.inputChange = this.inputChange.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillReceiveProps(){
    for(const ref in this.refs){
      this.refs[ref].value = "";
    }
    this.setState({isDirty: false});
  }

  inputChange(){
    if((this.refs.input.value.length !== 0) !== this.state.isDirty){
      this.setState({isDirty: !this.state.isDirty});
    }
  }

  render () {
    const {type, id, autoFocus, label, required, defaultValue} = this.props;
    return (
      <div className="form-input-group">
        <input
          type={type || "text"}
          id={id}
          ref="input"
          autoFocus={autoFocus}
          required={required}
          defaultValue={defaultValue || ""}
          className={this.state.isDirty ? "dirty" : ""}
          onChange={this.inputChange}/>
        <label
          htmlFor={id}>{label}</label>
        <hr/>
      </div>
    );
  }
}

FormInputGroup.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.string
};

export default FormInputGroup;
