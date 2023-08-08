import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store";

// Use throughout app instead of plain `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;
