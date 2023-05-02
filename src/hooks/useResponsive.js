import { useLayoutEffect, useState } from "react";

const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const isTabletWidth = width <= 1024;
  const isMobileWidth = width <= 767;

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
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
