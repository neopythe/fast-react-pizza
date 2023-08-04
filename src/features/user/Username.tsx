import { useSelector } from "react-redux";

import type { UserState } from "@/types";

function Username() {
  const { username } = useSelector((state: { user: UserState }) => state.user);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
