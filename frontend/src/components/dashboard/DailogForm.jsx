import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import axios from "axios";
import toast from "react-hot-toast";

export const DailogForm = ({ buttonTitle, postToEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = postToEdit != null;

  useEffect(() => {
    if (isEditing) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setPreview(postToEdit.image);
    }
  }, [postToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      let response;

      // Creation logic here

      if (isEditing) {
        response = await axios.post(
          "/api/post/update-post/" + postToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axios.post("/api/post/create-post", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setTitle("");
      setContent("");
      setImage(null);
      setPreview("");
      toast.success(`Post created successfully`);
      // onClose(); // Close the dialog after successful operation
      // setOpen(false);
    } catch (error) {
      console.error("Post operation error", error);
      toast.error(
        error.response.data.message ||
          `Failed to ${isEditing ? "update" : "create"} post`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>{buttonTitle ? "Update Post" : "Create New Post"}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 w-[200px] h-[200px]"
                  />
                )}
              </div>
              <DialogFooter>
                <Button type="submit">
                  {loading ? "Registering post..." : "Submit Post"}{" "}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
