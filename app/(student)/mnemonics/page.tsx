'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';
import { effectiveTier } from '@/lib/planLimits';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/Spinner';

interface BreakdownItem {
  emoji: string;
  phrase: string;
  meaning: string;
}

interface PracticeQuestion { question: string; options: string[]; answer: string; explanation: string; }

interface Mnemonic {
  id: string;
  topic: string;
  category: string;
  specialty: string;
  phrases: string[];
  breakdown: BreakdownItem[];
  tags: string[];
  created_at: string;
  clinical_significance: string;
  causes: string[];
  exam_traps: string;
  memory_pearl: string;
  high_yield_tip: string;
  practice_question: PracticeQuestion | null;
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

// ── Archive section block ─────────────────────────────────────────────────────
function ArchiveSectionBlock({ icon, title, accent, soft, children }: {
  icon: string; title: string; accent: string; soft?: boolean; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: soft ? `${accent}12` : "rgba(255,255,255,0.6)",
      border: `1.5px solid ${soft ? `${accent}30` : "var(--color-border)"}`,
      borderLeft: `4px solid ${accent}`,
      borderRadius: 12, padding: "14px 16px", marginTop: 12,
    }}>
      <div className="font-heading font-extrabold" style={{
        fontSize: 10, color: accent, letterSpacing: "0.13em",
        textTransform: "uppercase", marginBottom: 7,
        display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ fontSize: 13 }}>{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}

// ── Archive practice question (stateful per-card) ─────────────────────────────
function ArchivePracticeQuestion({ pq, catColor }: {
  pq: { question: string; options: string[]; answer: string; explanation: string };
  catColor: string;
}) {
  const [revealed, setRevealed] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div style={{
      background: "rgba(255,255,255,0.6)", border: "1.5px solid var(--color-border)",
      borderLeft: `4px solid ${catColor}`, borderRadius: 12, padding: "14px 16px", marginTop: 12,
    }}>
      <div className="font-heading font-extrabold" style={{
        fontSize: 10, color: catColor, letterSpacing: "0.13em",
        textTransform: "uppercase", marginBottom: 10,
        display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ fontSize: 13 }}>❓</span> Practice Question
      </div>
      <p className="font-body" style={{ fontSize: 13.5, color: "var(--color-dark)", fontWeight: 600, lineHeight: 1.65, marginBottom: 12 }}>
        {pq.question}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 12 }}>
        {pq.options.map((opt, i) => {
          const letter = opt.charAt(0);
          const isCorrect = letter === pq.answer;
          const isSelected = selected === letter;
          let bg = "rgba(255,255,255,0.8)";
          let border = "var(--color-border)";
          let color = "var(--color-dark)";
          if (revealed) {
            if (isCorrect)       { bg = "rgba(26,158,117,0.10)"; border = "#1A9E75"; color = "#1A9E75"; }
            else if (isSelected) { bg = "rgba(232,69,69,0.08)";  border = "#E84545"; color = "#E84545"; }
          } else if (isSelected) { bg = "var(--color-primary-light)"; border = "var(--color-primary)"; color = "var(--color-primary)"; }
          return (
            <button key={i} onClick={() => { if (!revealed) setSelected(letter); }} style={{
              background: bg, border: `1.5px solid ${border}`, borderRadius: 9,
              padding: "10px 14px", textAlign: "left",
              cursor: revealed ? "default" : "pointer", transition: "all 0.15s ease",
            }}>
              <span className="font-body" style={{ fontSize: 13, color, lineHeight: 1.5 }}>{opt}</span>
            </button>
          );
        })}
      </div>
      {!revealed ? (
        <button onClick={() => { if (selected) setRevealed(true); }}
          className="font-heading font-extrabold"
          style={{
            background: selected ? `${catColor}` : "var(--color-primary-light)",
            border: "none", borderRadius: 9, padding: "9px 18px",
            fontSize: 11, color: selected ? "white" : "var(--color-neutral-mid)",
            cursor: selected ? "pointer" : "not-allowed",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
          {selected ? "Reveal Answer" : "Select an option"}
        </button>
      ) : (
        <div style={{
          background: "rgba(26,158,117,0.07)", border: "1.5px solid rgba(26,158,117,0.25)",
          borderRadius: 9, padding: "11px 14px",
        }}>
          <div className="font-heading font-extrabold"
               style={{ fontSize: 10, color: "#1A9E75", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>
            ✓ Correct Answer: {pq.answer}
          </div>
          <p className="font-body" style={{ fontSize: 12.5, color: "var(--color-neutral-mid)", lineHeight: 1.65, margin: 0 }}>
            {pq.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

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

      const tier = effectiveTier((profile as any)?.plan_tier, (profile as any)?.plan_expires_at);
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

      const mapped = ((data as any[]) || []).map(d => ({
        id:                    d.id,
        topic:                 d.title,
        category:              d.category || 'Pharmacology',
        specialty:             d.specialty || 'General',
        phrases:               d.phrases   || [],
        breakdown:             d.breakdown || [],
        tags:                  d.tags      || [],
        created_at:            d.created_at,
        clinical_significance: d.clinical_significance || '',
        causes:                d.causes    || [],
        exam_traps:            d.exam_traps || '',
        memory_pearl:          d.memory_pearl || '',
        high_yield_tip:        d.high_yield_tip || '',
        practice_question:     d.practice_question || null,
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
        <Spinner size="lg" />
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
    <div className="flex flex-col min-h-screen font-body" style={{ background:'var(--color-bg)' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

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
            <div className="font-heading font-extrabold" style={{ fontSize: 19, color: "white" }}>
              <span className="logo-nurse-dark" style={{ fontWeight: 400 }}>Nurse</span>
              <span className="logo-fiti-dark">Fiti</span>
              <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400, margin: "0 6px" }}>·</span>
              <span>Archive</span>
            </div>
            <div className="font-body" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>
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
            className="font-body"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 13, padding: "11px 13px 11px 38px",
              color: "white", fontSize: 13, outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
          {FILTERS.map(f => {
            const active = filter === f;
            const c = CAT[f];
            return (
              <button key={f} onClick={() => setFilter(f)}
                className="font-heading font-bold"
                style={{
                  flexShrink: 0,
                  background: active ? (c?.bg || AMBER) : "rgba(255,255,255,0.09)",
                  border: `1px solid ${active ? (c?.bg || AMBER) : "rgba(255,255,255,0.18)"}`,
                  borderRadius: 20, padding: "6px 15px",
                  fontSize: 11,
                  color: active ? (c?.text || "#060F0F") : "rgba(255,255,255,0.62)",
                  cursor: "pointer", transition: "all 0.2s ease",
                  letterSpacing: "0.04em",
                }}>{f}</button>
            );
          })}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, flex: 1, maxWidth: "850px", margin: "0 auto", width: "100%" }}>
        
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
              <div className="font-heading font-extrabold"
                   style={{ fontSize: 18, color: AMBER, lineHeight: 1 }}>{s.n}</div>
              <div className="font-body font-semibold"
                   style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Download notice — screenshot style button */}
        <div style={{
          background: "var(--color-accent-light)",
          border: "1px solid rgba(245,166,35,0.30)",
          borderRadius: 18, padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>⬇</span>
          <div style={{ flex: 1 }}>
            <div className="font-heading font-bold"
                 style={{ fontSize: 13, color: "var(--color-accent-dark)" }}>
              Download access by plan
            </div>
            <div className="font-body"
                 style={{ fontSize: 11.5, color: "rgba(122,82,0,0.70)", marginTop: 2 }}>
              Weekly: last 7 · Monthly &amp; 90-Day: all mnemonics
            </div>
          </div>
          <button onClick={handleDownload}
            style={{
              background: "linear-gradient(135deg,var(--color-accent) 0%,var(--color-accent-dark) 100%)",
              border: "none", borderRadius: 14,
              padding: "11px 16px",
              boxShadow: "var(--shadow-glow-amber)",
              display: "flex", alignItems: "center", gap: 8,
              cursor: "pointer", flexShrink: 0,
            }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>⬇</span>
            <div style={{ textAlign: "left" }}>
              <div className="font-heading font-extrabold"
                   style={{ fontSize: 12, color: "var(--color-dark)", lineHeight: 1.2 }}>
                Download All
              </div>
              <div className="font-body"
                   style={{ fontSize: 10, color: "rgba(15,28,28,0.50)", marginTop: 1 }}>
                Save as HTML file
              </div>
            </div>
            <span style={{ color: "rgba(15,28,28,0.40)", fontSize: 14 }}>›</span>
          </button>
        </div>

        {/* Mnemonic cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(8,81,79,0.4)" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div className="font-heading font-bold">No mnemonics found</div>
            <div className="font-body" style={{ fontSize: 12, marginTop: 6 }}>Try a different search or category</div>
          </div>
        ) : filtered.map((m, i) => {
          const cat = CAT[m.category] || CAT.Pharmacology;
          const isOpen = expanded === m.id;
          
          return (
            <div key={m.id} style={{
              background: "var(--color-card)",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              borderTop: `4px solid ${cat.bg}`,
              animation: `cardIn 0.4s ease ${i * 0.055}s both`,
            }}>
              <div style={{ padding: "24px 24px 0" }}>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ flex: 1, paddingRight: 16 }}>
                    <div style={{
                      display: "inline-block",
                      background: cat.soft, border: `1px solid ${cat.border}`,
                      borderRadius: 8, padding: "4px 12px", marginBottom: 10,
                    }}>
                      <span className="font-heading font-extrabold"
                            style={{ fontSize: 11, color: cat.bg, letterSpacing: 1, textTransform: "uppercase" }}>
                        {m.category}
                      </span>
                    </div>
                    <div className="font-heading font-extrabold"
                         style={{ fontSize: 22, color: "var(--color-dark)", lineHeight: 1.2 }}>
                      {m.topic}
                    </div>
                  </div>

                  <button onClick={() => setExpanded(isOpen ? null : m.id)} style={{
                    background: isOpen ? cat.soft : "rgba(8,81,79,0.05)",
                    border: `1.5px solid ${isOpen ? cat.border : "var(--color-border)"}`,
                    borderRadius: 12, width: 44, height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0, transition: "all 0.22s ease",
                    color: cat.bg, fontSize: 20,
                  }}>
                    <span style={{
                      display: "block", lineHeight: 1,
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.25s ease",
                    }}>∨</span>
                  </button>
                </div>

                {/* Phrases block */}
                <div style={{
                  background: cat.soft,
                  border: `1px solid ${cat.border}`,
                  borderLeft: `4px solid ${cat.bg}`,
                  borderRadius: 14, padding: "16px 20px",
                  marginBottom: isOpen ? 20 : 0,
                }}>
                  <span className="font-heading font-semibold"
                        style={{ fontSize: 15, color: "var(--color-primary)", lineHeight: 1.65, display: "block" }}>
                    {m.phrases.join(", ")}.
                  </span>
                </div>

                {/* Breakdown + rich sections (expanded) */}
                {isOpen && (
                  <div style={{ animation: "fadeUp 0.25s ease both" }}>
                    {/* Breakdown */}
                    <div className="font-heading font-extrabold"
                         style={{ fontSize: 11, color: cat.bg, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
                      📖 Meaning
                    </div>
                    {m.breakdown.map((item, bi) => (
                      <div key={bi} style={{
                        display: "flex", gap: 14, padding: "12px 0",
                        borderBottom: bi < m.breakdown.length - 1 ? "1px solid var(--color-border)" : "none",
                        animation: `fadeUp 0.25s ease ${bi * 0.05}s both`,
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                          background: "var(--color-primary-light)", border: "1px solid var(--color-border)",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                        }}>{item.emoji}</div>
                        <div>
                          <div className="font-heading font-extrabold"
                               style={{ fontSize: 14, color: "var(--color-dark)", marginBottom: 3 }}>
                            {item.phrase}
                          </div>
                          <div className="font-body"
                               style={{ fontSize: 13, color: "var(--color-neutral-mid)", lineHeight: 1.6, fontWeight: 500 }}>
                            {item.meaning}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Clinical Significance */}
                    {m.clinical_significance && (
                      <ArchiveSectionBlock icon="🩺" title="Clinical Significance" accent="var(--color-primary)">
                        <p className="font-body" style={{ fontSize: 13.5, color: "var(--color-neutral-mid)", lineHeight: 1.7, margin: 0 }}>
                          {m.clinical_significance}
                        </p>
                      </ArchiveSectionBlock>
                    )}

                    {/* Causes */}
                    {m.causes.length > 0 && (
                      <ArchiveSectionBlock icon="💊" title="Common Causes" accent="var(--color-accent-dark)">
                        <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 3 }}>
                          {m.causes.map((c, ci) => (
                            <li key={ci} className="font-body"
                                style={{ fontSize: 13, color: "var(--color-neutral-mid)", lineHeight: 1.6 }}>{c}</li>
                          ))}
                        </ul>
                      </ArchiveSectionBlock>
                    )}

                    {/* Exam Traps */}
                    {m.exam_traps && (
                      <ArchiveSectionBlock icon="⚠️" title="Common NCK Exam Traps" accent="#EF4444">
                        <p className="font-body" style={{ fontSize: 13.5, color: "var(--color-neutral-mid)", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                          {m.exam_traps}
                        </p>
                      </ArchiveSectionBlock>
                    )}

                    {/* Memory Pearl */}
                    {m.memory_pearl && (
                      <ArchiveSectionBlock icon="💡" title="NurseFiti Memory Pearl" accent="#F5A623" soft>
                        <p className="font-heading font-bold"
                           style={{ fontSize: 14, color: "var(--color-accent-dark)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                          {m.memory_pearl}
                        </p>
                      </ArchiveSectionBlock>
                    )}

                    {/* High-Yield Tip */}
                    {m.high_yield_tip && (
                      <ArchiveSectionBlock icon="🎯" title="NCK High-Yield Tip" accent="var(--color-primary)" soft>
                        <p className="font-body" style={{ fontSize: 13.5, color: "var(--color-primary)", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                          {m.high_yield_tip}
                        </p>
                      </ArchiveSectionBlock>
                    )}

                    {/* Practice Question */}
                    {m.practice_question && (
                      <ArchivePracticeQuestion pq={m.practice_question} catColor={cat.bg} />
                    )}
                  </div>
                )}
              </div>

              {/* Card footer — tags + download button in screenshot style */}
              <div style={{
                padding: "16px 24px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderTop: isOpen ? "1px solid var(--color-border)" : "none",
                marginTop: isOpen ? 14 : 0, gap: 12,
              }}>
                {/* Tags */}
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", flex: 1 }}>
                  {m.tags.map((tag, ti) => (
                    <span key={ti} className="font-body font-bold"
                          style={{
                            background: "var(--color-primary-light)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 999, padding: "4px 12px",
                            fontSize: 11, color: "var(--color-primary)",
                          }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Download button — screenshot style: icon + bold title + subtitle + chevron */}
                <button
                  onClick={handleDownload}
                  style={{
                    background: "linear-gradient(135deg,var(--color-accent) 0%,var(--color-accent-dark) 100%)",
                    border: "none", borderRadius: 14,
                    padding: "12px 18px",
                    boxShadow: "var(--shadow-glow-amber)",
                    display: "flex", alignItems: "center", gap: 10,
                    cursor: "pointer", flexShrink: 0,
                    minWidth: 160,
                  }}
                >
                  <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>⬇</span>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div className="font-heading font-extrabold"
                         style={{ fontSize: 13, color: "var(--color-dark)", lineHeight: 1.2 }}>
                      Download PDF
                    </div>
                    <div className="font-body"
                         style={{ fontSize: 10, color: "rgba(15,28,28,0.55)", marginTop: 2 }}>
                      Save to device
                    </div>
                  </div>
                  <span style={{ color: "rgba(15,28,28,0.45)", fontSize: 15 }}>›</span>
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
