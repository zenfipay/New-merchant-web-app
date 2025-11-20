"use client";
import React from "react";
import { motion, Transition } from "framer-motion";

const AnimatedCheckmark = () => {
  const polygons = [
    {
      points:
        "346.35,94.2 358.35,117.2 213.35,238.2 131.35,172.2 153.35,159.2 211.35,206.2 345.35,95.2",
      stroke: "#014DFF",
    },
    {
      points:
        "154.35,160.2 212.35,205.2 345.35,94.2 338.35,72.2 217.35,171.2 164.35,130.2 154.35,160.2",
      stroke: "#D0DEFF",
      fill: "red"
    },
    {
      points: "130.35,172.2 153.35,159.2 163.35,129.2 140.35,143.2 131.35,171.2",
      stroke: "#77FF00",
    },
    {
      points: "345.35,93.2 357.35,115.2 345.35,79.2 338.35,72.2 345.35,93.2",
      stroke: "#20195F",
    },
  ];

  const transition: Transition = { duration: 1, ease: "easeInOut" };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="120 70 250 180"
      width="200"
      height="200"
    >
      {polygons.map((poly, i) => (
        <motion.polygon
          key={i}
          points={poly.points}
          fill="none"
          stroke={poly.stroke}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...transition, delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
};

export default AnimatedCheckmark;
