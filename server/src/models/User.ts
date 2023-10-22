import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password : string;
  is_member? : { type: Boolean, default: false }, 
}


interface IUserModel extends mongoose.Model<IUser> {
  // declare any static methods here
  login(email: string, password: string): any; // 
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true , minlength: 1},
  email: { type: String, required: true, minlength: 10, unique: true , trim : true },
  password: { type: String, required: true , minlength: 6 }
});

//fire before doc is saved 

UserSchema.pre('save', async function(this: IUser, next) {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next(); // Call the next middleware or save the document

});


UserSchema.statics.login = async function (email: string, password: string){
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new Error("Incorrect email");
};

const User = mongoose.model<IUser , IUserModel>('User', UserSchema);

export default User;
