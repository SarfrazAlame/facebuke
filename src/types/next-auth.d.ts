import type { JWT } from "next-auth/jwt"
import type { Session, User } from "next-auth/jwt"

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username?: string | null
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: string
            username?: string | null
            name: string | null
            email: string | null
            image: string | null
            createA: Date
            updateAt: Date
        }
    }

}