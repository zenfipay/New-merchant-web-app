"use client";
import React, { useEffect, useRef, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const TabsHeader: React.FC<Props> = ({ tabs, activeTab, onChange }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const active = tabRefs.current[tabs.findIndex(t => t.id === activeTab)];
    if (active && active.parentElement) {
      const rect = active.getBoundingClientRect();
      const parent = active.parentElement.getBoundingClientRect();
      setSliderStyle({ left: rect.left - parent.left, width: rect.width });
    }
  }, [activeTab, tabs]);

  return (
    <div className="relative flex items-center gap-6 border-b border-gray-200">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          ref={(el) => {tabRefs.current[i] = el}}
          onClick={() => onChange(tab.id)}
          className={`pb-2 text-sm font-medium cursor-pointer ${
            activeTab === tab.id ? "text-[#101010]" : "text-[#7D7D7D] hover:text-[#636363]"
          }`}
        >
          {tab.label}
        </button>
      ))}
      <span
        className="absolute bottom-0 h-0.5 bg-[#014DFF] transition-all rounded-full"
        style={{ left: sliderStyle.left, width: sliderStyle.width }}
      />
    </div>
  )
};
