import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {hideNotification} from './../actions/notificationActions';

class Notification extends React.Component {

  componentDidUpdate(prevProps){
    if(this.props.active){
      setTimeout(this.hide.bind(this), 2000);
    };
  }

  hide(){
    this.props.dispatch(hideNotification())
  }

  render () {
    const {message, className, active} = this.props;
    return (
      <div className={"notification" + (active ? " active" : "")}>
        <div className={className}>
          {message}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.get("message"),
    className: state.notification.get("className"),
    active: state.notification.get("active"),
  }
}

export default connect(mapStateToProps)(Notification);
