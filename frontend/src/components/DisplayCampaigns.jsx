import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../assets";
import { useSelector } from "react-redux";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const { searchData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/product-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="px-16">
      <h1 className="font-epilogue font-semibold text-[18px] text-black text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any Products yet
          </p>
        )}

        {!isLoading &&
          campaigns &&
          campaigns
            .filter((element) => {
              if (searchData.length === 0) {
                return element;
              } else {
                return element.title
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .map((campaign) => (
              <FundCard
                key={uuidv4()}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
