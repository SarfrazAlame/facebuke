import { db } from "./prisma";

export default async function fetchPosts() {
    try {
        const posts = await db.post.findMany({
            include: {
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createAt: 'desc'
                    }
                },
                likes: {
                    include: {
                        user: true
                    }
                },
                SavePost: true,
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return posts
    } catch (error) {
        console.log("database error", error)
        throw new Error('Failed to fetch post')
    }
}


export async function fetchPost(postId: string) {
    try {
        const post = await db.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: true,
                likes: true,
                SavePost: true
            }
        })
        return post
    } catch (error) {
        console.log('database error', error)
        throw new Error('failed to fetch post')
    }
}

export async function fetchComment(postId: string) {
    try {
        const comment = await db.comment.findMany({
            where: {
                postId: postId
            }
        })
        return comment
    } catch (error) {
        console.log('database error', error)
        throw new Error("failed to fetch comment")
    }
}

export async function fetchUser(userId: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    } catch (error) {
        console.log('database error', error)
        throw new Error('failed to get user')
    }
}