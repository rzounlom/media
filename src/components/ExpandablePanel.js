import { GoChevronDown, GoChevronLeft } from "react-icons/go";

import { useState } from "react";

export default function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div
          className="cursor-pointer text-xl"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2">{children}</div>}
    </div>
  );
}
