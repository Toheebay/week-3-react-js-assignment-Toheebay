const Button = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-gray-900 hover:border-indigo-400 border border-transparent rounded-lg px-5 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-4"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  