'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';
import { effectiveTier } from '@/lib/planLimits';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  created_at: string;
}

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

const FILTERS = ["All", "Pharmacology", "Anatomy", "Obstetrics", "Neurology", "Med-Surgical", "Emergency"];

export default function StudentMnemonicsPage() {
  const supabase = createClient();
  const [mnemonics, setMnemonics] = useState<Mnemonic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planTier, setPlanTier] = useState<string>('free');
  const router = useRouter();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('student_profiles')
        .select('plan_tier, plan_expires_at')
        .eq('id', user.id)
        .single();

      const tier = effectiveTier(profile?.plan_tier, profile?.plan_expires_at);
      setPlanTier(tier);

      if (tier === 'free') {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('mnemonics')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        toast.error('Failed to load mnemonics');
        setIsLoading(false);
        return;
      }

      // Map db fields
      const mapped = (data || []).map(d => ({
        id: d.id,
        topic: d.title,
        category: d.category || 'Pharmacology',
        phrases: d.phrases || [],
        breakdown: d.breakdown || [],
        tags: d.tags || [],
        created_at: d.created_at
      }));

      setMnemonics(mapped);
      setIsLoading(false);
    };

    init();
  }, [router, supabase]);

  const handleDownload = () => {
    if (planTier === 'free') return;
    
    let downloadable = mnemonics;
    if (planTier === 'weekly') {
      downloadable = mnemonics.slice(-7); 
      if (mnemonics.length > 7) {
        toast('Weekly plan limit: Downloading the 7 most recent mnemonics.', { icon: 'ℹ️' });
      }
    }

    if (downloadable.length === 0) {
      toast.error('No mnemonics available to download.');
      return;
    }

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>NurseFiti - Mnemonic Archive</title>
      <style>
        body { font-family: 'Syne', Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; background: #F2FAFA; }
        h1 { color: #08514F; text-align: center; border-bottom: 2px solid #D0E8E7; padding-bottom: 20px; font-weight: 800; }
        .mnemonic { margin-bottom: 30px; padding: 25px; background: white; border-radius: 16px; border-top: 4px solid #0A6B68; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .title { font-size: 22px; font-weight: 800; color: #0B2020; margin-bottom: 5px; }
        .category { display: inline-block; padding: 4px 10px; background: #E0F7F6; color: #0A6B68; font-size: 11px; border-radius: 8px; font-weight: 700; text-transform: uppercase; margin-bottom: 15px; }
        .phrases { font-family: 'Courier New', monospace; font-size: 14px; font-style: italic; color: #F5A623; margin-bottom: 20px; background: #fdfaf3; padding: 15px; border-radius: 12px; border-left: 3px solid #F5A623; }
        .breakdown { margin-top: 15px; }
        .breakdown-item { display: flex; align-items: flex-start; gap: 15px; padding: 10px 0; border-bottom: 1px solid #eee; }
        .emoji { font-size: 24px; min-width: 30px; }
        .phrase-title { font-weight: bold; color: #08514F; font-size: 14px; margin-bottom: 4px; }
        .meaning { font-size: 13px; color: #555; }
        .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <h1>NurseFiti Mnemonic Archive</h1>
      ${downloadable.map(m => `
        <div class="mnemonic">
          <div class="category">${m.category}</div>
          <div class="title">${m.topic}</div>
          <div class="phrases">${m.phrases.join(', ')}.</div>
          <div class="breakdown">
            ${m.breakdown.map(b => `
              <div class="breakdown-item">
                <div class="emoji">${b.emoji}</div>
                <div>
                  <div class="phrase-title">${b.phrase}</div>
                  <div class="meaning">${b.meaning}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
      <div class="footer">Downloaded from NurseFiti.com • Keep Learning!</div>
    </body>
    </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nursefiti-mnemonics-archive.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success('Download started. Open the file in any browser to view or print.');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (planTier === 'free') {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner border border-teal-200"
          >
            🔒
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Unlock Mnemonic Archive</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            The full Mnemonic Archive is exclusively available to premium students. Upgrade your plan to access and download hundreds of high-yield nursing mnemonics to boost your memory for the NCK exam.
          </p>
          <Link href="/settings">
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-95">
              Upgrade to Premium
            </button>
          </Link>
          <div className="mt-8">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const filtered = mnemonics.filter(m => {
    const okCat = filter === "All" || m.category === filter;
    const q = search.toLowerCase();
    const okSrch = !q || m.topic.toLowerCase().includes(q) || m.phrases.join(" ").toLowerCase().includes(q);
    return okCat && okSrch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F2FAFA", fontFamily: "'Nunito', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Nunito:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

      {/* STICKY HEADER */}
      <div style={{
        background: `linear-gradient(135deg, ${TEAL_D} 0%, ${TEAL} 100%)`,
        padding: "18px 16px 0",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Link href="/dashboard" style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 12, width: 38, height: 38,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "white", fontSize: 18, lineHeight: 1, textDecoration: "none"
          }}>←</Link>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 800, color: "white" }}>
              Mnemonic Archive
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>
              {filtered.length} mnemonics · Updated daily
            </div>
          </div>
          <div style={{
            background: "rgba(245,166,35,0.14)", border: "1px solid rgba(245,166,35,0.3)",
            borderRadius: 12, width: 38, height: 38,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, cursor: "pointer",
          }}>🔖</div>
        </div>

        <div style={{ position: "relative", marginBottom: 12 }}>
          <span style={{
            position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, opacity: 0.45,
          }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search topics or phrases..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 13, padding: "11px 13px 11px 38px",
              color: "white", fontSize: 13,
              fontFamily: "'Nunito',sans-serif", outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
          {FILTERS.map(f => {
            const active = filter === f;
            const c = CAT[f];
            return (
              <button key={f} onClick={() => setFilter(f)} style={{
                flexShrink: 0,
                background: active ? (c?.bg || AMBER) : "rgba(255,255,255,0.09)",
                border: `1px solid ${active ? (c?.bg || AMBER) : "rgba(255,255,255,0.18)"}`,
                borderRadius: 20, padding: "6px 15px",
                fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700,
                color: active ? (c?.text || "#060F0F") : "rgba(255,255,255,0.62)",
                cursor: "pointer", transition: "all 0.2s ease",
                letterSpacing: 0.3,
              }}>{f}</button>
            );
          })}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12, flex: 1, maxWidth: "600px", margin: "0 auto", width: "100%" }}>
        
        {/* Stats strip */}
        <div style={{
          background: `linear-gradient(135deg, ${TEAL}, #0A6B68)`,
          borderRadius: 16, padding: "16px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxShadow: "0 4px 20px rgba(8,81,79,0.2)",
        }}>
          {[
            { n: mnemonics.length.toString(), l: "Mnemonics" },
            { n: "8", l: "Categories" },
            { n: "47", l: "Days Running" },
            { n: "100%", l: "Free to Use" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: AMBER, lineHeight: 1,
              }}>{s.n}</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", fontWeight: 600, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Download notice */}
        <div style={{
          background: "rgba(245,166,35,0.08)",
          border: "1px solid rgba(245,166,35,0.22)",
          borderRadius: 12, padding: "11px 14px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 15 }}>⬇</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#7A5200", fontFamily: "'Syne',sans-serif" }}>
              Download access by plan
            </div>
            <div style={{ fontSize: 10.5, color: "rgba(122,82,0,0.75)", marginTop: 1 }}>
              Weekly: last 7 · Monthly & 90-Day: all mnemonics
            </div>
          </div>
          <button onClick={handleDownload} style={{
            background: AMBER, border: "none", borderRadius: 8, padding: "6px 12px",
            fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color: "#060F0F", cursor: "pointer",
          }}>
            Download PDF
          </button>
        </div>

        {/* Mnemonic cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(8,81,79,0.4)" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>No mnemonics found</div>
            <div style={{ fontSize: 12, marginTop: 6 }}>Try a different search or category</div>
          </div>
        ) : filtered.map((m, i) => {
          const cat = CAT[m.category] || CAT.Pharmacology;
          const isOpen = expanded === m.id;
          
          return (
            <div key={m.id} style={{
              background: "white",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 2px 16px rgba(8,81,79,0.08), 0 1px 4px rgba(0,0,0,0.05)",
              borderTop: `3.5px solid ${cat.bg}`,
              animation: `cardIn 0.4s ease ${i * 0.055}s both`,
            }}>
              <div style={{ padding: "16px 16px 0" }}>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
                  <div style={{ flex: 1, paddingRight: 10 }}>
                    <div style={{
                      display: "inline-block",
                      background: cat.soft, border: `1px solid ${cat.border}`,
                      borderRadius: 7, padding: "2px 9px", marginBottom: 7,
                    }}>
                      <span style={{
                        fontSize: 9.5, fontWeight: 700, fontFamily: "'Syne',sans-serif",
                        color: cat.bg, letterSpacing: 0.8, textTransform: "uppercase",
                      }}>{m.category}</span>
                    </div>
                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800,
                      color: "#0B2020", lineHeight: 1.2,
                    }}>{m.topic}</div>
                  </div>

                  <button onClick={() => setExpanded(isOpen ? null : m.id)} style={{
                    background: isOpen ? `${cat.soft}` : "rgba(0,0,0,0.04)",
                    border: `1.5px solid ${isOpen ? cat.border : "rgba(0,0,0,0.1)"}`,
                    borderRadius: 10, width: 34, height: 34,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0, transition: "all 0.22s ease",
                    color: cat.bg, fontSize: 16,
                  }}>
                    <span style={{
                      display: "block", lineHeight: 1,
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.25s ease",
                    }}>∨</span>
                  </button>
                </div>

                <div style={{
                  background: `linear-gradient(135deg, ${cat.soft}, rgba(245,166,35,0.03))`,
                  border: `1px solid ${cat.border}`,
                  borderLeft: `2.5px solid ${cat.bg}`,
                  borderRadius: 11, padding: "11px 13px",
                  marginBottom: isOpen ? 16 : 0,
                }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: 12.5, fontStyle: "italic",
                    color: cat.bg, lineHeight: 1.65,
                    display: "block",
                  }}>
                    {m.phrases.join(", ")}.
                  </span>
                </div>

                {isOpen && (
                  <div style={{ animation: "fadeUp 0.25s ease both" }}>
                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700,
                      color: cat.bg, letterSpacing: 1.5, textTransform: "uppercase",
                      marginBottom: 6,
                    }}>Breakdown</div>
                    {m.breakdown.map((item, bi) => (
                      <div key={bi} style={{
                        display: "flex", gap: 11,
                        padding: "9px 0",
                        borderBottom: bi < m.breakdown.length - 1 ? "1px solid rgba(8,81,79,0.07)" : "none",
                        animation: `fadeUp 0.25s ease ${bi * 0.05}s both`,
                      }}>
                        <span style={{ fontSize: 18, minWidth: 22, lineHeight: 1.45 }}>{item.emoji}</span>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: TEAL, marginBottom: 2 }}>{item.phrase}</div>
                          <div style={{ fontSize: 11.5, color: "#4A6868", lineHeight: 1.5 }}>{item.meaning}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                padding: "10px 16px 13px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderTop: isOpen ? "1px solid rgba(8,81,79,0.08)" : "none",
                marginTop: isOpen ? 10 : 0,
              }}>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {m.tags.map((tag, ti) => (
                    <span key={ti} style={{
                      background: "#F2FAFA", border: "1px solid #D0E8E7",
                      borderRadius: 20, padding: "2px 9px",
                      fontSize: 9.5, color: "#4A6868", fontWeight: 600,
                    }}>{tag}</span>
                  ))}
                </div>

                <button onClick={handleDownload} style={{
                  background: AMBER,
                  border: "none", borderRadius: 9,
                  padding: "7px 13px",
                  fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700,
                  color: "#060F0F", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                  borderBottom: `2px solid ${AMBER_D}`,
                }}>
                  ⬇ Save
                </button>
              </div>
            </div>
          );
        })}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
