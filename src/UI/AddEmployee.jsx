import Menu from "../Components/Menu";
import NavBar from "../Components/NavBar";
import FormRightSide from "../Components/FormRightSide";
import AddPersonForm from "../Components/AddPersonForm";

const AddEmployee = () => {
  return (
    <main className="flex w-full h-full overflow-x-hidden ">
      <Menu />
      <section className="w-full ">
        <NavBar />
        <section className="w-full flex h-screen min-h-[515px]">
          <FormRightSide
            appName={"CYNOSURE"}
            actions={[{ label: "Employement" }]}
          ></FormRightSide>

          <AddPersonForm />
        </section>
      </section>
    </main>
  );
};

export default AddEmployee;
