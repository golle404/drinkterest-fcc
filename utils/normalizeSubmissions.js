import { Schema, arrayOf, normalize } from 'normalizr';

const submissionsSchema = new Schema("data", { idAttribute: '_id' });

const normalizeSubmissions = (submissions) => {
  return normalize(submissions, arrayOf(submissionsSchema)) || {}
}

export default normalizeSubmissions;
