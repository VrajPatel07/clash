import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                try {
                    const user = await db.user.findFirst({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (!user) {
                        return null;
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account before login");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user;
                    }
                    else {
                        return null;
                    }
                }
                catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) {
                token.userId = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user && token?.userId) {
                session.user.id = token.userId as string;
                session.user.email = token.email as string
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
})