import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0070f3',
          borderRadius: '36px',
          color: '#ffffff',
          fontSize: 88,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.04em',
        }}
      >
        ai
      </div>
    ),
    { ...size },
  );
}
