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
        { title: "Add item" },
        { title: "Add stock" },
        { title: "Check price" },
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

  return (
    <main className={"flex w-fit"} ref={MenuRef}>
      <section className="w-32 min-h-screen  bg-slate-700 ">
        <MenuChild
          label={"Asset"}
          onClick={onClick}
          content={content}
          currentContent={currentContent}
        >
          <BsCashCoin color="white" size={30} />
        </MenuChild>

        <MenuChild
          label={"Stocks"}
          onClick={onClick}
          content={content}
          currentContent={currentContent}
        >
          <MdOutlineInventory color="white" size={30} />
        </MenuChild>

        <MenuChild
          label={"Sales"}
          onClick={onClick}
          content={content}
          currentContent={currentContent}
        >
          <BsCart4 color="white" size={30} />
        </MenuChild>

        <MenuChild
          label={"Financing"}
          onClick={onClick}
          content={content}
          currentContent={currentContent}
        >
          <GiTakeMyMoney color="white" size={30} />
        </MenuChild>

        <MenuChild
          label={"Procurement"}
          onClick={onClick}
          content={content}
          currentContent={currentContent}
        >
          <BiCartDownload color="white" size={30} />
        </MenuChild>

        <MenuChild
          label={"Configure"}
          onClick={onClick}
          content={content}
          currentContent={currentContent}
        >
          <AiOutlineSetting color="white" size={30} />
        </MenuChild>

        <MenuChild
          label={"Human Relation"}
          onClick={onClick}
          content={content}
          currentContent={currentContent}
        >
          <PiUsersThreeDuotone color="white" size={30} />
        </MenuChild>
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
