import React, { PropTypes } from 'react';

class App extends React.Component {

  render () {
    const drinks = this.props.data.drinks.data;
    return (
      <div>
        <ul>
          {drinks.entrySeq().map((d,k) => {
            return (
              <li key={d[0]}>{d[1].get("name")}</li>
              )
          })}
        </ul>
      </div>
    )
  }
}

export default App;
