import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { toast } from "react-toastify";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { contract, address, deleteProduct, buyProduct } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.dateNTime);

  const fetchDonators = async () => {
    // const data = await getDonations(state.pId);
    // setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleBuy = async () => {
    setIsLoading(true);

    await buyProduct(state.pId, state.price);

    navigate("/");
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    navigate(`/product-update/${state.pId}`, { state: state });
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteProduct(state.pId);

    navigate("/");
    setIsLoading(false);
  };

  const textFieldRef = useRef(null);

  const copyText = () => {
    if (textFieldRef.current) {
      textFieldRef.current.select();
      document.execCommand("copy");
      toast.success("Text copied to clipboard");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="product"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#000000]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          {/* <CountBox
            title="Days Left"
            value={state.dateNTime.toString().substr(0, 2)}
          /> */}
          {/* <CountBox
            title={`Raised of ${state.price}`}
            value={state.amountCollected}
          /> */}
          {/* <CountBox title="Total Buyers" value={donators.length} /> */}
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
              Seller
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">
                  {state.manufacturerName}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  {state.owner}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
              Description
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] bg-white rounded p-4 leading-[26px] text-justify ">
                {state.description}
              </p>
            </div>
          </div>

          <div className=" flex gap-x-4 align-middle">
            <h4
              className="font-epilogue font-semibold text-[15px] text-black uppercase flex align-middle"
              style={{ alignItems: "center" }}
            >
              Universal Product Code (UPC)
            </h4>
            <input
              type="text"
              ref={textFieldRef}
              defaultValue={
                state.upc ? state.upc : "UPC no, couldn't be generated"
              }
              className="w-fit py-[20px] sm:px-[15px] px-[10px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px] cursor-pointer  max-h-8"
              onClick={copyText}
            />
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
              Buyers
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No Buyers yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">
            Total Amount
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#ffffff] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              {state.title}
            </p>
            <div className="mt-[30px]">
              <p
                type="number"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              >
                {state.price}
              </p>
              <div className="my-[20px] p-4 bg-[#ddd0c8] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-black">
                  Tracking *
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Your product will get tracked here
                </p>
              </div>
              <CustomButton
                btnType="button"
                title={"Buy product"}
                styles="w-full bg-[#ddd0c8]"
                handleClick={() => {
                  handleBuy();
                }}
              />
              <br />
              <br />
              {state.owner == address ? (
                <CustomButton
                  btnType="button"
                  title={"Edit"}
                  styles="w-full bg-[#ddd0c8]"
                  handleClick={() => {
                    if (state.owner == address) handleUpdate();
                  }}
                />
              ) : (
                ""
              )}
              <br />
              <br />
              {state.owner == address ? (
                <CustomButton
                  btnType="button"
                  title={"Delete"}
                  styles="w-full bg-[#ddd0c8]"
                  handleClick={() => {
                    if (state.owner == address) handleDelete(state.pId);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
