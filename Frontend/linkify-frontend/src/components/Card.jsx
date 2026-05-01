import React from "react";
import { motion } from "framer-motion";
const Card = ({ title, desc }) => {
  const imageUrl = new URL(`../assets/${title}.png`, import.meta.url).href;
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
       className="shadow-[4px_6px_10px_rgba(0,0,0,0.3)] shadow-secondary border flex flex-col px-4 py-8  gap-3 rounded-sm"
    >
      <h1 className="text-card-title text-xl font-bold ">{title}</h1>
      <div className="flex items-center justify-center">
        <img src={imageUrl} alt={title} className="w-58 h-50" />
      </div>
      <p className="text-para-color text-sm"> {desc}</p>
    </motion.div>
  );
};

export default Card;