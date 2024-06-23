import {useEffect} from 'react'

function useHandleScroll(
  isLoading,
  dataError,
  childRef,
  setNavContentsActive,
  parentRef
) {
  useEffect(() => {
    const handleScroll = () => {
      if (!isLoading && !dataError) {
        const { top } = childRef.current.getBoundingClientRect();
        setNavContentsActive(top <= 20);
      }
    };

    const element = parentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading, dataError]);

  
}

export default useHandleScroll
