const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-600 p-2 rounded-md  text-white hover:bg-yellow-400 w-full"
    >
      {label}
    </button>
  );
};

export default Button;
