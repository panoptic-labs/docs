import { useMediaQuery } from 'react-responsive'

const useResponsive = () => {

  const isTabletWidth = useMediaQuery({ query: '(max-width: 1024px)' })
  const isMobileWidth = useMediaQuery({ query: '(max-width: 767px)' })
  const is440 = useMediaQuery({ query: '(max-width: 440px)' })

  return {
    isMobileWidth,
    isTabletWidth,
    is440,
  };
};

export default useResponsive;
