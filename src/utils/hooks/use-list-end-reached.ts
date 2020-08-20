import { useRef, useEffect } from "react";

const useListEndReached = (list: string[], onReached: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.addEventListener("scroll", handleScroll);
    return () => ref.current?.removeEventListener("scroll", handleScroll);
  }, [list.length]);

  const handleScroll = (e: any) => {
    console.log("scroll top:", e.target.scrollTop);
    console.log("scroll height:", e.target.scrollHeight);
    console.log("scroll clientHeight:", e.target.clientHeight);

    const bottom =
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 50 &&
      e.target.scrollHeight - e.target.scrollTop > e.target.clientHeight - 50;
    if (bottom) {
      console.log("scroll end reached", list.length);
      if (list.length > 0) onReached();
    }
  };

  return ref;
};

export default useListEndReached;
