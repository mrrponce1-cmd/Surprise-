import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import cakeAnimation from "../assets/cake.json"; // path to your JSON file

function BirthdayHeader() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Animated Greeting */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        style={{ color: "#ff69b4" }}
      >
        🎉 Happy Birthday, My Dear Ashy 🎉
      </motion.h1>

      {/* Animated Cake */}
      <div style={{ width: 300, margin: "0 auto", marginTop: "20px" }}>
        <Lottie animationData={cakeAnimation} loop={true} />
      </div>
    </div>
  );
}

export default BirthdayHeader;
