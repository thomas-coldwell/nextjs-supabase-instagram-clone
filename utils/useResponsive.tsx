import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// https://github.com/contra/react-responsive/issues/162#issuecomment-592082035
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85

function useResponsive() {
  const [isClient, setIsClient] = useState(false);

  const isSmallMobile = useMediaQuery({
    maxWidth: 350,
  });

  const isMobile = useMediaQuery({
    minWidth: 350,
    maxWidth: 768,
  });

  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1024,
  });

  const isDesktop = useMediaQuery({
    minWidth: 1024,
  });

  useEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, []);

  return {
    isDesktop: isClient ? isDesktop : true,
    isTablet: isClient ? isTablet : false,
    isMobile: isClient ? isMobile : false,
    isSmallMobile: isClient ? isSmallMobile : false,
  };
}

export default useResponsive;
