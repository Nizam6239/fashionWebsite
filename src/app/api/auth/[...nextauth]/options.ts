import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User.models";
import { JWT } from "next-auth/jwt";

// Define a custom interface for credentials
interface Credentials {
    email: string;
    password: string;
}

// Define a custom session user type
interface CustomSessionUser {
    _id?: string;
    username?: string;
    email?: string; // Removed `null`
}

// Extend JWT to include custom properties
interface CustomToken extends JWT {
    _id?: string;
    username?: string;
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials?: Credentials): Promise<User | null> {
                if (!credentials) {
                    throw new Error("Missing credentials");
                }

                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.email }
                        ]
                    });

                    if (!user) {
                        throw new Error("No user found with this Email or Username");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user as User; // Ensure it matches NextAuth's User type
                    } else {
                        throw new Error("Incorrect Password");
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        throw new Error(err.message);
                    }
                    throw new Error("An unknown error occurred");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: CustomToken; user?: User }) {
            if (user) {
                token._id = (user as User)._id?.toString(); // Type assertion
                token.username = (user as User).username;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                (session.user as CustomSessionUser)._id = token._id;
                (session.user as CustomSessionUser).username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};
