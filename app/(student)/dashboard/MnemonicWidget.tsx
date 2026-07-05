'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BreakdownItem {
  emoji: string;
  phrase: string;
  meaning: string;
}

interface Mnemonic {
  id: string;
  topic: string;
  category: string;
  phrases: string[];
  breakdown: BreakdownItem[];
  tags: string[];
}

/* ═══════════════════════════════════════════════
   ANIMATIONS & FONTS
═══════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Nunito:wght@400;500;600;700;800&display=swap');

  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes float1 {
    0%,100% { transform: translate(0,0) scale(1); opacity: 0.55; }
    35%     { transform: translate(4px,-13px) scale(1.25); opacity: 1; }
    70%     { transform: translate(-3px,-7px) scale(0.8); opacity: 0.35; }
  }
  @keyframes float2 {
    0%,100% { transform: translate(0,0) rotate(0deg); opacity: 0.4; }
    50%     { transform: translate(-7px,-16px) rotate(180deg); opacity: 0.9; }
  }
  @keyframes float3 {
    0%,100% { transform: translate(0,0); opacity: 0.3; }
    45%     { transform: translate(9px,-10px); opacity: 0.7; }
    80%     { transform: translate(-5px,-14px); opacity: 0.45; }
  }
  @keyframes badgePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.55); }
    55%     { box-shadow: 0 0 0 7px rgba(245,166,35,0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dotBlink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.3; }
  }
`;

const TEAL = "#08514F";
const TEAL_D = "#051F1E";
const AMBER = "#F5A623";
const AMBER_D = "#C7841A";

const CAT: Record<string, any> = {
  Pharmacology: { bg: "#F5A623", text: "#3D2200", soft: "rgba(245,166,35,0.12)", border: "rgba(245,166,35,0.35)" },
  Anatomy: { bg: "#F97316", text: "#3D1500", soft: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.35)" },
  Obstetrics: { bg: "#EC4899", text: "#3D0020", soft: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.3)" },
  Neurology: { bg: "#7C3AED", text: "#1E0050", soft: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.3)" },
  "Med-Surgical": { bg: "#0A6B68", text: "#E0F7F6", soft: "rgba(10,107,104,0.14)", border: "rgba(10,107,104,0.4)" },
  Emergency: { bg: "#EF4444", text: "#3D0000", soft: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" },
  Community: { bg: "#10B981", text: "#003D26", soft: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  Pediatrics: { bg: "#3B82F6", text: "#001E5A", soft: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
};

const ShimmerCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    padding: 2,
    borderRadius: 24,
    background: `linear-gradient(90deg, ${AMBER}, #0A6B68, #08514F, ${AMBER})`,
    backgroundSize: "300% 100%",
    animation: "shimmerBorder 3.5s linear infinite",
    boxShadow: `0 8px 40px rgba(245,166,35,0.18), 0 2px 8px rgba(0,0,0,0.4)`,
  }}>
    <div style={{
      borderRadius: 22,
      background: `linear-gradient(145deg, #0C1E1E 0%, #071212 55%, #0E2828 100%)`,
      overflow: "hidden",
      position: "relative",
    }}>
      {children}
    </div>
  </div>
);

const Particles = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    {[
      { top: "10%", left: "80%", s: 3.5, d: 0, dur: 3.5, a: "float1" },
      { top: "70%", left: "8%", s: 2.5, d: 0.9, dur: 4.2, a: "float2" },
      { top: "32%", left: "90%", s: 4, d: 1.5, dur: 2.9, a: "float3" },
      { top: "60%", left: "94%", s: 2, d: 0.4, dur: 3.3, a: "float1" },
      { top: "86%", left: "75%", s: 3, d: 1.9, dur: 3.8, a: "float2" },
      { top: "4%", left: "48%", s: 1.8, d: 2.3, dur: 4.6, a: "float3" },
      { top: "50%", left: "3%", s: 2.2, d: 0.7, dur: 3.1, a: "float1" },
    ].map((p, i) => (
      <div key={i} style={{
        position: "absolute", top: p.top, left: p.left,
        width: p.s, height: p.s, borderRadius: "50%",
        background: AMBER,
        animation: `${p.a} ${p.dur}s ${p.d}s infinite ease-in-out`,
        boxShadow: `0 0 ${p.s * 2.5}px rgba(245,166,35,0.8)`,
      }} />
    ))}
    {[{ top: "18%", left: "88%", d: 0.6 }, { top: "65%", left: "4%", d: 1.9 }].map((s, i) => (
      <span key={i} style={{
        position: "absolute", top: s.top, left: s.left,
        fontSize: 11, color: AMBER, opacity: 0.55,
        animation: `float2 3.2s ${s.d}s infinite ease-in-out`,
      }}>✦</span>
    ))}
  </div>
);

const PhraseDisplay = ({ phrases }: { phrases: string[] }) => (
  <div style={{
    background: "rgba(0,0,0,0.38)",
    borderRadius: 14,
    padding: "16px 18px",
    borderLeft: `3px solid ${AMBER}`,
    boxShadow: `-6px 0 28px rgba(245,166,35,0.18), inset 0 0 24px rgba(245,166,35,0.03)`,
    margin: "16px 0",
  }}>
    {phrases.map((phrase, i) => (
      <div key={i} style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        padding: "6px 0",
        borderBottom: i < phrases.length - 1 ? "1px solid rgba(245,166,35,0.1)" : "none",
        animation: `fadeUp 0.45s ease ${0.08 + i * 0.09}s both`,
      }}>
        <div style={{
          minWidth: 6, height: 6, borderRadius: "50%",
          background: AMBER, marginTop: 6, flexShrink: 0,
          boxShadow: `0 0 9px rgba(245,166,35,0.9)`,
          animation: `dotBlink 2.5s ${i * 0.4}s ease-in-out infinite`,
        }} />
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 13.5, fontStyle: "italic",
          color: AMBER, lineHeight: 1.55, opacity: 0.95,
        }}>
          {phrase}{i < phrases.length - 1 ? "," : "."}
        </span>
      </div>
    ))}
  </div>
);

const BreakdownRow = ({ item, index, dark }: { item: BreakdownItem; index: number; dark: boolean }) => (
  <div style={{
    display: "flex", gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    animation: `fadeUp 0.3s ease ${index * 0.07}s both`,
  }}>
    <span style={{ fontSize: 19, minWidth: 24, lineHeight: 1.4 }}>{item.emoji}</span>
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: dark ? AMBER : TEAL, marginBottom: 2.5, letterSpacing: 0.3 }}>
        {item.phrase}
      </div>
      <div style={{ fontSize: 12.5, color: dark ? "rgba(255,255,255,0.64)" : "#4A6868", lineHeight: 1.5 }}>
        {item.meaning}
      </div>
    </div>
  </div>
);

export function MnemonicWidget() {
  const supabase = createClient();
  const [mnemonic, setMnemonic] = useState<Mnemonic | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDailyMnemonic() {
      try {
        const { data, error } = await supabase
          .from('mnemonics')
          .select('*')
          .order('id', { ascending: true }); // Mocking cycle
        
        if (!error && data && data.length > 0) {
          // simple day based rotation
          const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
          const index = dayOfYear % data.length;
          
          setMnemonic({
            id: data[index].id,
            topic: data[index].title,
            category: data[index].category || 'Pharmacology',
            phrases: data[index].phrases || [],
            breakdown: data[index].breakdown || [],
            tags: data[index].tags || [],
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDailyMnemonic();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white/10 animate-pulse h-64 rounded-xl border border-white/20"></div>
    );
  }

  if (!mnemonic) {
    return null;
  }

  const cat = CAT[mnemonic.category] || CAT.Pharmacology;

  return (
    <div style={{
      background: `linear-gradient(160deg, ${TEAL_D} 0%, #0B2020 60%, ${TEAL_D} 100%)`,
      padding: "22px 16px 28px",
      display: "flex", flexDirection: "column", gap: 0,
      borderRadius: "24px",
      overflow: "hidden",
      position: "relative"
    }}>
      <style>{STYLES}</style>
      
      {/* Top ambient glow */}
      <div style={{
        position: "absolute", top: -60, right: -40,
        width: 280, height: 280,
        background: "radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: -40,
        width: 240, height: 240,
        background: \`radial-gradient(circle, rgba(8,81,79,0.25) 0%, transparent 65%)\`,
        pointerEvents: "none",
      }} />

      {/* Highly visible Brain Animation */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-20, 20, -20], rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -right-6 -top-10 text-[100px] z-50 drop-shadow-[0_0_35px_rgba(245,166,35,1)] pointer-events-none"
      >
        🧠
      </motion.div>

      {/* Issue / date strip */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 16, position: "relative",
      }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 1.5, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
          NURSEFITI · DAILY MNEMONIC
        </div>
        <div style={{
          background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)",
          borderRadius: 6, padding: "3px 9px",
          fontSize: 9.5, color: AMBER, fontWeight: 700,
          fontFamily: "'Syne',sans-serif", letterSpacing: 1,
        }}>
          ISSUE #047
        </div>
      </div>

      <ShimmerCard>
        <div style={{ position: "relative", padding: "22px 20px 20px" }}>
          <Particles />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Badge + category row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(245,166,35,0.11)",
                border: "1px solid rgba(245,166,35,0.32)",
                borderRadius: 20, padding: "5px 13px",
                animation: "badgePulse 2.8s ease infinite",
              }}>
                <span style={{ fontSize: 11 }}>✨</span>
                <span style={{
                  fontFamily: "'Syne',sans-serif", fontSize: 9, fontWeight: 700,
                  letterSpacing: 1.8, textTransform: "uppercase", color: AMBER,
                }}>Mnemonic of the Day</span>
              </div>

              <div style={{
                background: cat.bg, borderRadius: 20, padding: "4px 11px",
              }}>
                <span style={{
                  fontFamily: "'Syne',sans-serif", fontSize: 9, fontWeight: 700,
                  color: cat.text, letterSpacing: 0.5,
                }}>{mnemonic.category}</span>
              </div>
            </div>

            {/* Topic title */}
            <div style={{
              fontFamily: "'Syne',sans-serif", fontSize: 25, fontWeight: 800,
              color: "white", lineHeight: 1.15, marginBottom: 20,
              animation: "fadeUp 0.5s ease 0.05s both",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}>
              {mnemonic.topic}
            </div>

            <PhraseDisplay phrases={mnemonic.phrases} />

            <button onClick={() => setShowBreakdown(!showBreakdown)} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 0 6px", width: "100%",
            }}>
              <span style={{
                fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700,
                color: "#4DB8B5", letterSpacing: 1.5, textTransform: "uppercase",
              }}>What it means</span>
              <span style={{
                fontSize: 15, color: "#4DB8B5", lineHeight: 1,
                transform: showBreakdown ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.28s ease", display: "block",
              }}>›</span>
              <div style={{ flex: 1, height: 1, background: "rgba(77,184,181,0.18)", marginLeft: 2 }} />
            </button>

            {showBreakdown && (
              <div style={{ animation: "fadeUp 0.3s ease both" }}>
                {mnemonic.breakdown.map((item, i) => (
                  <BreakdownRow key={i} item={item} index={i} dark={true} />
                ))}
                <div style={{ height: 8 }} />
              </div>
            )}

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "14px 0 18px" }}>
              {mnemonic.tags.map((tag, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20, padding: "3px 11px",
                  fontSize: 10, color: "rgba(255,255,255,0.52)",
                  fontFamily: "'Nunito',sans-serif", fontWeight: 600, letterSpacing: 0.4,
                }}>{tag}</div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button style={{
                flex: 1,
                background: \`linear-gradient(135deg, \${AMBER}, #E09415)\`,
                border: "none", borderRadius: 13, padding: "13px 0",
                fontFamily: "'Syne',sans-serif", fontSize: 12.5, fontWeight: 800,
                color: "#060F0F", cursor: "pointer",
                borderBottom: \`2.5px solid \${AMBER_D}\`,
                boxShadow: "0 4px 18px rgba(245,166,35,0.32)",
              }}>⬇ Download PDF</button>
              <Link href="/mnemonics" style={{
                flex: 1,
                display: "inline-block",
                textAlign: "center",
                background: "rgba(10,107,104,0.18)",
                border: "1px solid rgba(10,107,104,0.45)",
                borderRadius: 13, padding: "13px 0",
                fontFamily: "'Syne',sans-serif", fontSize: 12.5, fontWeight: 700,
                color: "#4DB8B5", cursor: "pointer",
                textDecoration: "none"
              }}>Archive →</Link>
            </div>
          </div>
        </div>
      </ShimmerCard>
    </div>
  );
}
