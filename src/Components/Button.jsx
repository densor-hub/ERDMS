import "../index.css";
const Button = ({ label, onClick, style }) => {
  return (
    //px-4 py-2 rounded-lg ml-2  text-white hover:bg-white hover:text-black hover:border-2 hover:border-slate-700
    <button
      onClick={onClick}
      className=" relative generalBTN"
      style={{ ...style }}
    >
      <div style={{ zIndex: 0 }} className="absolute w-full h-full abss"></div>
      <div className="relative rell">{label}</div>
    </button>
  );
};

export default Button;
