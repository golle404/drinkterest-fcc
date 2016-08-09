import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Notification from './Notification.jsx';

class Root extends React.Component {

  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
    );
  }
}

Root.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

export default Root;
