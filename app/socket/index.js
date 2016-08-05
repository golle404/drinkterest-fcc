import io from 'socket.io-client';
import normalizeSubmissions from './../../utils/normalizeSubmissions';
import {addSubmission, updateSubmission, deleteSubmission} from './../actions/submissionsActions';

const initSocket = (store) => {
  const socket = io(`${location.protocol}//${location.hostname}:8090`);

  socket.on('submission_added', (json) => {
    store.dispatch(addSubmission(json.submission));
  });

  socket.on('submission_edited', (json) => {
    store.dispatch(updateSubmission(json.submission));
  });

  socket.on('submission_deleted', (json) => {
    store.dispatch(deleteSubmission(json.submission));
  });
};

export default initSocket;
