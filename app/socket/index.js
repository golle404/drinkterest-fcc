import io from 'socket.io-client';
import normalizeSubmissions from './../../utils/normalizeSubmissions';
import {addSubmissionSuccess, editSubmissionRequest} from './../actions/submissionsActions';

const initSocket = (store) => {
  const socket = io(`${location.protocol}//${location.hostname}:8090`);
  socket.on('init', () => {
    console.log("init");
  })

  socket.on('added', (json) => {
    console.log("added", json);
    store.dispatch(addSubmissionSuccess(json.submission));
  })
}

export default initSocket;
