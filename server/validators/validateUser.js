const _ = require('lodash');
module.exports = {
    validateUser(username, password){
        const responseMessage = _.isEmpty(username) ? 'username is required' :
        _.isEmpty(password) ? 'password is required' :  username.length < 2 ? 'username should be at least two letters':
        password.length < 6 ? 'password length hould be at least 6 letters': ''
        return responseMessage;
    }
}