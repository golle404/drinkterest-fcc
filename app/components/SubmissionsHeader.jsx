import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const SubmissionsHeader = ({sort, submitter}) => {
  const counterSort = sort === "latest" ? "popular" : "latest";
  return (
    <div className="submissions-header">
      <div className="submissions-header-title">{submitter + " " + sort + " submissions"}</div>
      <div className="submissions-header-sort">
        <Link className="btn btn-primary" to={"/submissions/" + counterSort + "/" + submitter}>{counterSort}</Link>
      </div>
    </div>
  )
}

export default SubmissionsHeader;
