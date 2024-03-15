"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { CreatePost } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import createPost from "@/lib/action";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { IoMdArrowRoundBack } from "react-icons/io";
import { User } from "@prisma/client";
import Image from "next/image";
import { Input } from "./ui/input";
import { FaEarthAsia, FaPhotoFilm } from "react-icons/fa6";
import { FaUserTag } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const UserForm = ({ user }: { user: User }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: "",
      imageUrl: undefined,
    },
  });

  const fileUrl = form.watch("imageUrl");

  return (
    <Dialog>
      <DialogTrigger className="w-full text-center">Photo</DialogTrigger>
      <DialogContent>
        <div className="w-full relative">
          <Form {...form}>
            <form
              className=""
              onSubmit={form.handleSubmit(async (values) => {
                const res = await createPost(values);
                if (res) {
                  return toast.error("faield to post");
                }
                toast.success("Posted Successfully");
              })}
            >
              {!!fileUrl ? (
                <>
                  <div className="w-full">
                    <div className="w-full flex justify-between border-b ">
                      <div className="flex gap-3">
                        <IoMdArrowRoundBack className="mt-1.5 text-gray-600 text-lg" />
                        <p className="font-bold text-lg text-gray-600">
                          Create post
                        </p>
                      </div>
                      <button type="submit" className="text-blue-500 font-bold">
                        POST
                      </button>
                    </div>

                    <div className="">
                      <div className="flex my-4">
                        <Image
                          src={user.image}
                          alt="logo"
                          width={30}
                          height={30}
                          className="w-16 rounded-full"
                        />
                        <div className="mx-2">
                          <p className="text-lg font-bold">{user.name}</p>
                          <div className="flex gap-1 bg-gray-200 p-1 rounded-md">
                            <FaEarthAsia /> <span className="">Public</span>
                          </div>
                        </div>
                      </div>

                      <div className="my-2">
                        <FormField
                          control={form.control}
                          name="caption"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <Input
                                className="h-20 bg-gray-100 text-md outline-none"
                                type="caption"
                                id="caption"
                                placeholder="Say something about this photo"
                                {...field}
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <Image src={fileUrl} alt="logo" width={100} height={50} />
                    </div>

                    <div className="my-2">
                      <div className="flex ">
                        <FaPhotoFilm className="text-green-400 text-md" />
                        <p className="text-md mx-2">Add more photos</p>
                      </div>

                      <div className="flex ">
                        <FaUserTag className="text-blue-500 text-md" />
                        <p className="text-md mx-2">Tag Friends</p>
                      </div>

                      <div className="flex ">
                        <IoLocationSharp className="text-pink-500 text-md" />
                        <p className="text-md mx-2">Add location</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={() => (
                      <FormItem className="">
                        <FormControl className="bg-gray-300">
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(req) => {
                              form.setValue("imageUrl", req[0].url);
                            }}
                            onUploadError={(error: Error) => {
                              console.log("ooho ", Error);
                              toast.error("faild to post");
                            }}
                          ></UploadButton>
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </>
              )}
              {fileUrl && (
                <>
                  <div className="my-5"></div>
                  <div>
                    <button
                      type="submit"
                      onClick={() => router.refresh()}
                      className="bg-blue-600 w-full text-white font-semibold h-12 rounded-lg"
                    >
                      POST
                    </button>
                  </div>
                </>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
