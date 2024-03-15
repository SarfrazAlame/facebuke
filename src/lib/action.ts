'use server'
import { CreatePost, commentSchema, createComment, likeSchema } from "./schema";
import { z } from 'zod'
import UserId from "./userId";
import { db } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createPost(value: z.infer<typeof CreatePost>) {
    const userId = await UserId()
    const validationFields = CreatePost.safeParse(value)

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: 'Missing fields. failed to create post'
        }
    }

    const { caption, imageUrl } = validationFields.data

    try {
        await db.post.create({
            data: {
                caption,
                imageUrl,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    } catch (error) {
        return {
            message: 'Database Error: failed to create post'
        }
    }
    revalidatePath('/dashboard/home')
    redirect('/dashboard/home')
}

export async function likePost(value: FormDataEntryValue | null) {
    const userId = await UserId()

    const validationFields = likeSchema.safeParse({ postId: value })

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: 'Missing fields. failed to post'
        }
    }
    const { postId } = validationFields.data

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error('post not found')
    }

    const like = await db.like.findUnique({
        where: {
            userId_postId: {
                postId,
                userId
            }
        }
    })

    if (like) {
        try {
            await db.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId
                    }
                }
            })
            revalidatePath('/dashboard/home')
            return { message: "Unlike post" }
        } catch (error) {
            return { message: "database error: failed to post" }
        }
    }

    try {
        await db.like.create({
            data: {
                postId,
                userId
            }
        })
        revalidatePath('/dashboard/home')
        return { message: "liked post" }
    } catch (error) {
        return { message: "liked post" }
    }

}

export async function commentPost(comments: z.infer<typeof createComment>) {
    const userId = await UserId()

    const validationFields = createComment.safeParse(comments)

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: "Missing comment, failed to comment"
        }
    }

    const { comment, postId } = validationFields.data

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error('post not found')
    }

    try {

        await db.comment.create({
            data: {
                comment,
                postId,
                userId
            }
        })
        revalidatePath('/dashboard/home')
        return {message:'Created Comment'}
    } catch (error) {
        return {
            message:"Database Error: Failed to create comment"
        }
    }
}