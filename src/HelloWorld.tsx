import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 1. Background Logic: Very slow zoom
  const bgScale = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  // 2. Subject Logic: Faster zoom + slight slide (The Parallax)
  const fgScale = interpolate(frame, [0, durationInFrames], [1, 1.25]);
  const fgMove = interpolate(frame, [0, durationInFrames], [0, -40]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Background Layer */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})` }}>
        <Img src={staticFile("background.jpg")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>

      {/* Subject Layer (The one you masked with AI) */}
      <AbsoluteFill style={{ transform: `scale(${fgScale}) translateY(${fgMove}px)` }}>
        <Img src={staticFile("subject.png")} style={{ height: '100%', objectFit: 'contain' }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};