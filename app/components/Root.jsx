import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';

class Root extends React.Component {
  constructor(props){
    super(props);
    this.state = {childKey: 0};
  }
  componentWillReceiveProps(){
    this.setState({childKey: this.state.childKey + 1})
  }
  render () {
    return (
      <div className="hg-container">
        <Header />
          <div className="hg-content" key={this.state.childKey}>
            {this.props.children}
          </div>
        <Footer />
      </div>
    )
  }
}

export default Root;
