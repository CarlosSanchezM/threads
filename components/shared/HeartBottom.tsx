"use client";
import { likeState, updateLikes } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useEffect, useState } from "react";
interface Props {
  userId: string;
  threadId: string;
  pathProp?: string;
}

const HeartBottom = ({ userId, threadId, pathProp }: Props) => {
  let [isLike, setLikes] = useState(false);
  //Estado del corazon
  useEffect(() => {
    const fetchLikeState = async () => {
      const userLiked = await likeState(userId, threadId);
      setLikes(userLiked);
    };

    fetchLikeState();
  }, [userId, threadId]);
  //Manejador del like
  const handleLikeClick = async () => {
    await updateLikes(userId, threadId, pathProp);
    const updatedLikeState = await likeState(userId, threadId);
    setLikes(updatedLikeState);
  };
  // console.log(result);

  return (
    <Image
      onClick={async () => {
        await handleLikeClick();
      }}
      src={isLike ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
    />
  );
};

export default HeartBottom;
