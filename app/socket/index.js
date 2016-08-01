import io from 'socket.io-client';
import normalizeSubmissions from './../../utils/normalizeSubmissions';
import {addSubmissionSuccess, updateSubmissionSuccess, deleteSubmissionSuccess} from './../actions/submissionsActions';

const initSocket = (store) => {
  const socket = io(`${location.protocol}//${location.hostname}:8090`);
  socket.on('init', () => {
    console.log("init");
  })

  socket.on('added', (json) => {
    //console.log("added", json);
    store.dispatch(addSubmissionSuccess(json.submission));
  })
  socket.on('edit', (json) => {
    //console.log("added", json);
    store.dispatch(updateSubmissionSuccess(json.submission));
  })

  socket.on('delete', (json) => {
    console.log("del", json);
    store.dispatch(deleteSubmissionSuccess(json.submission));
  })
}

export default initSocket;
