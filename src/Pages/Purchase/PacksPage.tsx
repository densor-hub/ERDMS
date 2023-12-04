import PacksForm from "./PacksForm.tsx";
import React from "react";
import CynosureLayout from '../../Layouts/CynosureLayout.tsx'

const PurchaseItems: React.FC = () => {
  return (
    <CynosureLayout>
      <PacksForm/>
    </CynosureLayout>
  );
};

export default PurchaseItems;
