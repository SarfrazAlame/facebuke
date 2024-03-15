"use client";
import { commentPost } from "@/lib/action";
import React from "react";
import { IoSend } from "react-icons/io5";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createComment } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const CommentPost = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const form = useForm<z.infer<typeof createComment>>({
    resolver: zodResolver(createComment),
    defaultValues: {
      comment: "",
      postId,
    },
  });
  const comment = form.watch("comment");
  // console.log(comment);

  return (
    <div className="my-2 w-full flex justify-center ">
      <Form {...form}>
        <form
          className="flex"
          onSubmit={form.handleSubmit(async (values) => {
            await commentPost(values);
            toast.success('comment sent')
            form.reset();
          })}
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <input
                      type="text"
                      className="xsm:w-44 ssm:w-60 border py-2 rounded-full bg-gray-200 px-2"
                      placeholder="Write a public comment..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          ></FormField>
          <button type="submit" className="ml-6">
            <IoSend className="text-2xl" />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default CommentPost;
 