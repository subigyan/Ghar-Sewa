import React from "react";
import { Rating } from "@mui/material";
import { Avatar } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <div className="">
          <div className="flex items-center">
            <Avatar sx={{ width: 45, height: 45 }} className="text-sm">
              {review?.customer?.name?.[0]}
            </Avatar>
            <div className="ml-3">
              <p className=" text-slate-500 font-semibold">
                {review?.customer?.name}
              </p>
              <div>
                <Rating
                  name="size-medium"
                  value={review.rating}
                  readOnly
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
        <p className=" text-right font-semibold min-w-[150px] sm:w-auto w-full sm:mt-0 mt-2 text-slate-500">
          {new Date(review?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{review?.reviewHeadline}</h2>
        <p className="mt-2">{review?.review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
