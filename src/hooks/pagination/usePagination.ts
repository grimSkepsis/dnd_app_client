import { useReducer } from "react";
import { UsePaginationProps, UsePaginationState } from "./types";

type PaginationAction = {
  type: "NEXT_PAGE" | "PREVIOUS_PAGE" | "PAGE_SELECTION" | "RESET_PAGE";
  payload?: number;
};

function paginationReducer(
  state: UsePaginationState,
  action: PaginationAction,
): UsePaginationState {
  switch (action.type) {
    case "NEXT_PAGE":
      return { ...state, pageIndex: state.pageIndex + 1 };
    case "PREVIOUS_PAGE":
      return { ...state, pageIndex: state.pageIndex - 1 };
    case "PAGE_SELECTION":
      return { ...state, pageIndex: action.payload };
    case "RESET_PAGE":
      return { ...state, pageIndex: 0 };
    default:
      return state;
  }
}

export function usePagination({
  state: initState,
  onNextPage: handleNextPage,
  onPreviousPage: handlePreviousPage,
  onSelectPage: handlePageSelection,
  onResetPage: handleResetPage,
}: UsePaginationProps) {
  const [state, dispatch] = useReducer(paginationReducer, initState);

  function onNextPage() {
    dispatch({ type: "NEXT_PAGE" });
    handleNextPage();
  }

  function onPreviousPage() {
    dispatch({ type: "PREVIOUS_PAGE" });
    handlePreviousPage();
  }

  function onPageSelection(pageIndex: number) {
    dispatch({ type: "PAGE_SELECTION", payload: pageIndex });
    handlePageSelection(pageIndex);
  }

  function onResetPage() {
    dispatch({ type: "RESET_PAGE" });
    handleResetPage();
  }

  return {
    state,
    onNextPage,
    onPreviousPage,
    onPageSelection,
    onResetPage,
  };
}
