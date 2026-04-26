import React from "react";

function Navigation({ setSection }) {
  const buttonStyle = {
    backgroundColor: "#ff69b4",   // pink birthday color
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease"
  };

  const hoverStyle = {
    backgroundColor: "#ff1493",   // darker pink on hover
    transform: "scale(1.1)"
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        style={buttonStyle}
        onMouseOver={e => Object.assign(e.target.style, hoverStyle)}
        onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
        onClick={() => setSection("header")}
      >
        🎉 Greeting
      </button>

      <button
        style={buttonStyle}
        onMouseOver={e => Object.assign(e.target.style, hoverStyle)}
        onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
        onClick={() => setSection("gallery")}
      >
        📸 Photos
      </button>

      <button
        style={buttonStyle}
        onMouseOver={e => Object.assign(e.target.style, hoverStyle)}
        onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
        onClick={() => setSection("message")}
      >
        💌 Message
      </button>
    </div>
  );
}

export default Navigation;
