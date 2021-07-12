import { useEffect } from "react";
import { useState } from "react";

export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(!!("ontouchstart" in window || navigator.msMaxTouchPoints));
  }, []);

  return isTouch;
};
