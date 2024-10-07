interface Props {
  label: string;
  onClick?: () => void;
}

function Button({ label, onClick }: Props) {
  return (
    <button
      className="bg-green-800 hover:bg-[#9AA889] text-white font-bold py-2 px-4 rounded-full"
      onClick={() => onClick?.()}
    >
      {label}
    </button>
  );
}

export default Button;
