const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg ml-2 bg-slate-700 text-white hover:bg-white hover:text-black hover:border-2 hover:border-slate-700"
    >
      {label}
    </button>
  );
};

export default Button;
