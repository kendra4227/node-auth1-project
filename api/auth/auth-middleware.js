const Users = require('../users/users-model');

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req,res,next) {
  if(req?.session?.user){
    next();
  } else{
    res.status(401).json({message:"You shall not pass!"});
  }


}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req,res,next) {
  const users = await Users.find();
  const newUser = req.body;
  for(let i = 0; i <users.length; i++)

    if(newUser.username === user[i].username){
      res.status(422).json({message:"Username taken"});
    }else {
      next();
    };

};

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req,res,next) {
  const users = await Users.find();
  const searchedUser = req.body;

  for (let i = 0 ;  i < users.length; i++){
    if (searchedUser.username === users[i].username) {
      next();
    } else {
      res.status(401).json({message:"Invalid credentials"});
    };
  };

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req,res,next) {
 const user = req.body;

 if(!req.body.password || req.body.password < 3){
   res.status(422).json({message: "Password must be longer than 3 chars"})
 }else{
   next();
 };
};

module.exports{
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}

// Don't forget to add these to the `exports` object so they can be required in other modules
