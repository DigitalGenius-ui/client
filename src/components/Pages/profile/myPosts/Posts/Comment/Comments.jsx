import { Avatar, Button, IconButton } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import useCreateData from "../../../../../../Hooks/useCreateData";
import { momentPostCommentRemove } from "../../../../../../FetchData/User/UserDetails";
import { Link } from "react-router-dom";

const Comments = ({ comment }) => {
  const [showRemove, setShowRemove] = useState(false);
  const { profile } = comment?.user;

  const { submitForm, isPending } = useCreateData({
    key: "user",
    func: momentPostCommentRemove,
  });

  const handleRemove = async () => {
    await submitForm({
      inputData: comment.id,
      dataMessage: "Comment has been removed",
    });
    setShowRemove(false);
  };
  return (
    <section>
      <div className="flex items-center justify-between relative">
        <Link
          to={`/profile/${comment?.userId}`}
          className="flex items-center gap-2">
          <Avatar
            name={`${profile?.firstName} ${profile?.lastName}`}
            size="sm"
            src={profile?.userImg}
          />
          <h2 className="text-xs font-bold">{`${profile?.firstName} ${profile?.lastName}`}</h2>
        </Link>
        <IconButton
          onClick={() => setShowRemove((prev) => !prev)}
          aria-label="remove-post"
          icon={<HiDotsHorizontal />}
          size="sm"
          fontSize="1.5rem"
          variant="ghost"
        />
        {showRemove && (
          <Button
            onClick={handleRemove}
            isLoading={isPending}
            rounded="none"
            borderBottom="4px"
            borderLeft="2px"
            borderColor="teal"
            className="!absolute !top-7 !right-2 !px-[3rem]">
            Delete
          </Button>
        )}
      </div>
      <p className="text-xs pt-2 text-gray-500 first-letter:capitalize">
        {comment?.comment}
      </p>
      <p className="text-xs pt-3 text-gray-500">
        {format(comment?.createAt, "LLL dd, yyyy")}
      </p>
    </section>
  );
};

export default Comments;
