import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const SubmissionsHeader = ({submitterName}) => {
  return (
    <div className="submissions-header">
      <div className="submissions-header-title">{submitterName + " submissions"}</div>
    </div>
  );
};

SubmissionsHeader.propTypes = {
  submitterName: PropTypes.string
};

export default SubmissionsHeader;
