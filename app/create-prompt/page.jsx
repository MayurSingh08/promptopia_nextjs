"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '/components/Form'
import { randomInt } from "crypto";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      debugger;
      console.log("Session Data", session)
      if(session != null){
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session.user.id,
            //userId: session?.user.id,
            tag: post.tag,
          }),
        });
  
        if (response.ok) {
          router.push("/");
        }
      }
      else{
        alert("Please SignIn to Create Post");
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;