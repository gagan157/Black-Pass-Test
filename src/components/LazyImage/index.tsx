import { useState } from 'react';

interface LazyImageProps {
  lowQualitySrc?: string;
  highQualitySrc: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

const LazyImage = ({ lowQualitySrc='../../assets/resources/Logo.png', highQualitySrc, alt , className, imgClassName }: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div style={{ position: 'relative' }} className={className}>
      {/* Placeholder: Blurred image */}
      <img
        src={lowQualitySrc}
        className={imgClassName}
        style={{
          filter: 'blur(20px)', // Apply blur effect
          opacity: imageLoaded ? 0 : 1, // Hide when high-quality image is loaded
          transition: 'opacity 0.5s ease-in-out',
          position: 'absolute',
          top: 0,
          left: 0,          
        }}
        alt={alt}
      />

      {/* Actual image (lazy-loaded) */}
      <img
        src={highQualitySrc}
        alt={alt}
        loading="lazy"
        style={{
          opacity: imageLoaded ? 1 : 0, // Show when loaded
          transition: 'opacity 0.5s ease-in-out',          
        }}
        className={imgClassName}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default LazyImage;
