import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/business/Sidebar";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { getServiceProviderReviews } from "../../../api/review";
import ReviewCard from "../../../components/ReviewCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

  const [sort, setSort] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    getServiceProviderReviews(user?.id, text, event.target.value)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  const getReviewByText = (event) => {
    setText(event.target.value);
    getServiceProviderReviews(user?.id, event.target.value, sort)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("No Service Providers"));
  };

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"reviews"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Business Reviews</h1>
        <div className="w-full flex flex-col gap-8 py-8 ">
          <div className="flex justify-between">
            <input
              type={"text"}
              className="w-60 border-2 border-gray-300 rounded-lg p-2"
              placeholder="Search by text"
              onChange={getReviewByText}
            />
            <FormControl className="w-44">
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleChange}
                defaultValue={""}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"new"}>Newest</MenuItem>
                <MenuItem value={"old"}>Oldest</MenuItem>
                <MenuItem value={"rating"}>Rating(Low to High)</MenuItem>
                <MenuItem value={"-rating"}>Rating(High to Low)</MenuItem>
              </Select>
            </FormControl>
          </div>
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
