"use client";
import { likeState, updateLikes } from "@/lib/actions/thread.actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
  userId: string;
  threadId: string;
  pathProp?: string;
}

const InteractionsInformation = ({ userId, threadId, pathProp }: Props) => {
  const [isLike, setLikes] = useState(false);
  const [like, setLike] = useState(0);
  const [comment, setComments] = useState(0);
  //Estado del corazon
  useEffect(() => {
    const fetchLikeState = async () => {
      const userLiked = await likeState(userId, threadId);
      setLikes(userLiked.isUserLikedState);
      setLike(userLiked.likesState);
      setComments(userLiked.commentsState);
    };

    fetchLikeState();
  }, [userId, threadId]);
  //Manejador del like
  const handleLikeClick = async () => {
    await updateLikes(userId, threadId);
    const updatedLikeState = await likeState(userId, threadId);
    setLikes(updatedLikeState.isUserLikedState);
    setLike(updatedLikeState.likesState);
    setComments(updatedLikeState.commentsState);
  };
  // console.log(result);

  return (
    <>
      <div className="flex gap-3.5">
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
        <Link href={`/thread/${threadId}`}>
          <Image
            src={"/assets/reply.svg"}
            alt="reply"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Image
          src={"/assets/repost.svg"}
          alt="repost"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
        <Image
          src={"/assets/share.svg"}
          alt="share"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </div>
      <div className="mt-1 text-subtle-medium text-gray-1">
        {like > 0 && <p className="inline">{like} likes</p>}
        {comment > 0 && (
          <Link href={`/thread/${threadId}`}>
            <p className="inline"> {comment} replies</p>
          </Link>
        )}
      </div>
    </>
  );
};

export default InteractionsInformation;
