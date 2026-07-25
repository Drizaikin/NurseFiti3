import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NurseFiti - focused NCK exam preparation for Kenyan nursing candidates';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#071a18',
          color: '#fffdf8',
          fontFamily: 'Arial, sans-serif',
          padding: '72px 82px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 460,
            height: 460,
            borderRadius: 999,
            right: -110,
            top: -160,
            background: 'rgba(245, 166, 35, 0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: 999,
            left: -240,
            bottom: -320,
            background: 'rgba(10, 104, 101, 0.32)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 18,
                background: '#08514f',
                border: '2px solid rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f5a623',
                fontSize: 38,
                fontWeight: 800,
              }}
            >
              NF
            </div>
            <div style={{ display: 'flex', fontSize: 42, letterSpacing: -1 }}>
              <span style={{ color: '#b9e5e2', fontWeight: 400 }}>Nurse</span>
              <span style={{ color: '#f5a623', fontWeight: 800 }}>Fiti</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930 }}>
            <div style={{ color: '#f5a623', fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
              NCK exam preparation
            </div>
            <div style={{ marginTop: 22, fontSize: 68, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2 }}>
              Focused revision tools for Kenyan nursing candidates
            </div>
            <div style={{ marginTop: 28, fontSize: 27, lineHeight: 1.4, color: '#b9d0cf' }}>
              Practice questions, timed mock exams, flashcards, revision plans, and tutoring support.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 21, color: '#d8e8e7' }}>
            <span>KRCHN</span><span style={{ color: '#f5a623' }}>•</span><span>BScN</span><span style={{ color: '#f5a623' }}>•</span><span>Higher Diploma</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
