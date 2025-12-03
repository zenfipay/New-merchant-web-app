"use client";

import React from "react";

interface Props {
  options: string[];
  selected?: string | null;
  onSelect: (chain: string) => void;
}

export const ChainSelector: React.FC<Props> = ({ options, selected, onSelect }) => {
  return (
    <div className="flex gap-2">
      {options.map((ch) => (
        <button
          key={ch}
          onClick={() => onSelect(ch)}
          className={`px-3 py-1 rounded-md border ${selected === ch ? "bg-gray-200" : ""}`}
        >
          {ch}
        </button>
      ))}
    </div>
  );
};
