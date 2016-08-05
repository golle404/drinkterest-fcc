import {Router} from 'express';
import passport from 'passport';
import * as usersController from '../controllers/usersController';
import * as submissionsController from '../controllers/submissionsController';

import Server from 'socket.io';
const io = new Server().attach(8090);

io.on('connection', (socket) => {
  socket.emit('init', {inited: true});
});

let router = Router();
////////////  API  /////////////////
router.post('/api/submission', isLoggedIn, submissionsController.addSubmission, (req, res) => {
  if(req.response.error){
    return res.json({error: req.response.error});
  }
  io.emit('submission_added', {submission: req.response.submission});
  res.json({submission: req.response.submission});
});

router.put('/api/like/:submissionId', isLoggedIn, submissionsController.likeSubmission, (req, res) => {
  if(req.response.error){
    return res.json({error: req.response.error});
  }
  io.emit('submission_edited', {submission: req.response.submission});
  res.json({submission: req.response.submission});
});

router.put('/api/submission', isLoggedIn, submissionsController.editSubmission, (req, res) => {
  if(req.response.error){
    return res.json({error: req.response.error});
  }
  io.emit('submission_edited', {submission: req.response.submission});
  res.json({submission: req.response.submission});
});

router.delete('/api/submission/:submissionId', isLoggedIn, submissionsController.deleteSubmission, (req, res) => {
  if(req.response.error){
    return res.json({error: req.response.error});
  }
  io.emit('submission_deleted', {submission: req.response.submission});
  res.json({submission: req.response.submission});
});

router.get('/api/submissions/:submitter?', submissionsController.getSubmissions);
// for testing purposis only - loads random data from reddit//
router.post('/api/dummy', submissionsController.loadDummyData);
router.delete('/api/dummy', submissionsController.deleteDummyData);

////////// AUTH ROUTES /////////////
router.delete('/auth', isLoggedIn, usersController.deleteUser);
router.post('/auth/local', usersController.localAuth);
router.post('/auth/logout', (req, res) => {
  req.logout();
  res.json({success: true});
});

router.get('/auth/twitter', passport.authenticate('twitter'));

	// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));


router.get('/auth/github', passport.authenticate('github'));

	// handle the callback after twitter has authenticated the user
router.get('/auth/github/callback',
	passport.authenticate('github', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));

///////  test route only  ////////////////////////
router.get('/restricted', isLoggedIn, (req, res) => {
  res.json({success: true});
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.json({error: "Forbiden"});
}

export default router;
