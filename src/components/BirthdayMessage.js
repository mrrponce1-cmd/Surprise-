import React from "react";
import { motion } from "framer-motion";

function BirthdayMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ textAlign: "center", fontFamily: "cursive", marginTop: "30px", padding: "20px" }}
    >
      <p>
        On this special day, I just want to remind you how much joy you bring
        into my life. May your year be filled with love, laughter, and endless
        adventures. You deserve all the happiness in the world.
      </p>
    </motion.div>
  );
}

export default BirthdayMessage;
