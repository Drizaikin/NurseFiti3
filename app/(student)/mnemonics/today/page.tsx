'use client';

import { useEffect, useState } from 'react';
import type React from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { effectiveTier } from '@/lib/planLimits';
import { useRouter } from 'next/navigation';

interface BreakdownItem { emoji: string; phrase: string; meaning: string; }
interface PracticeQuestion { question: string; options: string[]; answer: string; explanation: string; }
interface Mnemonic {
  id: string;
  topic: string;
  category: string;
  specialty: string;
  phrases: string[];
  breakdown: BreakdownItem[];
  tags: string[];
  // Rich 7-section spec fields
  clinical_significance: string;
  causes: string[];
  exam_traps: string;
  memory_pearl: string;
  high_yield_tip: string;
  practice_question: PracticeQuestion | null;
}

// Per-category accent — these are intentional content variety colours,
// distinct from the brand primary/accent but harmonious with it.
const CAT: Record<string, { bg: string; text: string; soft: string; border: string }> = {
  Pharmacology:   { bg:'#F5A623', text:'#0F1C1C', soft:'rgba(245,166,35,0.12)',  border:'rgba(245,166,35,0.30)'  },
  Anatomy:        { bg:'#F97316', text:'#0F1C1C', soft:'rgba(249,115,22,0.12)',  border:'rgba(249,115,22,0.30)'  },
  Obstetrics:     { bg:'#EC4899', text:'#fff',    soft:'rgba(236,72,153,0.12)',  border:'rgba(236,72,153,0.28)'  },
  Neurology:      { bg:'#7C3AED', text:'#fff',    soft:'rgba(124,58,237,0.12)',  border:'rgba(124,58,237,0.28)'  },
  'Med-Surgical': { bg:'#08514F', text:'#E8F5F4', soft:'rgba(8,81,79,0.10)',    border:'rgba(8,81,79,0.28)'     },
  Emergency:      { bg:'#EF4444', text:'#fff',    soft:'rgba(239,68,68,0.12)',   border:'rgba(239,68,68,0.28)'   },
  Community:      { bg:'#10B981', text:'#0F1C1C', soft:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.28)'  },
  Pediatrics:     { bg:'#3B82F6', text:'#fff',    soft:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.28)'  },
};
const FallbackCat = CAT.Pharmacology;

// ── Section block component ───────────────────────────────────────────────────
function SectionBlock({ icon, title, accent, soft, children }: {
  icon: string; title: string; accent: string; soft?: boolean; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: soft ? `${accent}14` : 'rgba(255,255,255,0.7)',
      border: `1.5px solid ${soft ? `${accent}35` : 'var(--color-border)'}`,
      borderLeft: `4px solid ${accent}`,
      borderRadius: 14, padding: '16px 18px', marginBottom: 12,
    }}>
      <div className="font-heading font-extrabold" style={{
        fontSize: 11, color: accent,
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 14 }}>{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}

