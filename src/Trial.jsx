import { useRef, useState } from "react";

const formDetails = [
  {
    label: "first name",
    input: {
      placeHolder: "Name",
      required: true,
    },
    validate: (value) => {
      if (value !== null && value !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    label: "last name",
    input: {
      placeHolder: "Name",
      required: true,
    },
  },
  {
    label: "age",
    input: {
      placeHolder: "Age",
      required: false,
    },
  },
];

const Mother = () => {
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    age: "",
  });

  const inputRefs = useRef([]);

  const attachRefToElement = (element) => {
    if (element && !inputRefs.current?.includes(element)) {
      inputRefs?.current?.push(element);
    } else {
      inputRefs?.current?.pop(element);
    }
  };

  const onFormSubmit = () => {
    console.log(inputRefs);
  };

  return (
    <main>
      <Form
        formDetails={formDetails}
        refValue={attachRefToElement}
        inputRefs={inputRefs}
        onFormSubmit={onFormSubmit}
      ></Form>
    </main>
  );
};

const Form = ({ formDetails, refValue, inputRefs, onFormSubmit }) => {
  return (
    <div
      style={{
        border: "1px solid red",
        width: "fit-content",
        margin: "0 auto",
        position: "relative",
        top: "100px",
      }}
    >
      <form>
        {formDetails.map((elements, index) => {
          return (
            <div key={index}>
              <label>{elements.label}</label>
              <input
                ref={refValue}
                id={elements.input.placeHolder}
                placeholder={elements?.input.placeHolder}
              ></input>
            </div>
          );
        })}
      </form>
      <div>
        <button onClick={onFormSubmit}>Submit</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Mother;
