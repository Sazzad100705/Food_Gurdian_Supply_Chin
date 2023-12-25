import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage, generateUniqueCode } from "../utils";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CreateCampaign = () => {
  const upc = generateUniqueCode();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createProduct } = useStateContext();

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
    upc,
  });
  // console.log("input price", price);
  // console.log(form.price);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        console.log(form);
        await createProduct({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        toast.warning("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-color flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create a Product
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Product Name *"
            placeholder="Enter product name..."
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          <FormField
            labelName="Manufacturer Name *"
            placeholder="Enter Manufacturer Name"
            inputType="text"
            value={form.manufacturerName}
            handleChange={(e) => handleFormFieldChange("manufacturerName", e)}
          />
        </div>

        <FormField
          labelName="Description *"
          placeholder="Description of this product..."
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Quantity *"
            placeholder="Number of products..."
            inputType="text"
            value={form.quantity}
            handleChange={(e) => handleFormFieldChange("quantity", e)}
          />
          <FormField
            labelName="Price *"
            placeholder="Price of product..."
            inputType="text"
            value={form.price}
            handleChange={(e) => handleFormFieldChange("price", e)}
          />
        </div>
        <FormField
          labelName="Manufacturer Phone Number *"
          placeholder="Enter Phone number..."
          inputType="text"
          value={form.manufacturerNo}
          handleChange={(e) => handleFormFieldChange("manufacturerNo", e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-black h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[15px] md:text-[25px] text-white ml-[20px]">
            Rest assured, We maintains secure and reliable supply chain
            management
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Enter Production  Date *"
            placeholder="Enter Date"
            inputType="date"
            value={form.dateNTime}
            handleChange={(e) => handleFormFieldChange("dateNTime", e)}
          />
          <FormField
            labelName="Category of your product *"
            placeholder="Enter category"
            inputType="text"
            value={form.category}
            handleChange={(e) => handleFormFieldChange("category", e)}
          />
        </div>

        <FormField
          labelName="Product image *"
          placeholder="Place image URL of your Product"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new product"
            styles="bg-[#ffffff]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
