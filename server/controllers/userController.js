const Users = require('../models/userModel');

const userController = {};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  Users.findOne({username})
    .then((user) => {
      console
      if (!user) res.json({unameError: 'Username not found'});
      else if (user.password !== password) res.json({passError: 'Incorrect Password'});
      else {
        res.locals.id = user.id;
        return next();
      }
    });
}

module.exports = userController;