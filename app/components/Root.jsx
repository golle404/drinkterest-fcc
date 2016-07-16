import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';

class Root extends React.Component {
  render () {
    return (
      <div className="root">
        <Header />
          <div className="main">
            {this.props.children}
          </div>
        <Footer />
      </div>
    )
  }
}

export default Root;
