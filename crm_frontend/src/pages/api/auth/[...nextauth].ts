import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/utils/api";


export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  pages: {
    signIn: 'auth/signin'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials", 
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {

        const user = await api.Login(credentials.email, credentials?.password)
        if (user) {
          return user;
        } 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
        return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  
};
export default NextAuth(authOptions);

