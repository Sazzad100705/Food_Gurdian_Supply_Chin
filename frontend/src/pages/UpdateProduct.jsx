import React, { useState } from "react";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { UpdateProduct } = useStateContext();
  const { state } = useLocation();
  const { id } = useParams();

  const [form, setForm] = useState({
    id,
    title: state.title,
    description: state.description,
    quantity: state.quantity,
    price: state.price,
    image: state.image,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        console.log("form", form);
        await UpdateProduct({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
        });
        setIsLoading(false);
        navigate("/profile");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-color flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Update Product
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

        <div className="flex flex-wrap gap-[40px]"></div>

        <FormField
          labelName="Product image *"
          placeholder="Place image URL of your Product"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton btnType="submit" title="Update" styles="bg-[#ffffff]" />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
