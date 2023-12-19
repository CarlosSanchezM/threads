import Link from "next/link";

interface Props {
  hasLikes: boolean;
  hasReplies: boolean;
  likes: number;
  comments: number;
  id: string;
}

const LikeReplieCounter = ({
  hasLikes,
  hasReplies,
  likes,
  comments,
  id,
}: Props) => {
  return (
    <div className="mt-1 text-subtle-medium text-gray-1">
      {hasLikes && <p className="inline">{likes} likes</p>}
      {hasReplies && (
        <Link href={`/thread/${id}`}>
          <p className="inline"> {comments} replies</p>
        </Link>
      )}
    </div>
  );
};

export default LikeReplieCounter;
