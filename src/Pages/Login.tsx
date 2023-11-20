import React, { useEffect, useState } from "react";
import Logo from "../Components/logo.tsx";
import FieldsetForm from "../Components/Form/FieldsetForm.tsx";
import { iFormDataObject } from "../Interfaces/Interfaces.ts";

const Login: React.FC = () => {
  //states
  const [feedback, setFeedback] = useState<string>("");
  const [formData, setFormData] = useState<Array<iFormDataObject>>([
    {
      label: "Email or username",
      data: "",
      input: {
        type: "text",
        autoComplete: "off",
        required: true,
        placeholder: "email or username",
      },
    },
    {
      label: "Password",
      data: "",
      input: {
        type: "password",
        autoComplete: "off",
        required: true,
        placeholder: "Password",
      },
    },
  ]);

  //refs

  const onCancel: Function = () => { };

  const SignIn: Function = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  }, [feedback]);

  return (
    <main className="relative overflow-hidden min-w-[265px] ">
      <section className="absolute h-screen w-screen bg-gray-700 flex min-w-[265px]">
        <div className="w-full h-full bg-slate-700/10">
          <div className="w-[50%] min-h-[1600px] h-[150%] bg-gradient-to-r from-white/20 to-slate-700 rotate-[25deg]  relative left-[53%] bottom-48 "></div>
        </div>
      </section>

      <section className="relative h-screen w-screen flex justify-center flex-col text-center ">
        <main className="mx-auto">
          <div className="flex justify-center pb-5">{<Logo />}</div>
          <div className="uppercase pb-8 ">
            <span className="text-white font-semibold text-xl tracking-wide">
              C Y N O
            </span>
            <span className="text-yellow-600 font-semibold text-xl">
              {" "}
              S U R E{" "}
            </span>
          </div>
          <div >
            <div className="text-center text-red-500 pb-2">
              <span style={{ visibility: "hidden" }}>.</span>
              {feedback}
            </div>
            <FieldsetForm
              formData={formData}
              setformData={setFormData}
              onCancel={onCancel}
              onSubmit={SignIn}
              Styles={{
                input: {
                  color: "white",
                },
                label: {
                  color: "white",
                  fontSize: "10px",
                  fontStyle: "italic",
                  position: "relative",
                  bottom: "2px",
                },
                button: {
                  border: "2px solid #ca8a04",
                  backgroundColor: "#a16207",
                  minWidth: "100px",
                  marginLeft: "5px",
                  padding: "5px",
                },
                form: {
                  width: "350px",
                }
              }}
              buttonLabels={{ submit: "Login", reset: "Cancel" }}
            />
          </div>
        </main>
      </section>
    </main>
  );
};

export default Login;
