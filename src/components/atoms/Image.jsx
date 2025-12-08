import { useState } from "react";

export const Image = ({ src, alt = "image", className = "" }) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? "/fallback.png" : src}
      alt={alt}
      onError={() => setError(true)}
      className={`object-cover rounded-md ${className}`}
    />
  );
};
