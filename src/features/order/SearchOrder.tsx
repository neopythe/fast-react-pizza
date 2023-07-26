import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
