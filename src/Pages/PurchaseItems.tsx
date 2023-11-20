import PurchaseForm from "../Components/PurchasingForm.tsx";
import NavBar from "../Components/NavBar.tsx";
import Menu from "../Components/Menu/MenuWithSideBar.tsx";
import React from "react";
import CynosureLayout from '../Layouts/CynosureLayout.tsx'

const PurchaseItems: React.FC = () => {
  return (
    <CynosureLayout hideNavigationNextToMenu={true}>
      <PurchaseForm TypeOfPurchase={"Purchase"} ></PurchaseForm>
    </CynosureLayout>
  );
};

export default PurchaseItems;
