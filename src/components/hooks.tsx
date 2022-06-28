import React from "react";

export const useIntersectionObserver = (options = { rootMargin: "120px" }) => {
  const ref = React.useRef(null);
  const [isIntersected, setIsIntersected] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([element]) => {
      if (element.isIntersecting) {
        setIsIntersected(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { intersectionRef: ref, isIntersected };
};
