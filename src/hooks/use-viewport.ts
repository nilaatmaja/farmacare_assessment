import { useState, useEffect } from 'react';

function useViewport() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowSizeChange);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  const isMobile = width <= 768;
  const isDesktop = width > 768;
  return { width, isMobile, isDesktop };
}

export default useViewport;
