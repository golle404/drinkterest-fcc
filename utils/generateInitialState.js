export default function generateInitialState(isAuthenticated, _user, _submissions){
  let user = {};
  if(isAuthenticated){
    user.id = _user._id;
    user.username = _user.local.username;
    user.auth = true;
  }
  let submissions ={data:{}, queries:{}};
  if(_submissions){
    submissions.data = _submissions.data;
    submissions.queries[_submissions.query.queryStr] = {total: _submissions.total};
    submissions.queries[_submissions.query.queryStr].idx = _submissions.data.map((v) => {return v._id});
  }

  return {
    user: user,
    submissions: submissions
  };
}
