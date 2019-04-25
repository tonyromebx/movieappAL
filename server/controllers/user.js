const jwt = require('jsonwebtoken');


const db = require('../models/index');
const genRandomString = require('../helpers/genRandomString');
const hashPassword = require('../helpers/hashPassword');
const validator = require('../validators/validateUser');


module.exports = {

  registerUser(req, res) {
    const { username, password } = req.body;

    const errorMessage = validator.validateUser(username, password);

    if (errorMessage.length) {
        return res.status(400).send({'message' : errorMessage})
    }

    db.user.findOne({username: username.toLowerCase()}, (error, user) => {
        if (user !== null) {
            return res.status(400).send({message: 'username already exist'});
        } else {
            const randomValue = genRandomString(16);
            const { passwordSalt, passwordHash } = hashPassword(password, randomValue)
            var newUser = db.user({
                username: username.toLowerCase(),
                passwordSalt,
                passwordHash,
                isAdmin: false,
                created_at: Date.now(),
                updated_at: Date.now()
            });
            newUser.save((error) => {
                if (error) {
                    return res.status(500).send({message: error});
                }
                return res.status(201).send({'message' : 'User registered successfully'})
            })
        }
    });

  },


  loginUser(req, res) {
    const { username, password } = req.body;

    db.user.findOne({username: username.toLowerCase()}, (error, user) => {
        console.log
        if (error || user === null) {
            return res.status(401).send({message: 'username and password is incorrect'});
        }
        const { passwordSalt, passwordHash } = hashPassword(password, user.passwordSalt)

        if (passwordHash === user.passwordHash){
            /* creates a token */
          return jwt.sign({ user: username, isAdminRole: user.isAdmin }, process.env.SECRET, (err, token) => {
            return res.status(200).send({
              message: 'You have successfully logged in',
              token,
            });
          });
        }
        return res.status(401).send({message: 'username and password is incorrect'});
    });
  },

};
