import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {likeEntry, deleteEntry} from '../actions/entryActions';

import {Link} from 'react-router';

class Tile extends React.Component {

  constructor(props){
    super(props)
    //this.deleteEntry= this.deleteEntry.bind(this);
  }

  getLikeClass(){
    return "waves-effect btn-flat " + (this.props.user.auth ? "" : "disabled")
  }
  getEditButton(){
    return (
      <button className="waves-effect btn-flat">Edit</button>
    )
  }
  getDeleteButton(){
    return (
      <button className="waves-effect btn-flat" onClick={this.onDeleteEntry.bind(this)}>Delete</button>
    )
  }
  onDeleteEntry(){
    this.props.dispatch(deleteEntry(this.props.entry.id))
  }

  onLikeEntry(){
    const like = {
      entryId: this.props.entry.id,
      userId: this.props.user.id
    }
    this.props.dispatch(likeEntry(like))
  }

  render () {
    return (
      <div className="masonry__tile">
        <figure className="">
          <img src={this.props.entry.url} alt={this.props.entry.name}/>
          <figcaption className="">{this.props.entry.name}</figcaption>
        </figure>
        <div className="tile__content">
          <Link to={"/user/" + this.props.entry.submitterName}> {this.props.entry.submitterName} </Link>
          <button
            className={this.getLikeClass()}
            onClick={this.onLikeEntry.bind(this)}>
              Likes {this.props.entry.liked.length}
            </button>
        </div>
        <div className="tile__action">
          {this.props.user.id !== this.props.entry.submitterId || this.getEditButton()}
          {this.props.user.id !== this.props.entry.submitterId || this.getDeleteButton()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
      user: state.user
    }
}

export default connect(mapStateToProps)(Tile);
