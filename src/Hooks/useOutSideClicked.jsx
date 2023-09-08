import { useEffect } from "react";

export const useOutsideClicked = (
  TargetItemRef,
  setDisplayBooleanToFalseFuction,
  defaultValue,
  dependantArray
) => {
  //when outside menu is clicked while menu is opened
  return useEffect(() => {
    const OutsideClicked = (e) => {
      if (TargetItemRef && !TargetItemRef.current?.contains(e.target)) {
        setDisplayBooleanToFalseFuction(defaultValue);
      }
    };
    document.addEventListener("click", OutsideClicked);

    return () => {
      document.removeEventListener("click", OutsideClicked);
    };
  }, dependantArray);
};
