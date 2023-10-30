import PurchaseForm from "../Components/PurchasingForm.tsx";
import NavBar from "../Components/NavBar.tsx";
import Menu from "../Components/Menu.tsx";
import React from "react";

const PurchaseItems: React.FC = () => {
  return (
    <main className="flex w-screen min-h-screen h-full overflow-x-hidden bg-slate-700 ">
      <Menu />
      <section className="w-full min-h-[565px]  overflow-y-hidden">
        <NavBar />
        <div className="min-h-[calc(565-50px)] h-full  ">
          <PurchaseForm TypeOfPurchase={"Purchase"}></PurchaseForm>
        </div>
      </section>
    </main>
  );
};

export default PurchaseItems;
