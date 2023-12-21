import { Schema } from 'mongoose';

const user = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

/**
 * This function is called before saving the document to the database.
 * It updates the updated_at field with the current date before every save.
 */

user.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

/**
 * serialized user object without password
 * @returns {Object} The serialized user object
 */
user.methods.serialize = function (user: {
  _id: any;
  email: any;
  username: any;
}): object {
  return {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
};

export const UserSchema = user;
