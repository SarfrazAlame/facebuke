"use client";
import { likePost } from "@/lib/action";
import { PostType } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Like } from "@prisma/client";
import React, { useOptimistic } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ userId, post }: { userId: string; post: PostType }) => {
  const predicate = (like: Like) =>
    like.postId === post.id && like.userId === userId;

  const [optimisticLike, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,

    // @ts-ignore
    (state: Like[], newLikes: Like) =>
      state.some(predicate)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLikes]
  );

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const postId = formData.get("postId");
          addOptimisticLike({ userId, postId });
          await likePost(postId);
        }}
      >
        <input type="hidden" name="postId" value={post.id} />
        <button
          type="submit"
          className="bg-gray-200 flex gap-1 xsm:px-4 ssm:px-6 sm:px-10 py-1 rounded-full"
        >
          {optimisticLike.length > 0 ? (
            <AiFillLike
              className={cn("text-xl", {
                "": optimisticLike.some(predicate),
              })}
            />
          ) : (
            <AiOutlineLike className="text-xl" />
          )}
          <p>{optimisticLike.length}</p>
        </button>
      </form>
    </div>
  );
};

export default LikeButton;
