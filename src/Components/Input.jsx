const Input = ({
  type,
  condition,
  id,
  name,
  autoComplete,
  refValue,
  placeholder,
  style,
}) => {
  // refValue is the ref of the input thats the input into required collection or not required collection
  //condition is the boolean value that the input use to render valid (white) or invalid(border red) states
  //style is the tailwing styling of input
  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={autoComplete}
      ref={refValue}
      placeholder={placeholder}
      className={!condition ? style?.valid : style?.invalid}
    ></input>
  );
};

export default Input;
