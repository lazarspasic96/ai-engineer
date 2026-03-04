import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? 'ai-engineer.sh';
  const section = searchParams.get('section') ?? '';
  const description =
    searchParams.get('description') ?? 'Learn AI engineering from the ground up';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {section && (
            <div
              style={{
                fontSize: 20,
                color: '#0070f3',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              {section}
            </div>
          )}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#a1a1a1',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: 20,
            color: '#666666',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              background: '#0070f3',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            ai
          </div>
          <span>ai-engineer.sh</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
