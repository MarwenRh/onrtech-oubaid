type props = {
  visibility: string;
  value: string;
  onClick?: () => void;
};
const Button = ({ value, visibility, onClick }: props) => {
  return (
    <button
      className={`
      bg-sky-400   text-xs font-bold text-white bg-lightTeal rounded-full baseline hover:bg-teal hover:bg-sky-700 ${visibility} `}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
