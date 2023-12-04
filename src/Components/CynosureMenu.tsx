import React from "react";
import MenuWithSideBar from "./Menu/MenuWithSideBar/Index"
import { iMenuWithSideBarObject } from "../Interfaces/Interfaces.ts";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { BsCart4, BsCashCoin } from "react-icons/bs";
import { BiCartDownload } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";

const menuContent: iMenuWithSideBarObject[] = [
    {
        label: "Asset",
        icon: BsCashCoin,
        sideBarContent: [
            { title: "Add asset" },
            { title: "View assets" }
        ],
    },
    {
        label: "Stocks",
        icon: MdOutlineInventory,
        sideBarContent: [
            {
                title: "Item",
                children: [
                    { title: "Add new item" },
                    { title: "Check item price" }
                ]
            },
            {
                title: "Stock",
                children: [
                    { title: "Add stock" },
                    { title: "Check quantity" }
                ]
            },
            { title: "Check quantity" },
            { title: "Records" },
        ],
    },
    {
        label: "Sales",
        icon: BsCart4,
        sideBarContent: [
            { title: "Sell" },
            { title: "Credit" },
            { title: "Debit" },
            { title: "Records" },
        ]
    },
    {
        label: "Financing",
        icon: GiTakeMyMoney,
        sideBarContent: [
            { title: "Loan" },
            { title: "Gift" },
            { title: "Internal" },
            { title: "Records" },
        ]
    },
    {
        label: "Procurement",
        icon: BiCartDownload,
        sideBarContent: [
            { title: "Purchase" },
            { title: "Rental" },
            { title: "Asset borrowal" },
            { title: "Records" },
        ]
    },
    {
        label: "Configure",
        icon: AiOutlineSetting,
        sideBarContent: [
            {
                title: "Branches",
                children: [
                    { title: "Create branch" },
                    { title: "View branches" }],
            },
            {
                title: "Customers",
                children: [
                    { title: "Add customer" },
                    { title: "View customers" }],
            },
            {
                title: "Suppliers",
                children: [
                    { title: "Add supplier" },
                    { title: "View suppliers" }],
            },
            {
                title: "Company details",
            },
            { title: "Records" },
        ]
    },
    {
        label: "Human relation",
        icon: PiUsersThreeDuotone,
        sideBarContent: [
            { title: "Employ" },
            { title: "Salary" },
            { title: "Stipends" },
            { title: "Assign item" },
            { title: "Records" },
        ]
    },
];

const CynosureMenu = () => {
    return <MenuWithSideBar content={menuContent} />
}

export default CynosureMenu;