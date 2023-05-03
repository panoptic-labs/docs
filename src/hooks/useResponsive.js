import { useLayoutEffect, useState } from "react";

const useResponsive = () => {
  const [width, setWidth] = useState(window.outerWidth);
  const isTabletWidth = width <= 1024;
  const isMobileWidth = width <= 767;

  useLayoutEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.outerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobileWidth,
    isTabletWidth,
  };
};

export default useResponsive;
