import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const SubmissionToolbar = ({deleteRequest, id}) => {
  return (
    <div className="submission-tile-toolbar">
      <Link className="btn btn-primary btn-small btn-accent-flat" to={"/submission/edit/" + id}>Edit</Link>
      <a className="btn btn-primary btn-small btn-accent" onClick={deleteRequest}>delete</a>
    </div>
  );
};

SubmissionToolbar.propTypes = {
  deleteRequest: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default SubmissionToolbar;
