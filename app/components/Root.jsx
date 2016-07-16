import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';

class Root extends React.Component {
  render () {
    return (
      <div>
        <Header />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Root;
