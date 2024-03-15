"use client";
import { PostType } from "@/lib/definitions";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import LikeButton from "./LikeButton";
import { Like } from "@prisma/client";
import CommentPost from "./CommentPost";

const LikeCommentShare = ({
  post,
  userId,
}: {
  post: PostType;
  userId: string;
}) => {
  return (
    <div>
      <div className="w-full flex justify-between  my-5 h-6">
        <LikeButton userId={userId} post={post} />
        <div>
          <div className="max-[400px]:w-28 min-[250px]:w-16  py-1.5 rounded-full bg-gray-200 flex justify-center ">
            <FaRegComment className="text-xl" />
          </div>
        </div>
        <div>
          <PiShareFatLight className="text-xl xsm:w-16 ssm:w-20 sm:w-28 bg-gray-200 rounded-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default LikeCommentShare;
