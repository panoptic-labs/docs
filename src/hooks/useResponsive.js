// import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'

const useResponsive = () => {
  // const [width, setWidth] = useState(1920);
  // const isTabletWidth = width <= 1024;
  // const isMobileWidth = width <= 767;
  // const is440 = width <= 440;

  const isTabletWidth = useMediaQuery({ query: '(max-width: 1024px)' })
  const isMobileWidth = useMediaQuery({ query: '(max-width: 767px)' })
  const is440 = useMediaQuery({ query: '(max-width: 440px)' })

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWidth(window.innerWidth);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return {
    isMobileWidth,
    isTabletWidth,
    is440,
  };
};

export default useResponsive;