// ── Practice question component ───────────────────────────────────────────────
function PracticeQuestionBlock({ pq, catColor }: { pq: { question: string; options: string[]; answer: string; explanation: string }; catColor: string }) {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.7)',
      border: '1.5px solid var(--color-border)',
      borderLeft: `4px solid ${catColor}`,
      borderRadius: 14, padding: '18px 18px', marginBottom: 12,
    }}>
      <div className="font-heading font-extrabold" style={{
        fontSize: 11, color: catColor,
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 14 }}>❓</span> Practice Question
      </div>
      <p className="font-body" style={{ fontSize: 14, color: 'var(--color-dark)', lineHeight: 1.65, marginBottom: 14, fontWeight: 600 }}>
        {pq.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {pq.options.map((opt, i) => {
          const letter = opt.charAt(0);
          const isCorrect = letter === pq.answer;
          const isSelected = selected === letter;
          let bg = 'rgba(255,255,255,0.85)';
          let border = 'var(--color-border)';
          let color = 'var(--color-dark)';
          if (revealed) {
            if (isCorrect) { bg = 'rgba(26,158,117,0.12)'; border = '#1A9E75'; color = '#1A9E75'; }
            else if (isSelected) { bg = 'rgba(232,69,69,0.10)'; border = '#E84545'; color = '#E84545'; }
          } else if (isSelected) { bg = 'var(--color-primary-light)'; border = 'var(--color-primary)'; color = 'var(--color-primary)'; }
          return (
            <button key={i} onClick={() => { if (!revealed) setSelected(letter); }}
              style={{
                background: bg, border: `1.5px solid ${border}`,
                borderRadius: 10, padding: '11px 16px',
                textAlign: 'left', cursor: revealed ? 'default' : 'pointer',
                transition: 'all 0.18s ease',
              }}>
              <span className="font-body" style={{ fontSize: 13.5, color, lineHeight: 1.5 }}>{opt}</span>
            </button>
          );
        })}
      </div>
      {!revealed ? (
        <button onClick={() => { if (selected) setRevealed(true); }}
          className="font-heading font-extrabold"
          style={{
            background: selected ? `linear-gradient(135deg,${catColor},${catColor}cc)` : 'var(--color-primary-light)',
            border: 'none', borderRadius: 10, padding: '11px 20px',
            fontSize: 12, color: selected ? 'white' : 'var(--color-neutral-mid)',
            cursor: selected ? 'pointer' : 'not-allowed',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
          {selected ? 'Reveal Answer' : 'Select an option first'}
        </button>
      ) : (
        <div style={{
          background: 'rgba(26,158,117,0.08)', border: '1.5px solid rgba(26,158,117,0.3)',
          borderRadius: 10, padding: '12px 16px',
        }}>
          <div className="font-heading font-extrabold" style={{ fontSize: 11, color: '#1A9E75', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            ✓ Correct Answer: {pq.answer}
          </div>
          <p className="font-body" style={{ fontSize: 13, color: 'var(--color-neutral-mid)', lineHeight: 1.65, margin: 0 }}>
            {pq.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default function MnemonicTodayPage() {
  const supabase  = createClient();
  const router    = useRouter();
  const [mnemonic, setMnemonic]         = useState<Mnemonic | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isLoading, setIsLoading]       = useState(true);
  const [planTier, setPlanTier]         = useState<string>('free');

  useEffect(() => {
    async function load() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: prof } = await supabase
            .from('student_profiles')
            .select('plan_tier,plan_expires_at')
            .eq('id', user.id).single();
          setPlanTier(effectiveTier((prof as any)?.plan_tier, (prof as any)?.plan_expires_at));
        }
        const { data, error } = await supabase
          .from('mnemonics').select('*').order('id', { ascending: true });
        if (!error && data?.length) {
          const day = Math.floor(
            (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
          );
          const d = (data as any[])[day % data.length];
          setMnemonic({
            id:                    d.id,
            topic:                 d.title,
            category:              d.category || 'Pharmacology',
            specialty:             d.specialty || 'General',
            phrases:               d.phrases   || [],
            breakdown:             d.breakdown || [],
            tags:                  d.tags      || [],
            clinical_significance: d.clinical_significance || '',
            causes:                d.causes    || [],
            exam_traps:            d.exam_traps || '',
            memory_pearl:          d.memory_pearl || '',
            high_yield_tip:        d.high_yield_tip || '',
            practice_question:     d.practice_question || null,
          });
        }
      } catch { /* silent */ }
      finally { setIsLoading(false); }
    }
    load();
  }, []);

  const handleDownload = () => {
    if (planTier === 'free') {
      toast.error('Downloading PDFs is a premium feature. Please upgrade your plan.');
      router.push('/settings'); return;
    }
    if (!mnemonic) return;
    const html = `<!DOCTYPE html><html><head><title>NurseFiti – ${mnemonic.topic}</title>
<style>body{font-family:Arial,sans-serif;background:#FFFDF8;color:#0F1C1C;padding:40px;max-width:780px;margin:0 auto}
h1{color:#08514F;font-size:30px;border-bottom:3px solid #F5A623;padding-bottom:10px;margin-top:0}
.cat{display:inline-block;background:#F5A623;color:#0F1C1C;padding:4px 14px;border-radius:999px;font-weight:700;font-size:11px;margin-bottom:18px;text-transform:uppercase;letter-spacing:.08em}
.phrases{margin:24px 0;border-left:4px solid #F5A623;padding-left:20px}
.phrase{font-size:17px;font-weight:700;color:#08514F;margin-bottom:8px}
.item{display:flex;gap:14px;padding:14px;background:#fff;border-radius:12px;margin-bottom:10px;box-shadow:0 2px 8px rgba(8,81,79,.07)}
.emoji{font-size:26px;flex-shrink:0}.ph{font-weight:700;font-size:15px;color:#F5A623;margin-bottom:3px}
.mn{color:#4A6565;line-height:1.6;font-size:13px}.foot{text-align:center;margin-top:50px;font-size:11px;color:#7A9E9E}</style>
</head><body>
<div class="cat">${mnemonic.category}</div>
<h1>${mnemonic.topic}</h1>
<div class="phrases">${mnemonic.phrases.map(p=>`<div class="phrase">${p}</div>`).join('')}</div>
${mnemonic.breakdown.map(b=>`<div class="item"><div class="emoji">${b.emoji}</div><div><div class="ph">${b.phrase}</div><div class="mn">${b.meaning}</div></div></div>`).join('')}
<div class="foot">Downloaded from NurseFiti.com · Keep Learning!</div>
</body></html>`;
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([html],{type:'text/html'})),
      download: `nursefiti-${mnemonic.topic.replace(/\s+/g,'-').toLowerCase()}.html`,
    });
    document.body.appendChild(a); a.click(); a.remove();
    toast.success('Download started. Open the file in any browser to view or print.');
  };

  /* ─── Loading ──────────────────────────────────────────────────── */
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center"
         style={{ background:'linear-gradient(135deg,#051F1E 0%,#08514F 60%,#0A6865 100%)' }}>
      <motion.div animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.6, repeat:Infinity }}
                  className="text-white/60 text-base font-medium tracking-wide font-body">
        Loading today&apos;s mnemonic…
      </motion.div>
    </div>
  );

  if (!mnemonic) return null;
  const cat = CAT[mnemonic.category] ?? FallbackCat;

  return (
    <>
      {/* ── Global keyframes ──────────────────────────────────────── */}
      <style>{`
        @keyframes blobDrift {
          0%,100%{ transform:translate(0,0) scale(1); }
          40%    { transform:translate(50px,-35px) scale(1.1); }
          70%    { transform:translate(-30px,25px) scale(0.93); }
        }
        @keyframes shimmer {
          0%  { background-position:-500px 0; }
          100%{ background-position: 500px 0; }
        }
        .ph-card { transition: transform .22s cubic-bezier(.34,1.56,.64,1),
                               box-shadow .22s ease; }
        .ph-card:hover { transform:translateY(-3px) scale(1.015);
                         box-shadow:0 12px 32px rgba(8,81,79,0.12); }
        .bk-row:hover { background:rgba(8,81,79,0.04); border-radius:14px; }
        .bk-row { transition:background .18s ease; }
      `}</style>

      {/* ── Page root — respects brand bg token ───────────────────── */}
      <div className="relative min-h-screen overflow-hidden"
           style={{ background:'var(--color-bg)' }}>

        {/* ── Ambient blobs ─────────────────────────────────────────
            Colours: brand primary teal + brand accent amber.
            These never override foreground, only add atmosphere.      */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex:0 }}>
          {/* Amber top-right */}
          <div style={{
            position:'absolute', top:'-12%', right:'-8%',
            width:560, height:560, borderRadius:'50%',
            background:'radial-gradient(circle,rgba(245,166,35,0.16) 0%,transparent 68%)',
            filter:'blur(72px)',
            animation:'blobDrift 20s ease-in-out infinite',
          }}/>
          {/* Primary teal bottom-left */}
          <div style={{
            position:'absolute', bottom:'-14%', left:'-10%',
            width:640, height:640, borderRadius:'50%',
            background:'radial-gradient(circle,rgba(8,81,79,0.14) 0%,transparent 68%)',
            filter:'blur(90px)',
            animation:'blobDrift 26s ease-in-out infinite reverse 2s',
          }}/>
          {/* Category accent mid-page — subtle */}
          <div style={{
            position:'absolute', top:'38%', left:'18%',
            width:380, height:380, borderRadius:'50%',
            background:`radial-gradient(circle,${cat.soft.replace('0.12','0.10')} 0%,transparent 70%)`,
            filter:'blur(80px)',
            animation:'blobDrift 16s ease-in-out infinite 5s',
          }}/>
        </div>

        {/* ── Content ───────────────────────────────────────────────── */}
        <div className="relative max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-16"
             style={{ zIndex:1 }}>
          <motion.div
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
          >

            {/* ── Eyebrow ─────────────────────────────────────────── */}
            <div className="flex items-center mb-6">
              <span className="font-heading text-[11px] font-bold tracking-[0.14em] uppercase"
                    style={{
                      background:'var(--color-primary-light)',
                      border:'1px solid var(--color-border)',
                      borderRadius:999, padding:'6px 20px',
                      display:'inline-flex', alignItems:'center', gap:0,
                    }}>
                {/* Logo wordmark colours matching the actual logo */}
                <span className="logo-nurse-theme" style={{ fontWeight:400, letterSpacing:'0.01em' }}>Nurse</span>
                <span className="logo-fiti-theme"  style={{ letterSpacing:'0.01em' }}>Fiti</span>
                <span style={{ color:'var(--color-neutral-light)', margin:'0 6px' }}>·</span>
                <span style={{ color:'var(--color-neutral-mid)', fontWeight:700 }}>Daily Mnemonic</span>
              </span>
            </div>

            {/* ── Category badge ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity:0, scale:0.88 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.1, type:'spring', stiffness:200 }}
              className="mb-3 inline-block"
            >
              <span className="font-heading text-[11px] font-extrabold tracking-[0.16em] uppercase"
                    style={{
                      background: cat.soft,
                      border:`1.5px solid ${cat.border}`,
                      borderRadius:999, padding:'5px 18px',
                      color: cat.bg,
                      boxShadow:`0 2px 14px ${cat.border}`,
                    }}>
                {mnemonic.category}
              </span>
            </motion.div>

            {/* ── Title ───────────────────────────────────────────── */}
            <motion.h1
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.14, duration:0.48 }}
              className="font-heading font-black tracking-tight leading-[1.08] mb-8"
              style={{
                fontSize:'clamp(1.9rem,5.5vw,2.75rem)',
                color:'var(--color-primary)',
              }}
            >
              {mnemonic.topic}
            </motion.h1>

            {/* ── Main glassmorphic card ───────────────────────────── */}
            <div style={{
              background:'rgba(255,255,255,0.64)',
              backdropFilter:'blur(28px)',
              WebkitBackdropFilter:'blur(28px)',
              borderRadius:28,
              border:'1.5px solid rgba(255,255,255,0.92)',
              boxShadow:'var(--shadow-premium), 0 1px 0 rgba(255,255,255,0.8) inset',
              overflow:'hidden',
            }}>
              {/* Category-coloured top stripe */}
              <div style={{
                height:4,
                background:`linear-gradient(90deg,${cat.bg} 0%,${cat.border} 60%,transparent 100%)`,
              }}/>

              <div style={{ padding:'28px 28px 0' }}>

                {/* ── Phrase timeline ─────────────────────────────── */}
                <div style={{ position:'relative', paddingLeft:26 }}>
                  {/* Glowing vertical rail — brand amber */}
                  <div style={{
                    position:'absolute', left:0, top:10, bottom:10,
                    width:4, borderRadius:4,
                    background:`linear-gradient(180deg,var(--color-accent) 0%,var(--color-accent-dark) 100%)`,
                    boxShadow:'var(--shadow-glow-amber)',
                  }}/>

                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    {mnemonic.phrases.map((phrase, i) => (
                      <motion.div key={i} className="ph-card"
                        initial={{ opacity:0, x:-16 }}
                        animate={{ opacity:1, x:0 }}
                        transition={{ delay:0.18 + i*0.09, type:'spring', stiffness:130, damping:16 }}
                        style={{ position:'relative' }}
                      >
                        {/* Dot */}
                        <div style={{
                          position:'absolute', left:-33, top:'50%',
                          transform:'translateY(-50%)',
                          width:14, height:14, borderRadius:'50%',
                          background:'white',
                          border:`3.5px solid var(--color-accent)`,
                          boxShadow:'var(--shadow-glow-amber)',
                          zIndex:2,
                        }}/>

                        <div style={{
                          background:'rgba(255,255,255,0.82)',
                          backdropFilter:'blur(10px)',
                          border:'1.5px solid rgba(255,255,255,0.95)',
                          borderRadius:16,
                          padding:'14px 20px',
                          boxShadow:'var(--shadow-card)',
                        }}>
                          <span className="font-heading font-semibold leading-relaxed"
                                style={{ fontSize:16, color:'var(--color-primary)' }}>
                            {phrase}{i < mnemonic.phrases.length - 1 ? ',' : '.'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ── Breakdown toggle ────────────────────────────── */}
                <div style={{ marginTop:22 }}>
                  <button
                    onClick={() => setShowBreakdown(v => !v)}
                    className="w-full text-left"
                    style={{
                      background: showBreakdown
                        ? 'var(--color-primary-light)' : 'var(--color-primary-xlight)',
                      border:`1.5px solid ${showBreakdown ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      borderRadius:16, padding:'17px 20px',
                      cursor:'pointer', transition:'all 0.22s ease',
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                    }}
                  >
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{
                        width:40, height:40, borderRadius:12, flexShrink:0,
                        background: showBreakdown ? 'var(--color-primary)' : 'rgba(8,81,79,0.08)',
                        border:`1px solid ${showBreakdown ? 'transparent' : 'var(--color-border)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        transition:'all 0.22s ease',
                      }}>
                        <motion.span
                          animate={{ rotate: showBreakdown ? 90 : 0 }}
                          transition={{ type:'spring', stiffness:250, damping:20 }}
                          style={{
                            fontSize:20, lineHeight:1,
                            color: showBreakdown ? 'white' : 'var(--color-primary)',
                          }}
                        >›</motion.span>
                      </div>
                      <span className="font-heading font-extrabold uppercase tracking-widest"
                            style={{ fontSize:14, color:'var(--color-primary)' }}>
                        What it means
                      </span>
                    </div>
                    <span className="font-body font-bold uppercase tracking-widest hidden sm:block"
                          style={{ fontSize:10, color:'var(--color-neutral-mid)' }}>
                      {showBreakdown ? 'Click to close' : 'Click to expand'}
                    </span>
                  </button>
                </div>

                {/* ── Breakdown panel ─────────────────────────────── */}
                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div
                      initial={{ opacity:0, height:0 }}
                      animate={{ opacity:1, height:'auto' }}
                      exit={{ opacity:0, height:0 }}
                      transition={{ duration:0.38, ease:[0.04,0.62,0.23,0.98] }}
                      style={{ overflow:'hidden', marginTop:10 }}
                    >
                      <div style={{
                        background:'rgba(255,255,255,0.55)',
                        backdropFilter:'blur(16px)',
                        border:'1.5px solid var(--color-border)',
                        borderRadius:20, padding:'16px 18px',
                        boxShadow:'var(--shadow-card)',
                      }}>
                        {mnemonic.breakdown.map((item, i) => (
                          <motion.div key={i} className="bk-row"
                            initial={{ opacity:0, y:8 }}
                            animate={{ opacity:1, y:0 }}
                            transition={{ delay:i*0.055 }}
                            style={{
                              display:'flex', gap:14,
                              padding:'13px 10px',
                              borderBottom: i < mnemonic.breakdown.length-1
                                ? '1px solid var(--color-border)' : 'none',
                            }}
                          >
                            <div style={{
                              width:44, height:44, flexShrink:0, borderRadius:12,
                              background:'var(--color-card)',
                              border:'1px solid var(--color-border)',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              fontSize:21, boxShadow:'var(--shadow-card)',
                            }}>
                              {item.emoji}
                            </div>
                            <div style={{ paddingTop:2 }}>
                              <div className="font-heading font-extrabold"
                                   style={{ fontSize:16, color:'var(--color-primary)', marginBottom:3 }}>
                                {item.phrase}
                              </div>
                              <div className="font-body"
                                   style={{ fontSize:14, color:'var(--color-neutral-mid)',
                                            lineHeight:1.65, fontWeight:500 }}>
                                {item.meaning}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Tags ─────────────────────────────────────────── */}
              {mnemonic.tags.length > 0 && (
                <div style={{ padding:'16px 28px 0', display:'flex', flexWrap:'wrap', gap:8 }}>
                  {mnemonic.tags.map((tag, i) => (
                    <span key={i} className="font-body font-bold"
                          style={{
                            background:'var(--color-primary-light)',
                            border:'1px solid var(--color-border)',
                            borderRadius:999, padding:'5px 14px',
                            fontSize:12, color:'var(--color-primary)',
                          }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ── Rich 7-section content ──────────────────────── */}
              <div style={{ padding:'20px 28px 0' }}>

                {/* Clinical Significance */}
                {mnemonic.clinical_significance && (
                  <SectionBlock icon="🩺" title="Clinical Significance" accent="var(--color-primary)">
                    <p className="font-body" style={{ fontSize:14, color:'var(--color-neutral-mid)', lineHeight:1.7, margin:0 }}>
                      {mnemonic.clinical_significance}
                    </p>
                  </SectionBlock>
                )}

                {/* Causes */}
                {mnemonic.causes.length > 0 && (
                  <SectionBlock icon="💊" title="Common Causes / Associated Conditions" accent="var(--color-accent-dark)">
                    <ul style={{ margin:0, paddingLeft:18, display:'flex', flexDirection:'column', gap:4 }}>
                      {mnemonic.causes.map((c, i) => (
                        <li key={i} className="font-body" style={{ fontSize:13.5, color:'var(--color-neutral-mid)', lineHeight:1.6 }}>{c}</li>
                      ))}
                    </ul>
                  </SectionBlock>
                )}

                {/* Exam Traps */}
                {mnemonic.exam_traps && (
                  <SectionBlock icon="⚠️" title="Common NCK Exam Traps" accent="#EF4444">
                    <p className="font-body" style={{ fontSize:14, color:'var(--color-neutral-mid)', lineHeight:1.7, margin:0, whiteSpace:'pre-line' }}>
                      {mnemonic.exam_traps}
                    </p>
                  </SectionBlock>
                )}

                {/* Memory Pearl */}
                {mnemonic.memory_pearl && (
                  <SectionBlock icon="💡" title="NurseFiti Memory Pearl" accent="#F5A623" soft>
                    <p className="font-heading font-bold" style={{ fontSize:15, color:'var(--color-accent-dark)', lineHeight:1.6, margin:0, fontStyle:'italic' }}>
                      {mnemonic.memory_pearl}
                    </p>
                  </SectionBlock>
                )}

                {/* High-Yield Tip */}
                {mnemonic.high_yield_tip && (
                  <SectionBlock icon="🎯" title="NCK High-Yield Tip" accent="var(--color-primary)" soft>
                    <p className="font-body" style={{ fontSize:14, color:'var(--color-primary)', lineHeight:1.7, margin:0, whiteSpace:'pre-line' }}>
                      {mnemonic.high_yield_tip}
                    </p>
                  </SectionBlock>
                )}

                {/* Practice Question */}
                {mnemonic.practice_question && (
                  <PracticeQuestionBlock pq={mnemonic.practice_question} catColor={cat.bg} />
                )}

              </div>

              {/* ── Actions — screenshot button style ────────────── */}
              <div style={{ padding:'20px 28px 28px', display:'flex', flexDirection:'column', gap:12 }}>

                {/* Download — teal filled, icon + bold title + subtitle + chevron */}
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale:1.015 }}
                  whileTap={{ scale:0.97 }}
                  className="w-full"
                  style={{
                    border:'none', cursor:'pointer', borderRadius:18,
                    padding:'18px 22px',
                    background:'linear-gradient(135deg,var(--color-primary) 0%,var(--color-primary-mid) 100%)',
                    boxShadow:'var(--shadow-glow-teal)',
                    display:'flex', alignItems:'center', gap:16,
                    textAlign:'left',
                    position:'relative', overflow:'hidden',
                  }}
                >
                  <span style={{ fontSize:26, flexShrink:0, lineHeight:1 }}>⬇</span>
                  <div style={{ flex:1 }}>
                    <div className="font-heading font-extrabold" style={{ fontSize:15, color:'white', lineHeight:1.2 }}>
                      Download PDF
                    </div>
                    <div className="font-body" style={{ fontSize:11.5, color:'rgba(255,255,255,0.60)', marginTop:3 }}>
                      Save this mnemonic to your device
                    </div>
                  </div>
                  <span style={{ color:'rgba(255,255,255,0.55)', fontSize:18 }}>›</span>
                </motion.button>

                {/* Archive — amber filled, icon + bold title + subtitle + chevron */}
                <Link href="/mnemonics" style={{ textDecoration:'none' }}>
                  <motion.div
                    whileHover={{ scale:1.015 }}
                    whileTap={{ scale:0.97 }}
                    className="w-full"
                    style={{
                      borderRadius:18, padding:'18px 22px',
                      background:'linear-gradient(135deg,var(--color-accent) 0%,var(--color-accent-dark) 100%)',
                      boxShadow:'var(--shadow-glow-amber)',
                      display:'flex', alignItems:'center', gap:16,
                      cursor:'pointer',
                    }}
                  >
                    <span style={{ fontSize:26, flexShrink:0, lineHeight:1 }}>📚</span>
                    <div style={{ flex:1 }}>
                      <div className="font-heading font-extrabold" style={{ fontSize:15, color:'var(--color-dark)', lineHeight:1.2 }}>
                        View Archive
                      </div>
                      <div className="font-body" style={{ fontSize:11.5, color:'rgba(15,28,28,0.55)', marginTop:3 }}>
                        Browse all past mnemonics
                      </div>
                    </div>
                    <span style={{ color:'rgba(15,28,28,0.45)', fontSize:18 }}>›</span>
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* ── Floating brain ──────────────────────────────────── */}
            <motion.div
              animate={{ y:[-8,8,-8], rotate:[-2,2,-2] }}
              transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
              style={{
                position:'absolute', top:-28, right:0,
                fontSize:70, pointerEvents:'none', zIndex:10,
                filter:'drop-shadow(0 16px 28px rgba(8,81,79,0.18))',
              }}
            >🧠</motion.div>

          </motion.div>
        </div>
      </div>
    </>
  );
}
