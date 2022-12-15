import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connecttodatabase } from "../../../lib/db";

const authoptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const client = await connecttodatabase();
        const usercollection = client.db().collection("users");
        const user = await usercollection.findOne({ email: email });
        if (!user) {
          client.close();
          throw new Error("No such user exists");
        }
        const isvalid = await verifyPassword(password, user.password);
        if (!isvalid) {
          client.close();
          throw new Error("Incorrect Password");
        }
        client.close();
        return { id: String(user._id), email: email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/login-signup/login",
  },
};

export default NextAuth(authoptions);
