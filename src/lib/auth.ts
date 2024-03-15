import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { db } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.username = token.username
            }
            return session
        },
        async jwt({ token, user }) {
            const PrismaUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            });

            if (!PrismaUser) {
                token.id = user.id
                return token
            }
            if (!PrismaUser.username) {
                await db.user.update({
                    where: {
                        id: PrismaUser.id,
                    },
                    data: {
                        username: PrismaUser.name?.split(" ").join("").toLowerCase()
                    }
                })
            }

            return {
                id: PrismaUser.id,
                name: PrismaUser.name,
                email: PrismaUser.email,
                picture: PrismaUser.image,
                username: PrismaUser.username
            }
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)