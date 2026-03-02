import React from "react";
import { motion } from "framer-motion";

function Gallery() {
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg"
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
      {images.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`memory-${index}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: index * 0.5 }}
          style={{ width: "200px", borderRadius: "10px" }}
        />
      ))}
    </div>
  );
}

export default Gallery;
