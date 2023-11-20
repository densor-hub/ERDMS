import React from "react";
import MenuWithSideBar from "../Components/Menu/MenuWithSideBar.tsx";
import PageRightSide from "../Components/PageRightSide.tsx";
import NavBar from "../Components/NavBar.tsx";
import { iMenucontentContainer } from "../Interfaces/Interfaces.ts";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { BsCart4, BsCashCoin } from "react-icons/bs";
import { BiCartDownload } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";

const CynosureLayout = ({ children, hideNavigationNextToMenu }: any) => {
  const headers = [
    { label: "Asset", icon: BsCashCoin },
    { label: "Stocks", icon: MdOutlineInventory },
    { label: "Sales", icon: BsCart4 },
    { label: "Financing", icon: GiTakeMyMoney },
    { label: "Procurement", icon: BiCartDownload },
    { label: "Configure", icon: AiOutlineSetting },
    { label: "Human relation", icon: PiUsersThreeDuotone },
  ];

  const sideBarContent: Array<iMenucontentContainer> = [
    {
      id: "Asset",
      content: [{ title: "Add asset" }, { title: "View assets" }],
    },
    {
      id: "stocks",
      content: [
        {
          title: "Item",
          children: [{ title: "Add new item" }, { title: "Check item price" }],
        },
        {
          title: "Stock",
          children: [{ title: "Add stock" }, { title: "Check quantity" }],
        },
        { title: "Check quantity" },
        { title: "Records" },
      ],
    },
    {
      id: "sales",
      content: [
        { title: "Sell" },
        { title: "Credit" },
        { title: "Debit" },
        { title: "Records" },
      ],
    },
    {
      id: "financing",
      content: [
        { title: "Loan" },
        { title: "Gift" },
        { title: "Internal" },
        { title: "Records" },
      ],
    },
    {
      id: "procurement",
      content: [
        { title: "Purchase" },
        { title: "Rental" },
        { title: "Asset borrowal" },
        { title: "Records" },
      ],
    },

    {
      id: "Human Relation",
      content: [
        { title: "Employ" },
        { title: "Salary" },
        { title: "Stipends" },
        { title: "Assign item" },
        { title: "Records" },
      ],
    },
    {
      id: "configure",
      content: [
        {
          title: "Branches",
          children: [{ title: "Create branch" }, { title: "View branches" }],
        },
        {
          title: "Customers",
          children: [{ title: "Add customer" }, { title: "View customers" }],
        },
        {
          title: "Suppliers",
          children: [{ title: "Add supplier" }, { title: "View suppliers" }],
        },
        {
          title: "Company details",
        },
        { title: "Records" },
      ],
    },
  ];
  return (
    <main className="flex w-full  overflow-hidden h-screen min-h-[560px]" >
      <MenuWithSideBar headers={headers} sideBarContent={sideBarContent} />
      <section className="w-full h-full">
        <NavBar />
        <section className="w-full flex h-full" >
          {!hideNavigationNextToMenu && <PageRightSide
            appName={"CYNOSURE"}
            actions={[{ label: "Employement" }]}
          />}
          {children}
        </section>
      </section>
    </main>
  );
};

export default CynosureLayout;
