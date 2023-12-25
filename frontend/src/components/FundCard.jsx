import React from "react";

import { tagType, thirdweb } from "../assets";

const FundCard = ({
  address,
  owner,
  title,
  quantity,
  image,
  dateNTime,
  price,
  manufacturerName,
  handleClick,
  description,
  category,
}) => {
  // Assuming you have fetched the uint256 date value from the blockchain
  const blockchainDate = dateNTime; // Example value you provided

  // Convert the uint256 date to a JavaScript Date object
  const date = new Date(blockchainDate);

  // Get various components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getDate();

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div
      className="sm:w-[260px] w-full rounded-[15px] bg-[#ffffff] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            {category}
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate inline">
            {title}{" "}
          </h3>
          <span className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] ">
            by {manufacturerName}
          </span>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {/* {price} */}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              No. of products {parseInt(quantity)}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {formattedDate}
            </h4>
            <span className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {/* days */}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#ddd0c8]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
