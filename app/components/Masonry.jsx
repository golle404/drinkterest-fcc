import React, { PropTypes } from 'react';
import ModularComponent from './../compositions/ModularComponent';

class Masonry extends React.Component {

  mapChildren(){
		let col = [];
		const numC = this.props.queryIndex + 1;
		for(let i = 0; i < numC; i++){
			col.push([]);
		}
		return this.props.children.reduce((p,c,i) => {
			p[i%numC].push(c);
			return p;
		}, col);
	}

  render () {
    return (
      <div className="masonry">
        {this.mapChildren().map((col, ci) => {
          return (
            <div className="masonry-column" key={ci} >
              {col.map((entry, i) => {
                return (
                  <div key={i}>{entry}</div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default ModularComponent(Masonry);

/*
{this.mapChildren().map((col, ci) => {
  return (
    <div className="masonry__column" key={ci} >
      {col.map((entry, i) => {
        return (
          <div key={i} className="card hoverable">
            <Tile entry={entry}/>
          </div>
        )
      })}
    </div>
  )
})}
*/
