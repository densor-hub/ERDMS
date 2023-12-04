import PiecesForm from "./PiecesForm.tsx";
import NavBar from "../../Components/NavBar.tsx";
import Menu from "../../Components/Menu/MenuWithSideBar/Index.tsx";
import React from "react";
import CynosureLayout from '../../Layouts/CynosureLayout.tsx'

const PurchaseItems: React.FC = () => {
  return (
    <CynosureLayout >
      <PiecesForm  ></PiecesForm>
    </CynosureLayout>
  );
};

export default PurchaseItems;
