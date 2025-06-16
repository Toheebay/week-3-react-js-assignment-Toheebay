// src/components/Card.jsx
import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
