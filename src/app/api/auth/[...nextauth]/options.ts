import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User.models";


export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            }, async authorize(credentials:any): Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier},
                        ]
                    })
                    if(!user){
                        throw new Error("No user is find with this Email")
                    }
                    const  ispasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(ispasswordCorrect){
                        return user
                    } 
                    else{
                        throw new Error("Incorrect Password")
                    }
                } catch (err: any) {
                    throw new Error(err)
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString();
                token.username = user.username;
            }
            return token
        },
        async session({ session, user, token }) {
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
            }
            return session
        },
    },
    pages:{
        signIn: 'sign-in'
    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}
