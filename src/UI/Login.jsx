import { useEffect, useState } from "react";
import { useRef } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Logo from "../Components/logo";

const Root = () => {
  //states
  const [feedback, setFeedback] = useState("");
  const [inputConditions, setInputConditions] = useState({
    username: false,
    password: false,
  });
  //refs
  const RequiredRefs = useRef([]);
  const addToRequiredRefs = (element) => {
    if (element && !RequiredRefs?.current?.includes(element)) {
      RequiredRefs.current?.push(element);
    }
  };

  const inputStyle = {
    valid: "h-9 rounded-md w-full bg-white text-sm py-3",
    invalid:
      "h-9 rounded-md w-full bg-white text-sm py-3 border-2 border-red-600/80",
  };

  const SignIn = (e) => {
    e.preventDefault();
    RequiredRefs.current.map((element) => {
      if (element.id === "username") {
        if (element?.value === "") {
          setFeedback("All fields required");
          setInputConditions((prev) => {
            return { ...prev, username: true };
          });
        } else {
          setInputConditions((prev) => {
            return { ...prev, username: false };
          });
        }
      }

      if (element.id === "password") {
        if (element?.value === "") {
          setFeedback("All fields required");
          setInputConditions((prev) => {
            return { ...prev, password: true };
          });
        } else {
          setInputConditions((prev) => {
            return { ...prev, password: false };
          });
        }
      }
      return true;
    });
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
        <main className="mx-auto w-60">
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
          <div>
            <div className="text-center text-red-500 pb-2">
              <span style={{ visibility: "hidden" }}>.</span>
              {feedback}
            </div>
            <form>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="pb-3">
                      <Input
                        type={"text"}
                        id="username"
                        autoComplete={"off"}
                        refValue={addToRequiredRefs}
                        placeholder={" Username"}
                        condition={inputConditions.username}
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3">
                      <Input
                        type={"text"}
                        id="password"
                        autoComplete={"off"}
                        refValue={addToRequiredRefs}
                        placeholder={" Password"}
                        condition={inputConditions.password}
                        style={inputStyle}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="text-center ">
                      <Button label={"Sign in"} onClick={SignIn}></Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </main>
      </section>
    </main>
  );
};

export default Root;
