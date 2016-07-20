import {Router} from 'express';
import passport from 'passport';
import * as usersController from '../controllers/usersController';
import * as submissionsController from '../controllers/submissionsController';

let router = Router();
////////////  API  /////////////////
router.post('/api/submission', isLoggedIn, submissionsController.addSubmission);
router.put('/api/like/:submissionId', isLoggedIn, submissionsController.likeSubmission);
router.put('/api/submission', isLoggedIn, submissionsController.editSubmission);
router.delete('/api/submission/:submissionId', isLoggedIn, submissionsController.deleteSubmission);

router.get('/api/submissions/:sort?/:user?', submissionsController.getSubmissions);
// for testing purposis only - loads random data from reddit//
router.post('/api/dummy', submissionsController.loadDummyData);
router.delete('/api/dummy', submissionsController.deleteDummyData);

////////// AUTH ROUTES /////////////
router.post('/auth/local', usersController.localAuth);

router.delete('/auth', isLoggedIn, usersController.deleteUser);
router.post('/auth/logout', (req, res) => {
  req.logout();
  res.json({success: true})
})

///////  test route only  ////////////////////////
router.get('/restricted', isLoggedIn, (req, res) => {
  res.json({success: true});
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.json({error: "Forbiden"});
}

export default router;
