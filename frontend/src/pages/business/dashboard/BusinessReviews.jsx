import React, { useEffect } from "react";
import Sidebar from "../../../components/business/Sidebar";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { getServiceProviderReviews } from "../../../api/review";
import ReviewCard from "../../../components/ReviewCard";

const BusinessReviews = () => {
  const user = useRecoilValue(serviceProviderAuthState);
  const [reviews, setReviews] = React.useState([]);

  useEffect(() => {
    getServiceProviderReviews(user?.id)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Reviews"));
  }, [user?.id]);

  console.log(reviews);

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"reviews"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Business Reviews</h1>
        <div className="w-full flex flex-col gap-8 py-8 ">
          {reviews?.map((review, index) => (
            <div key={index} className="p-5 shadow-xl border rounded-lg">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessReviews;
