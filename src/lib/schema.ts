import { string, z } from 'zod'

const PostSchema = z.object({
    id: z.string(),
    imageUrl: z.string({ required_error: 'File Url is required' }).url(),
    caption: z.string()
})

export const CreatePost = PostSchema.omit({ id: true })
export const UpdatePost = PostSchema
export const DeletePost = PostSchema.pick({ id: true })

export const likeSchema = z.object({
    postId: z.string()
})

export const commentSchema = z.object({
    id: z.string(),
    comment: z.string().max(17),
    postId: z.string()
})

export const createComment = commentSchema.omit({ id: true })
export const updateComment = commentSchema
export const deleteComment = commentSchema.pick({ id: true })