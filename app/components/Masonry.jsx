import React, { PropTypes } from 'react';
import ModularComponent from './../compositions/ModularComponent.jsx';

class Masonry extends React.Component {

  mapChildren({queryIndex, children}){
		let col = [];
		const numC = queryIndex + 1;
		for(let i = 0; i < numC; i++){
			col.push([]);
		}
		return children.reduce((p,c,i) => {
			p[i%numC].push(c);
			return p;
		}, col);
	}

  render () {
    return (
      <div className="masonry">
        {this.mapChildren(this.props).map((col, ci) => {
          return (
            <div className="masonry-column" key={ci} >
              {col.map((entry, i) => {
                return (
                  <div key={i}>{entry}</div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

Masonry.propTypes = {
  children: PropTypes.array.isRequired,
  queryIndex: PropTypes.number.isRequired
};

export default ModularComponent(Masonry);
