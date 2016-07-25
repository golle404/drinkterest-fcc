import React, { PropTypes } from 'react';
import {findDOMNode} from 'react-dom';

const ModularComponent = (Composed) => {
  return class extends React.Component {
    //static displayName = 'ModularComponent';

    constructor(props) {
       super(props);
       this.state = {queryIndex: 0};
       this.handleResize = this.handleResize.bind(this);
       this.getElement = this.getElement.bind(this);
    }

    componentDidMount(){
      window.addEventListener('resize', this.handleResize);
      this.handleResize()
    }
    componentWillUnmount(){
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize(){
      const queryIndex = this.getQueryIndex(findDOMNode(this).offsetWidth);
      if(queryIndex !== this.state.queryIndex){
      	this.setState({queryIndex: queryIndex});
      }
    }

    getQueryIndex(w){
      return this.props.breakPoints.reduceRight( (p, c, i) => {
    	 return c < w ? p : i;
     }, this.props.breakPoints.length);
    }

    getElement(){
      return findDOMNode(this);
    }

    render () {
      return <Composed ref="container" {...this.props} {...this.state} />
    }
  }
}

export default ModularComponent;
