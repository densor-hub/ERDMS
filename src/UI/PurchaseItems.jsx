import PurchaseForm from "../Components/PurchasingForm";
import NavBar from "../Components/NavBar";
import Menu from "../Components/Menu";
const PurchaseItems = () => {
  return (
    <main className="flex w-screen h-screen overflow-x-hidden">
      <Menu />
      <section className="w-full">
        <NavBar />
        <div className="">
          <PurchaseForm TypeOfPurchase={"Purchase"}></PurchaseForm>
        </div>
      </section>
    </main>
  );
};

export default PurchaseItems;
