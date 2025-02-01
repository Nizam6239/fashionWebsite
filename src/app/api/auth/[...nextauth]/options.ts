import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User.models";
import { JWT } from "next-auth/jwt";

// Define a custom interface for credentials
interface Credentials {
  identifier: string;
  password: string;
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
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials?: Credentials): Promise<User | null> {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this Email or Username");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }

          return {
            username: user.username,
            email: user.email,
          } as User;
        } catch (err) {
          throw new Error((err as Error).message || "An unknown error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: CustomToken; user?: User }) {
      if (user) {
        token._id = user._id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: CustomToken }) {
      if (session.user) {
        session.user._id = token._id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
