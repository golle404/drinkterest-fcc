export default function generateInitialState(isAuthenticated, _user, _submissions){
  let user = {};

  if(isAuthenticated){
    user.id = _user._id;
    user.username = _user.username;
    user.auth = true;
  }
  let submissions ={data: []};

  if(_submissions){
    submissions.data = _submissions.data;
    submissions.total = _submissions.total;
    submissions.submitter = _submissions.submitter;
  }

  return {
    user: user,
    submissions: submissions
  };
}
