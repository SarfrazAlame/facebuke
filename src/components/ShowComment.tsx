import { fetchComment, fetchUser } from "@/lib/fetch";
import Image from "next/image";
import React from "react";

const ShowComment = async ({ postId }: { postId: string }) => {
  const comment = await fetchComment(postId);
  const commentUser = comment.map((com) => {
    return {
      comment: com.comment,
      userId: com.userId,
    };
  });

  if (commentUser) {
    const user = await fetchUser(commentUser[0].userId);
  }

  return (
    <div>
      {commentUser.length > 0 ? (
        <>
          <div>
            <img src={user.image} alt="logo" />
            <p>{commentUser[0].comment}</p>
          </div>
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
    </div>
  );
};

export default ShowComment;
