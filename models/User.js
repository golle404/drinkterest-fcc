import bcrypt from 'bcrypt-nodejs';
import mongoose, {Schema} from 'mongoose';

const schemaOptions = {
  toJSON: {
    virtuals: true
  }
};

let userSchema = new Schema({
  username: String,
  password: String,
  oauthToken: String
}, schemaOptions);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
