import React from "react";
import "./LazyImage.css";
import { useIntersectionObserver } from "./hooks";

/*
 * Image needs a ratio of 1:1 to fit the SVG placeholder.
 * This could be made configurable.
 */
export const LazyImage = ({ src, alt, color = "#F3F5F7" }) => {
  const { intersectionRef, isIntersected } = useIntersectionObserver();
  const url = isIntersected ? src : "";

  return (
    <div className="lazy-image">
      <div
        ref={intersectionRef}
        className="lazy-image_image"
        style={{ backgroundImage: `url("${url}")` }}
        aria-label={alt}
      />
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 1">
        <rect fill={color} height="1" width="1" />
      </svg>
    </div>
  );
};
