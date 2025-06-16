const LinkButton = ({ href, label }) => {
    return (
      <a
        href={href}
        className="text-indigo-400 hover:text-indigo-300 font-medium underline"
      >
        {label}
      </a>
    );
  };
  
  export default LinkButton;
  