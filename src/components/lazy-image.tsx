import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const LazyImage = ({
  src,
  alt,
  className,
  loading,
  decoding,
  onError,
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="animate-shimmer pointer-events-none absolute inset-0 z-[1]" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className ?? ""} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
    </>
  );
};

export default LazyImage;
