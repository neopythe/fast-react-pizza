import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type?: "primary" | "secondary" | "small";
  onClick?: () => void;
}

const base =
  "inline-block rounded-full bg-yellow-400 px-4 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

const styles = {
  primary: `${base} py-3 md:px-6 md:py-4`,
  secondary:
    "inline-block rounded-full border-2 border-stone-300 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-3.5",
  small: `${base} py-2 text-xs md:px-5 md:py-2.5`,
};

function Button({
  children,
  disabled,
  to,
  type = "primary",
  onClick,
}: ButtonProps) {
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
