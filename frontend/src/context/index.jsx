import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    // "0xD9C826e698026De7c27bA04e1B2e2777cA7c47bA"
    // "0xb73c559F594988d3bdFB97D2cadA639C8a7525d6"
    "0xE92f2e74A2fC5282735d9F38a3E3C80d6992D2d7"
  );
  const { mutateAsync: createProduct } = useContractWrite(
    contract,
    "createProduct"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishProduct = async (form) => {
    let txHash = "";
    try {
      const data = await createProduct({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.quantity,
          form.price,
          form.manufacturerName,
          form.manufacturerNo,
          new Date(form.dateNTime).getTime(), // deadline,
          form.image,
          form.category,
          form.upc,
          txHash,
        ],
      });
      // console.log("creating object", form.price);
      console.log(data);

      if (data.receipt.transactionHash) {
        let txHash = data.receipt.transactionHash;
        console.log(txHash);
        try {
          const data2 = await contract.call("storeData", [form.upc, txHash]);

          console.log("contract call success", data2);
          return data;
        } catch (error) {
          toast.error(
            "Error while updating transaction hash, please try again"
          );
          console.log("contract call failure", error);
        }
      }
      toast.success("Product created successfully.");
      console.log("contract call success", data);
    } catch (error) {
      toast.error("Error while creating Product, please try again");
      console.log("contract call failure", error);
    }
  };

  const getHash = async (upc) => {
    const txHash = await contract.call("getTxHash", [upc]);
    return txHash;
  };

  const showProducts = async () => {
    const products = await contract.call("showProducts");

    const parsedProducts = products.map((product, i) => ({
      owner: product.owner,
      title: product.title,
      description: product.description,
      quantity: product.quantity.toString(),
      price: ethers.utils.formatEther(product.price.toString()),
      manufacturerName: product.manufacturerName,
      manufacturerNo: product.manufacturerNo.toString(),
      dateNTime: product.dateNTime.toNumber(),
      image: product.image,
      category: product.category,
      upc: product.upc,
      txHash: product.transactionHash,
      pId: i,
    }));

    return parsedProducts;
  };

  const deleteProduct = async (pId) => {
    try {
      const data = await contract.call("deleteProduct", [pId]);

      toast.success("Product deleted successfully.");
      console.log("contract call success", data);
      return data;
    } catch (error) {
      toast.error("Error while deleting Product, please try again");
      console.log("contract call failure", error);
    }
  };

  const getUserProducts = async () => {
    const allProducts = await showProducts();

    const filteredProducts = allProducts.filter(
      (product) => product.owner === address
    );

    return filteredProducts;
  };

  const UpdateProduct = async (form) => {
    try {
      const data = await contract.call("UpdateProduct", [
        form.id,
        form.title, // title
        form.description, // description
        form.quantity,
        form.price,
        form.image,
      ]);
      toast.success("Product updated successfully.");
      console.log("contract call success", data);
    } catch (error) {
      toast.error("Error while updating product, please try again");
      console.log("contract call failure", error);
    }
  };

  const buyProduct = async (pId, amount) => {
    try {
      const data = await contract.call("buyProduct", [pId], {
        value: ethers.utils.parseEther(amount),
      });
      toast.success("Product bought successfully. Thanks for your purchase");
      return data;
    } catch (err) {
      console.log("we're sorry !! Error occured while making purchase", err);
    }
  };

  // const getDonations = async (pId) => {
  //   const donations = await contract.call("getDonators", [pId]);
  //   const numberOfDonations = donations[0].length;

  //   const parsedDonations = [];

  //   for (let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: ethers.utils.formatEther(donations[1][i].toString()),
  //     });
  //   }

  //   return parsedDonations;
  // };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createProduct: publishProduct,
        showProducts,
        deleteProduct,
        getUserProducts,
        UpdateProduct,
        buyProduct,
        getHash,
      }}
    >
      <ToastContainer />
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
