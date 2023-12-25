import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton, FormField, Loader } from "../components";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const SellItem = () => {
  let txHash = "";
  const [foundObject, setFoundObject] = useState(null);
  const [hashed, setHashed] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { address, contract, showProducts, getHash } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await showProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract, foundObject]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    manufacturerName: "",
    manufacturerNo: "",
    dateNTime: "",
    image: "",
    category: "",
    upc: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (foundObject) {
    }
  };

  const productHistory = (e) => {
    e.preventDefault();
    let str = form.upc;
    if (str.length === 6) {
      const found = products.find((obj) => obj.upc == str);

      if (found) {
        setFoundObject(found);
        txHash = getHash(found.upc);
        txHash
          .then((hash) => {
            setHashed(hash);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        toast.error("Product with this UPC doesn't found!!");
      }
    } else {
      toast.warning("Universal product code must be of six characters.");
    }
  };

  // Assuming you have fetched the uint256 date value from the blockchain
  const blockchainDate = foundObject ? foundObject.dateNTime : null; // Example value you provided

  // Convert the uint256 date to a JavaScript Date object
  const date = new Date(blockchainDate);

  // Get various components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getDate();

  const formattedDate = `${year}-${month}-${day}`;

  const openInNewTab = () => {
    const newTab = window.open(
      `https://sepolia.etherscan.io/tx/${hashed}`,
      "_blank"
    );
    newTab.focus();
  };

  return (
    <div className="bg-color flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Sell Product
        </h1>
      </div>

      <form className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Universal product code (UPC) *"
            placeholder="Enter code..."
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          <FormField
            labelName="Price to sell *"
            placeholder="In wei"
            inputType="number"
            value={form.manufacturerName}
            handleChange={(e) => handleFormFieldChange("manufacturerName", e)}
          />
        </div>

        <div className="flex justify-center items-center mt-[10px]">
          <CustomButton
            btnType="submit"
            title="Sell Item"
            styles="bg-[#ffffff]"
          />
        </div>

        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] mt-12 ">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Ship Product
          </h1>
        </div>

        <FormField
          labelName="Universal product code (UPC) *"
          placeholder="Enter code..."
          inputType="text"
          value={form.title}
          handleChange={(e) => handleFormFieldChange("title", e)}
        />

        <div className="flex justify-center items-center mt-[10px]">
          <CustomButton
            btnType="submit"
            title="Ship Item"
            styles="bg-[#ffffff]"
          />
        </div>

        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] mt-12">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Get product details
          </h1>
        </div>
      </form>
      <form
        className="w-full mt-[65px] flex flex-col gap-[30px]"
        onSubmit={productHistory}
      >
        <FormField
          labelName="Universal product code (UPC) *"
          placeholder="Enter code..."
          inputType="text"
          value={form.upc}
          handleChange={(e) => handleFormFieldChange("upc", e)}
          onSubmit={handleSubmit}
        />

        {console.log(foundObject)}
        {foundObject ? (
          <div className="flex flex-col gap-y-2">
            <span className="flex gap-x-2">
              <span>Owner address</span> :
              <span className="">{foundObject.owner}</span>
            </span>
            <span className="flex gap-x-2 cursor-pointer">
              <span>Transaction Hash</span> :
              <span className="underline text-sky-800" onClick={openInNewTab}>
                {hashed}
              </span>
            </span>
            <span className="flex gap-x-2">
              <span>Title</span> :<span className="">{foundObject.title}</span>
            </span>
            <span className="flex gap-x-2">
              <span>Quantity</span> :
              <span className="">{foundObject.quantity}</span>
            </span>
            <span className="flex gap-x-2">
              <span>Price</span> :<span className="">{foundObject.price}</span>
            </span>
            <span className="flex gap-x-2">
              <span>Manufacturer name</span> :
              <span className="">{foundObject.manufacturerName}</span>
            </span>
            <span className="flex gap-x-2">
              <span>Manufacturer phone number</span> :
              <span className="">{foundObject.manufacturerNo}</span>
            </span>
            <span className="flex gap-x-2">
              <span>Production date</span> :
              <span className="">{formattedDate}</span>
            </span>
            <span className="flex gap-x-2">
              <span>Category</span> :
              <span className="">{foundObject.category}</span>
            </span>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-center items-center mt-[10px]">
          <CustomButton
            btnType="submit"
            title="Product History"
            styles="bg-[#ffffff]"
          />
        </div>
      </form>
    </div>
  );
};

export default SellItem;
