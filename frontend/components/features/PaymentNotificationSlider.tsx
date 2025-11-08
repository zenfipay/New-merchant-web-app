"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Notification } from "./Notification";
import { CustomButton } from "../custom/CustomButton";

const notifications = [
  {
    id: 1,
    icon: "/icons/checkmarkWhite.svg",
    text: "$20.00 USDT settled from transactionID",
    subText: "1 min ago",
  },
  {
    id: 2,
    icon: "/icons/checkmarkWhite.svg",
    text: "Just testing",
    subText: "2 mins ago",
  },
  {
    id: 3,
    icon: "/icons/checkmarkWhite.svg",
    text: "Testing 2",
    subText: "3 mins ago",
  },
];

export default function PaymentNotificationCarousel() {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const handleChange = (newIndex: number) => {
    if (newIndex === index) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      position: "absolute",
      top: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute",
      top: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      position: "absolute",
      top: 0,
    }),
  };

  return (
    <div className="w-full mx-auto relative overflow-hidden">

      {/* NOTIFICATIONS DISPLAY*/}
      <div className="relative min-h-[65px] flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={notifications[index].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            <Notification
              icon={notifications[index].icon}
              text={notifications[index].text}
              subText={notifications[index].subText}
            >
              <CustomButton
                variant="secondaryBrand"
                size="sm"
                text="Print receipt"
              />
            </Notification>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SELECTORS */}
      <div className="flex justify-center gap-2 mt-3">
        {notifications.map((_, i) => (
          <span
            key={i}
            onClick={() => handleChange(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-500 ${
              index === i ? "bg-[#014DFF]" : "bg-transparent border border-[#B0B7C7]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
