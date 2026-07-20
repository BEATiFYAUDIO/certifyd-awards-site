import { useEffect, useState } from 'react';

const heroVideos = [
  '/media/awards-hero-carousel-1.mp4?v=20260720b',
  '/media/awards-hero-carousel-2.mp4?v=20260720b',
  '/media/awards-hero-carousel-3.mp4?v=20260720b',
  '/media/awards-hero-carousel-4.mp4?v=20260720b',
  '/media/awards-hero-carousel-5.mp4?v=20260720b',
  '/media/awards-hero-carousel-6.mp4?v=20260720b',
  '/media/awards-hero-carousel-7.mp4?v=20260720b',
  '/media/awards-hero-carousel-8.mp4?v=20260720b',
];

export function PersistentHeroVideo() {
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroVideo((current) => (current + 1) % heroVideos.length);
    }, 9000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="persistent-hero-video-layer" aria-hidden="true">
      <video
        key={heroVideos[activeHeroVideo]}
        className={`persistent-hero-video persistent-hero-video-${activeHeroVideo + 1}`}
        src={heroVideos[activeHeroVideo]}
        autoPlay
        muted
        loop
        playsInline
        poster="/media/awards-stage.webp"
      />
    </div>
  );
}
