import { useNavigate, Link } from "react-router-dom";

interface LinkButtonProps {
  children: React.ReactNode;
  to: string;
}

const classes = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();

  if (to === "-1") {
    return (
      <button
        onClick={() => {
          navigate(-1);
        }}
        className={classes}
      >
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

export default LinkButton;
