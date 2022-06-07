import { useEffect, useState } from "react";

const useDeviceProvider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    if (window.innerWidth < 1024) {
      setIsTab(true);
    } else {
      setIsTab(false);
    }
  };

  // create an event listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  return [isMobile, isTab];
};

export default useDeviceProvider;
