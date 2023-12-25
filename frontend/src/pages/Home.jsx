import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, showProducts } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await showProducts();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Products"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
