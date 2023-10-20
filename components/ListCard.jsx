import React from "react";
import Link from "next/link";

// COmponent to display PR List
const ListCard = ({ pr }) => {
  return (
    <div className="w-8/12 min-h-28 m-3 flex flex-col justify-between items-start  border-2 border-slate-800 dark:border-[#7A828E] dark:bg-[#272B33] p-4 rounded-lg dark:text-[#F0F3F6] mobile:w-full">
      <div className="m-1">
        <p className="font-extrabold text-xl mobile:text-base">
          PR Title: <span className="font-semibold">{pr.title}</span>
        </p>
      </div>
      <div className="m-1">
        <p className="font-bold mobile:text-sm">
          PR Author: <span className="font-semibold">{pr.user.login}</span>
        </p>
      </div>
      {pr.comment_count !== undefined ? (
        <div className="m-1">
          <p className="font-bold mobile:text-sm">
            Number of Comments:
            <span className="font-semibold">{pr.comment_count}</span>
          </p>
        </div>
      ) : (
        <div>Loading comment count...</div>
      )}
      <div className="m-1">
        <p className="font-bold mobile:text-sm ">
          PR Status:
          {pr.state === "open" ? (
            <span className="font-semibold text-green-600">{pr.state}</span>
          ) : (
            <span className="font-semibold text-red-600">{pr.state}</span>
          )}
        </p>
      </div>
      <div className="m-1">
        <Link
          href={pr.html_url}
          title="PR Link"
          className="font-bold mobile:text-sm hover:underline text-sky-500"
        >
          Link to Pull Request
        </Link>
      </div>

      <details className=" w-full ">
        <summary className="cursor-pointer text-sm ">
          click to check the description of the issue
        </summary>
        <div className="text-xs text-justify p-3 w-full">{pr.body}</div>
      </details>
    </div>
  );
};

export default ListCard;
