import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { DailogForm } from "./DailogForm";

const Post = ({ post, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{post.content}</CardDescription>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mt-4 w-full h-[500px]"
          />
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <DailogForm
            postToEdit={post}
            buttonTitle="Update Post"
            // onPostUpdated={onPostUpdated}
          />
          {/*  */}
          <Button
            onClick={() => onDelete(post._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
