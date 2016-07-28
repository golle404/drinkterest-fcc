import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';
import Notification from './Notification';

class Root extends React.Component {
  render () {
    return (
      <div className="hg-container">
        <Notification />
        <Header loc={this.props.location}/>
        <div className="hg-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

Root.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
}

export default Root;
