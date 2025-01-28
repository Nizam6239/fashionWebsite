import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema: Schema<User> = new Schema({
    firstName:{
        type: String,
        required: [true, "First Name is required"],
        unique: true
    },
    lastName:{
        type: String,
        unique: true
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match:[/.+\@.+\..+/, 'Please use a valid email']
    },
    password:{
        type: String,
        required:[true, "Password is required"],
        unique: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now,
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel
