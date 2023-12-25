import React from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import SellItem from "./pages/SellItem";
import UpdateProduct from "./pages/UpdateProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="relative sm:-8 bg-[#ddd0c8] flex flex-row ">
      <div className="flex-1 max-sm:w-full   min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-product" element={<CreateCampaign />} />
          <Route path="/product-details/:id" element={<CampaignDetails />} />
          <Route path="/sell-item" element={<SellItem />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/product-update/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
