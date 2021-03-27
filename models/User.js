const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});

var options = {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'Email already exists',
    IncorrectUsernameError: 'Email does not exist',
    IncorrectPasswordError: 'Please check your password'
  }
};

UserSchema.plugin(passportLocalMongoose, options);

module.exports = User = mongoose.model('user', UserSchema);
