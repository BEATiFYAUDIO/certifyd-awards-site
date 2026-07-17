export function TitleVideoLayer() {
  return (
    <>
      <video
        className="title-hero-video"
        src="/media/awards-hero-local-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/media/awards-stage.webp"
        aria-hidden="true"
      />
      <div className="title-hero-shade" aria-hidden="true" />
    </>
  );
}
