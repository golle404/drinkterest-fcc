import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const SubmissionToolbar = ({onDelete, id}) => {
  return (
    <div className="submission-tile-toolbar">
      <Link className="btn btn-primary btn-small btn-accent-flat" to={"/submission/edit/" + id}>Edit</Link>
      <a className="btn btn-primary btn-small btn-accent" onClick={onDelete}>delete</a>
    </div>
  )
}

export default SubmissionToolbar;
