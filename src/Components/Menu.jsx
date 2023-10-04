import MenuChild from "./MenuChild";
import MenuContent from "./MenuContent";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { BsCart4, BsCashCoin } from "react-icons/bs";
import { BiCartDownload } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import { useOutsideClicked } from "../Hooks/useOutSideClicked";

const Menu = () => {
  const content = [
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

  const [currentContent, setCurrentContent] = useState([]);
  const MenuRef = useRef();

  //onclick function passed to MenuChild to set current MenuContent to be displayed
  const onClick = (content) => {
    setCurrentContent(content);
  };

  //when outside of Menu is Clicked
  useOutsideClicked(MenuRef, setCurrentContent, [], [currentContent]);

  const MenuItems = [
    { label: "Asset", icon: BsCashCoin },
    { label: "Stocks", icon: MdOutlineInventory },
    { label: "Sales", icon: BsCart4 },
    { label: "Financing", icon: GiTakeMyMoney },
    { label: "Procurement", icon: BiCartDownload },
    { label: "Configure", icon: AiOutlineSetting },
    { label: "Human relation", icon: PiUsersThreeDuotone },
  ];

  return (
    <main className={"flex w-fit"} ref={MenuRef}>
      <section className="w-32 min-h-screen  bg-slate-700 ">
        {MenuItems?.map((elements, index) => {
          return (
            <MenuChild
              key={index}
              label={elements?.label}
              onClick={onClick}
              content={content}
              currentContent={currentContent}
              icon={elements.icon}
            />
          );
        })}
      </section>

      <section
        className={
          currentContent?.content?.length > 0
            ? "relative right-10 w-60 translate-x-10 transition-transform duration-100 ease-in"
            : " relative left-10  transition-transform duration-[1s] "
        }
      >
        <MenuContent currentContent={currentContent}></MenuContent>
      </section>
    </main>
  );
};

export default Menu;
