import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Product",
    imgUrl: createCampaign,
    link: "/create-product",
    disabled: true,
  },
  {
    name: "sell-item",
    imgUrl: payment,
    link: "/sell-item",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "login",
    imgUrl: logout,
    link: "/login",
  },
];
