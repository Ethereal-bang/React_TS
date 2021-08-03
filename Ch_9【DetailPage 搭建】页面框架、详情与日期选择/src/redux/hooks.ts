import {
    useSelector as useReduxSelector,    // 避免命名冲突
    TypedUseSelectorHook
} from "react-redux";
import { RootState } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;