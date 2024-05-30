import React from "react";

function Badge({ variant, tag }) {
  switch (variant) {
    case "companyTag":
      return (
        <span style={{borderColor: tag.color, color: tag.color}} className="border border-solid rounded-full font-normal px-3 py-1 h-fit">
          {tag.name}
        </span>
      );
    case "offerTag":
      return (
        <span style={{backgroundColor: `${tag.color}1A`, color: tag.color}} className="rounded-full font-semibold px-4 py-2 h-fit">
          {tag.name}
        </span>
      );
    default:
      return (
        <span className="bg-lightGrey text-primary font-normal px-3 py-1 h-fit">
          {tag.name}
        </span>
      );
  }
}

export default Badge;
