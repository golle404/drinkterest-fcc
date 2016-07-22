import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';

class Root extends React.Component {
  render () {
    return (
      <div className="hg-container">
        <Header />
          <div className="hg-content">
            {this.props.children}
          </div>
        <Footer />
      </div>
    )
  }
}

export default Root;
