import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import InteractionsInformation from "../shared/InteractionsInformation";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: { name: string; image: string; id: string };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: { author: { image: string } }[];
  isComment?: boolean;
  path?: string;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  path,
}: Props) => {
  const formattedContent = content.split("\n").map((paragraph, index) => {
    if (paragraph.trim() === "") {
      // Si el párrafo está vacío, agregar un espacio no rompible para mantener el renglón vacío
      return (
        <p className="mt-2 text-small-regular text-light-2" key={index}>
          &nbsp;
        </p>
      );
    }
    // Si el párrafo tiene contenido, mantener el formato con la etiqueta <p>
    return (
      <p className="mt-2 text-small-regular text-light-2" key={index}>
        {paragraph}
      </p>
    );
  });
  const hasComments = comments.length > 0;

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        parentId === undefined ? "bg-dark-2 p-7" : "px-0 xs:px7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                fill
                alt="Profile image"
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-small-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <div className="overflow-y-auto max-h-28 custom-scrollbar">
              {formattedContent}
            </div>
            <div
              className={`${hasComments && "mb-10"} mt-5 flex flex-col gap-3`}
            >
              <InteractionsInformation
                key={id}
                userId={currentUserId}
                threadId={id}
                pathProp={path}
              />
            </div>
          </div>
        </div>
        {/*TODO DeleteThread */}
        {/*TODO Show comment logos */}
      </div>
      {!hasComments && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
