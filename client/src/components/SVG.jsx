import React from "react";
import classNames from "classnames";
import { ReactSVG } from "react-svg";

export default function SVG({ src, className = "", ...props }) {
  try {
    return (
      <ReactSVG
        src={src}
        wrapper="span"
        className={classNames("icon", className)}
        {...props}
      />
    );
  } catch (err) {
    console.error(err);
    return null;
  }
}
