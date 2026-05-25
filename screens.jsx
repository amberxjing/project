// =====================================================
// MBTI 创作天赋人格 H5 — Screens (Bold pink edition)
// =====================================================

import React, { useState, useEffect, useRef } from 'react';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const MBTI_TYPES = [
  'intj', 'intp', 'entj', 'entp',
  'infj', 'infp', 'enfj', 'enfp',
  'istj', 'isfj', 'estj', 'esfj',
  'istp', 'isfp', 'estp', 'esfp',
];

const HOME_IMAGES = [
  'assets/首页ui素材/头部标题.webp',
  'assets/首页ui素材/头部ip.webp',
  'assets/首页ui素材/头部水晶球.webp',
  'assets/首页ui素材/中间图.webp',
  'assets/首页ui素材/入口1.webp',
  'assets/首页ui素材/入口2.webp',
  'assets/首页ui素材/最后图.webp',
  'assets/问题页ui素材/image 3418.webp',
  'assets/mascot.webp',
  ...MBTI_TYPES.map((type) => `assets/mbti-素材/${type}.webp`),
].map(assetPath);

function preloadImages(srcs) {
  return Promise.all(srcs.map((src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  })));
}

// =====================================================
// Decorative SVGs (4-point sparkle, star, heart, blob)
// =====================================================
function Sparkle({ size = 20, color = '#FFD93D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path d="M12 0 C12 8 16 12 24 12 C16 12 12 16 12 24 C12 16 8 12 0 12 C8 12 12 8 12 0Z" fill={color} />
    </svg>);

}
function FourStar({ size = 20, color = '#9B6FE8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path d="M12 1 L14 10 L23 12 L14 14 L12 23 L10 14 L1 12 L10 10 Z" fill={color} />
    </svg>);

}
function Heart({ size = 18, color = '#FF3D87', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path d="M12 21s-7-4.5-9-9.5C1.5 7 4.5 3 8 3c2 0 3.5 1 4 2.5C12.5 4 14 3 16 3c3.5 0 6.5 4 5 8.5-2 5-9 9.5-9 9.5z" fill={color} />
    </svg>);

}
function Squiggle({ color = '#9B6FE8', style = {} }) {
  return (
    <svg width="44" height="14" viewBox="0 0 44 14" style={style} fill="none">
      <path d="M2 7 Q 7 1, 12 7 T 22 7 T 32 7 T 42 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>);

}
function Dot({ size = 10, color = '#6FE0B5', style = {} }) {
  return <span style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', background: color, ...style }} />;
}

// =====================================================
// COMMON
// =====================================================
function AuroraBG() {
  return (
    <React.Fragment>
      <div className="aurora" />
      <div className="noise" />
    </React.Fragment>);

}

function StatusBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 26px 0', fontSize: 15, fontWeight: 600, color: 'var(--ink)',
      position: 'relative', zIndex: 5,
      background: 'transparent',
    }}>
      <span style={{ fontFamily: '-apple-system, SF Pro, system-ui' }}>10:08</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><g fill="#2A0A1F"><rect x="0" y="7" width="3" height="4" rx="0.5" /><rect x="4" y="5" width="3" height="6" rx="0.5" /><rect x="8" y="3" width="3" height="8" rx="0.5" /><rect x="12" y="0" width="3" height="11" rx="0.5" /></g></svg>
        <svg width="15" height="11" viewBox="0 0 17 12" fill="#2A0A1F"><path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" /><path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" /><circle cx="8.5" cy="10.5" r="1.5" /></svg>
        <svg width="24" height="11" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#2A0A1F" strokeOpacity="0.55" fill="none" /><rect x="2" y="2" width="20" height="9" rx="2" fill="#2A0A1F" /><path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill="#2A0A1F" fillOpacity="0.55" /></svg>
      </span>
    </div>);

}

function TopNav({ onBack, title, right, dark = false }) {
  const btnBg = dark ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.88)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px 8px', position: 'sticky', top: 0, zIndex: 5
    }}>
      <button onClick={onBack} className="press" style={{
        width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.70)',
        background: btnBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 8px rgba(26,21,48,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="#2A0A1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--ink)' }}>{title}</div>
      <div style={{ minWidth: 36, display: 'flex', justifyContent: 'flex-end' }}>
        {right || <div style={{ width: 36, height: 36 }} />}
      </div>
    </div>);

}

function ProgressChip({ now, total }) {
  return (
    <div style={{
      padding: '5px 14px', borderRadius: 999,
      background: 'linear-gradient(135deg, #8B6FF0 0%, #6040D8 100%)', color: '#fff',
      fontWeight: 800, fontSize: 12,
      letterSpacing: '0.04em',
      boxShadow: '0 2px 8px rgba(123,95,224,0.35), inset 0 1px 0 rgba(255,255,255,0.28)',
    }}>{now} / {total}</div>);

}

function QuizOptionIcon({ name, active }) {
  const fill = active ? '#fff' : 'var(--pink)';
  const icons = {
    journal: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="2" width="14" height="20" rx="2" stroke={fill} strokeWidth="1.8"/>
        <line x1="8" y1="7" x2="16" y2="7" stroke={fill} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="8" y1="11" x2="16" y2="11" stroke={fill} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="8" y1="15" x2="12" y2="15" stroke={fill} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    people: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="3" stroke={fill} strokeWidth="1.8"/>
        <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={fill} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="17" cy="7" r="2.5" stroke={fill} strokeWidth="1.6"/>
        <path d="M21 20c0-2.761-1.79-5-4-5" stroke={fill} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    camera: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke={fill} strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" stroke={fill} strokeWidth="1.8"/>
      </svg>
    ),
    vibe: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" stroke={fill} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    plan: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke={fill} strokeWidth="1.8"/>
        <line x1="3" y1="9" x2="21" y2="9" stroke={fill} strokeWidth="1.6"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke={fill} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke={fill} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="7" y1="14" x2="11" y2="14" stroke={fill} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="7" y1="18" x2="13" y2="18" stroke={fill} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    spark: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={fill} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    logic: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="3" stroke={fill} strokeWidth="1.8"/>
        <circle cx="18" cy="6" r="3" stroke={fill} strokeWidth="1.8"/>
        <circle cx="12" cy="18" r="3" stroke={fill} strokeWidth="1.8"/>
        <line x1="9" y1="6" x2="15" y2="6" stroke={fill} strokeWidth="1.6"/>
        <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" stroke={fill} strokeWidth="1.6"/>
        <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" stroke={fill} strokeWidth="1.6"/>
      </svg>
    ),
    heart: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={fill} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    xhs: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke={fill} strokeWidth="1.8"/>
        <path d="M8 12h8M12 8v8" stroke={fill} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    douyin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke={fill} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    wechat: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 14.5c0 2.485-2.239 4.5-5 4.5-.87 0-1.688-.225-2.4-.62L11 19l.62-2.1A4.28 4.28 0 0110 14.5c0-2.485 2.239-4.5 5-4.5s6 2.015 6 4.5z" stroke={fill} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M13.4 10.18A6.96 6.96 0 0012 10C8.134 10 5 12.686 5 16c0 1.02.29 1.98.8 2.82L5 22l3.6-1.1A7.28 7.28 0 0012 21c.49 0 .97-.04 1.43-.12" stroke={fill} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bilibili: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="3" stroke={fill} strokeWidth="1.8"/>
        <path d="M7 2l3 4M17 2l-3 4" stroke={fill} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="13" r="1.5" fill={fill}/>
        <circle cx="15" cy="13" r="1.5" fill={fill}/>
      </svg>
    ),
  };
  return icons[name] || icons.journal;
}

function Mascot({ size = 140, className = '', style = {}, mbti = '' }) {
  const src = mbti
    ? assetPath(`assets/mbti-素材/${mbti.toLowerCase()}.webp`)
    : assetPath('assets/mascot.webp');
  return (
    <img src={src} alt={mbti || 'mascot'}
    className={className}
    style={{
      width: size, height: 'auto', objectFit: 'contain',
      filter: 'drop-shadow(0 14px 18px rgba(199,31,102,0.22))',
      ...style
    }} />);
}

// =====================================================
// HOME — Magazine layout (参考图还原)
// =====================================================
function Home({ onPath, onSample }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    preloadImages(HOME_IMAGES).then(() => {
      if (alive) setReady(true);
    });
    return () => { alive = false; };
  }, []);

  if (!ready) {
    return (
      <div className="home-loader" style={{ position: 'relative', zIndex: 2 }}>
        <StatusBar />
        <div className="home-loader-inner">
          <div className="home-loader-orbit">
            <Sparkle size={22} color="var(--yellow)" />
          </div>
          <div className="home-loader-title">MBTI</div>
          <div className="home-loader-bar">
            <span />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#ffffff' }}>
      <StatusBar />

      {/* ── 白色 HERO 区域 ── */}
      <div style={{ background: '#ffffff' }}>
        {/* 标题左 + IP右：顶部留白，天使圈与30s对齐 */}
        <div className="hero" style={{ paddingLeft: 22, paddingTop: 62, paddingBottom: 60 }}>
          <img
            src={assetPath('assets/首页ui素材/头部标题.webp')}
            alt=""
            style={{ width: '52%', display: 'block', position: 'relative', zIndex: 2 }}
          />
          <div className="hero-ip-wrap">
            <div className="hero-ip-inner">
              <img
                className="hero-ip-img hero-float hero-float-ip"
                src={assetPath('assets/首页ui素材/头部ip.webp')}
                alt=""
              />
              <img
                className="hero-ball-img hero-float hero-float-ball"
                src={assetPath('assets/首页ui素材/头部水晶球.webp')}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* CTA 按钮 */}
        <div style={{ padding: '0 22px 32px' }}>
          <button
            className="cta-premium"
            onClick={() => onPath('known')}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              立即测试
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          <div
            onClick={() => onPath('quiz')}
            style={{
              textAlign: 'center', marginTop: 14,
              fontSize: 13, color: '#6B52DC',
              fontWeight: 600, cursor: 'pointer',
            }}
          >
            没有 MBTI？测一测生成报告 &gt;
          </div>
        </div>
      </div>

      {/* ── 淡紫色 MBTI 卡片区域：白→紫→白渐变 ── */}
      <div style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EAE4FF 18%, #E4DCFF 50%, #EAE4FF 82%, #FFFFFF 100%)',
        paddingTop: 32,
      }}>
        <img
          src={assetPath('assets/首页ui素材/中间图.webp')}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* ── 白色底部：入口 + 海报 ── */}
      <div style={{ background: '#FFFFFF', paddingBottom: 32 }}>
        <div style={{ padding: '28px 16px 0' }}>
          <div style={{
            fontSize: 19, fontWeight: 900, color: 'var(--ink)',
            marginBottom: 14, letterSpacing: '-0.02em',
          }}>
            两种方式，开启探索
          </div>

          <div
            className="press"
            onClick={() => onPath('quiz')}
            style={{
              cursor: 'pointer', borderRadius: 18, overflow: 'hidden',
              marginBottom: 12,
              boxShadow: '0 4px 16px rgba(107,82,220,0.10)',
            }}
          >
            <img
              src={assetPath('assets/首页ui素材/入口1.webp')}
              alt="5题快速测"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <div
            className="press"
            onClick={() => onPath('known')}
            style={{
              cursor: 'pointer', borderRadius: 18, overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(107,82,220,0.10)',
            }}
          >
            <img
              src={assetPath('assets/首页ui素材/入口2.webp')}
              alt="输入MBTI"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>

        <div style={{ padding: '28px 0 0' }}>
          <div
            className="press"
            onClick={onSample}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={assetPath('assets/首页ui素材/最后图.webp')}
              alt="生成专属海报"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

function Ticker({ items, idx }) {
  return (
    <div className="ticker-wrap" style={{ flex: 1, fontSize: 12.5, color: 'var(--ink)', fontWeight: 700 }}>
      {items.map((b, i) => {
        const delta = i - idx;
        const y = delta * 20;
        const op = i === idx ? 1 : 0;
        return (
          <div key={i} className="ticker-line" style={{ transform: `translateY(${y}px)`, opacity: op }}>
            <span>{b}</span>
          </div>);

      })}
    </div>);

}

function PathCard({ tag, tagColor, title, titleAccent, desc, tilt, onClick }) {
  return (
    <div className="press" onClick={onClick} style={{
      position: 'relative', borderRadius: 22, padding: '18px 18px',
      background: 'var(--white)',
      border: '2px solid var(--ink)',
      boxShadow: '4px 6px 0 var(--ink)',
      transform: `rotate(${tilt})`,
      cursor: 'pointer'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 14,
          background: tagColor, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 16, flex: '0 0 auto',
          fontFamily: '-apple-system, SF Pro Display, system-ui'
        }}>{tag}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
            {title}{' '}
            <span style={{ color: tagColor }}>{titleAccent}</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5, fontWeight: 600 }}>{desc}</div>
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', background: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>);

}

// =====================================================
// MBTI PICKER
// =====================================================
function MbtiPicker({ onBack, onNext }) {
  const DEFAULT = ['I', 'N', 'F', 'P'];
  const dims = window.MBTI_DIMENSIONS;
  const [letters, setLetters] = useState(DEFAULT);
  const [touched, setTouched] = useState([false, false, false, false]);
  const [active, setActive] = useState(null);

  const allTouched = touched.every(Boolean);

  const handleInteract = (dimIdx, direction) => {
    const pair = dims[dimIdx].pair;
    const cur = letters[dimIdx];
    const curIdx = pair.indexOf(cur);
    let nextIdx;
    if (!touched[dimIdx]) nextIdx = curIdx;else
    if (direction === 0) nextIdx = curIdx === 0 ? 1 : 0;else
    if (direction > 0) nextIdx = Math.min(pair.length - 1, curIdx + 1);else
    nextIdx = Math.max(0, curIdx - 1);
    const ls = [...letters];ls[dimIdx] = pair[nextIdx];setLetters(ls);
    const ts = [...touched];ts[dimIdx] = true;setTouched(ts);
    setActive(dimIdx);
  };

  const reset = () => {setLetters(DEFAULT);setTouched([false, false, false, false]);setActive(null);};

  const fb = active !== null ?
  dims[active].feedback[letters[active]] :
  '点击切换字母 · 4 项确认后即可继续';

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <AuroraBG />
      <StatusBar />
      <TopNav title="MBTI 创作天赋报告" onBack={onBack} />
      <div style={{ padding: '8px 22px 28px', position: 'relative' }}>
        <FourStar size={16} color="#FFD93D" style={{ position: 'absolute', top: 28, right: 28, transform: 'rotate(15deg)' }} />
        <Sparkle size={12} color="rgba(123,95,224,0.55)" style={{ position: 'absolute', top: 76, left: 16, transform: 'rotate(-10deg)' }} />
        <FourStar size={10} color="rgba(123,95,224,0.35)" style={{ position: 'absolute', top: 60, right: 58, transform: 'rotate(-8deg)' }} />

        <h1 className="fade-up" style={{ margin: '8px 0 4px', fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center' }}>
          选择你的 <span style={{
            background: 'linear-gradient(135deg, #7B52E0 0%, #4B68F5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800'
          }}>MBTI</span>
        </h1>
        <div style={{ textAlign: 'center' }}>
          <Squiggle color="rgba(123,95,224,0.35)" style={{ marginTop: 2, marginBottom: 6 }} />
        </div>
        <div className="fade-up-1" style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 18, fontWeight: 600, textAlign: 'center' }}>
          点击切换 · 上下滑动选择，4 项确认后继续
        </div>

        <div className="fade-up-2" style={{
          borderRadius: 24, padding: '20px 18px',
          background: 'rgba(255,255,255,0.88)',
          border: '1px solid rgba(255,255,255,0.75)',
          boxShadow: '0 8px 32px rgba(123,95,224,0.13), 0 2px 8px rgba(123,95,224,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--pink)', letterSpacing: '0.18em' }}>MBTI PREVIEW</div>
            <Sparkle size={10} color="var(--yellow)" />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 6,
            marginTop: 4,
            fontFamily: '-apple-system, SF Pro Display, system-ui',
            fontSize: 56, lineHeight: 1.05, fontWeight: 900, letterSpacing: '0.06em',
          }}>
            {letters.map((l, i) =>
            <span key={i} style={{
              color: touched[i] ? 'var(--ink)' : 'rgba(42,10,31,0.20)',
              transition: 'color 0.25s ease'
            }}>{l}</span>
            )}
          </div>

          <div style={{
              marginTop: 14, padding: '10px 14px',
              background: active !== null
                ? 'linear-gradient(135deg, rgba(123,95,224,0.10) 0%, rgba(75,104,245,0.07) 100%)'
                : 'rgba(26,21,48,0.03)',
              border: active !== null
                ? '1px solid rgba(123,95,224,0.22)'
                : '1px solid rgba(26,21,48,0.07)',
              borderRadius: 12, fontSize: 13,
              color: active !== null ? 'var(--pink-deep)' : 'var(--ink-3)',
              fontWeight: 600, lineHeight: 1.5, transition: 'all 0.25s ease',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: active !== null ? '0 0 14px rgba(123,95,224,0.10)' : 'none',
            }}>
            {active !== null && <span style={{ fontSize: 14, flexShrink: 0 }}>⚡</span>}
            {fb}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 18 }}>
            {dims.map((d, i) =>
            <Roller key={d.key} dim={d} letter={letters[i]} touched={touched[i]}
            onInteract={(dir) => handleInteract(i, dir)} />
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <button onClick={reset} className="btn-soft press" style={{ flex: '0 0 auto', padding: '13px 22px', fontSize: 14 }}>清空</button>
          <button onClick={() => onNext(letters.join(''))} disabled={!allTouched}
          className="cta-premium" style={{ flex: 1, padding: '13px 0', fontSize: 14 }}>
            下一步 →
          </button>
        </div>
      </div>
    </div>);

}

function Roller({ dim, letter, touched, onInteract }) {
  const pair = dim.pair;
  const itemH = 44;
  const sel = pair.indexOf(letter);
  const offset = itemH - sel * itemH;
  const ref = useRef(null);
  const touchY = useRef(null);
  const wheelLock = useRef(false);
  const ignoreClick = useRef(false);

  useEffect(() => {
    const el = ref.current;if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      setTimeout(() => {wheelLock.current = false;}, 220);
      onInteract(e.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  });

  const onTouchStart = (e) => {
    touchY.current = e.touches[0].clientY;
    ignoreClick.current = true;
  };
  const onTouchEnd = (e) => {
    if (touchY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dy) > 16) onInteract(dy < 0 ? 1 : -1);else
    onInteract(0);
    touchY.current = null;
  };
  const onClick = () => {
    if (ignoreClick.current) {
      ignoreClick.current = false;
      return;
    }
    onInteract(0);
  };

  return (
    <div>
      <div ref={ref} className="roller"
      data-touched={touched ? 'true' : 'false'}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>

        <div className="roller-highlight" />
        {touched && (
          <div style={{
            position: 'absolute', top: 36, right: 2, zIndex: 5,
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--pink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div className="roller-list" style={{ transform: `translateY(${offset}px)` }}>
          {pair.map((p, i) =>
          <div key={p} className={`roller-item ${i === sel ? 'is-selected' : ''}`}>{p}</div>
          )}
        </div>
      </div>
      <div className="roller-label">{dim.label}<br /><span className="roller-sub">({dim.sub})</span></div>
    </div>);

}

// =====================================================
// QUIZ
// =====================================================
function Quiz({ onBack, onDone }) {
  const qs = window.QUIZ_QUESTIONS;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [typed, setTyped] = useState('懂你一下 ✨');
  const typing = useRef(false);
  const typer = useRef(null);

  const q = qs[step];

  const typeOut = (text) => {
    if (typer.current) clearInterval(typer.current);
    setTyped('');typing.current = true;
    let i = 0;
    typer.current = setInterval(() => {
      i++;setTyped(text.slice(0, i));
      if (i >= text.length) {clearInterval(typer.current);typer.current = null;typing.current = false;}
    }, 36);
  };

  useEffect(() => () => typer.current && clearInterval(typer.current), []);

  const choose = (oi) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(oi);
    const opt = q.options[oi];
    typeOut(opt.feedback);
    const ans = { ...answers, [q.dim]: opt.value };
    setAnswers(ans);
    setTimeout(() => {
      if (step < qs.length - 1) {setStep(step + 1);setSelectedIdx(null);} else
      {
        const mbti = (ans.EI || 'I') + (ans.NS || 'N') + (ans.TF || 'F') + (ans.JP || 'P');
        onDone({ mbti, platform: ans.PLAT || '小红书' });
      }
    }, 1200);
  };

  return (
    <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
      <StatusBar />

      {/* ── 背景装饰 ── */}
      {/* 右上角大光斑 */}
      <div style={{
        position: 'absolute', top: -30, right: -55, width: 230, height: 230,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* 右上椭圆光环 */}
      <div style={{ position: 'absolute', top: 72, right: 22, zIndex: 0, pointerEvents: 'none' }}>
        <svg width="96" height="38" viewBox="0 0 96 38" fill="none">
          <ellipse cx="48" cy="19" rx="46" ry="17" stroke="rgba(167,139,250,0.22)" strokeWidth="1.5"/>
        </svg>
      </div>
      {/* 四角星 */}
      <FourStar size={13} color="rgba(155,111,232,0.55)"
        style={{ position: 'absolute', top: 118, right: 68, zIndex: 0, pointerEvents: 'none' }} />
      {/* 黄色小点 */}
      <Dot size={7} color="#FFD93D"
        style={{ position: 'absolute', top: 198, right: 38, pointerEvents: 'none', opacity: 0.75 }} />
      <Sparkle size={10} color="#FFD93D"
        style={{ position: 'absolute', top: 155, right: 30, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />

      {/* ── 顶部导航 ── */}
      <TopNav title="MBTI 创作天赋报告"
        onBack={() => step === 0 ? onBack() : (setStep(step - 1), setSelectedIdx(null))}
      />

      {/* ── 机器人 + 气泡 ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '10px 22px 10px',
        display: 'flex', alignItems: 'center', gap: 16, minHeight: 210,
      }}>
        {/* 机器人 IP - 放大，左侧主角 */}
        <div className="float" style={{ flex: '0 0 auto' }}>
          <img
            src={assetPath('assets/问题页ui素材/image 3418.webp')}
            alt="mascot"
            style={{
              width: 150, height: 'auto', objectFit: 'contain',
              filter: 'drop-shadow(0 16px 28px rgba(107,82,220,0.16))',
            }}
          />
        </div>

        {/* 对话气泡 - 白色，大圆角，轻投影，左三角尖角 */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* 气泡尖角 */}
          <div style={{
            position: 'absolute', left: -9, top: '50%', transform: 'translateY(-50%)',
            width: 0, height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '10px solid rgba(255,255,255,0.94)',
          }} />
          <div style={{
            padding: '14px 20px',
            borderRadius: 22,
            background: 'rgba(255,255,255,0.94)',
            boxShadow: '0 6px 24px rgba(107,82,220,0.10)',
            fontSize: 15.5, fontWeight: 600, color: '#3C3658',
            minHeight: 54,
            display: 'flex', alignItems: 'center', lineHeight: 1.5,
          }}>
            <span className={typing.current ? 'typewriter-cursor' : ''}>{typed}</span>
          </div>
        </div>
      </div>

      {/* ── 题目 + 选项 ── */}
      <div key={step} className="fade-up" style={{ padding: '4px 18px 44px', position: 'relative', zIndex: 1 }}>

        {/* Q 序号胶囊 */}
        <div style={{
          display: 'inline-block', padding: '5px 16px', borderRadius: 999,
          background: 'linear-gradient(135deg, #9B7FE8 0%, #6B52DC 100%)',
          color: '#fff', fontSize: 13, fontWeight: 800,
          marginBottom: 14,
          boxShadow: '0 3px 12px rgba(107,82,220,0.28)',
        }}>Q{step + 1}/{qs.length}</div>

        {/* 主标题 */}
        <h2 style={{
          margin: '0 0 10px',
          fontSize: 26, fontWeight: 900,
          color: '#1A1240',
          letterSpacing: '-0.3px', lineHeight: 1.3,
          fontFamily: 'inherit',
        }}>{q.title}</h2>

        {/* 副标题 */}
        <div style={{
          fontSize: 14, color: '#9088B0',
          fontWeight: 500, marginBottom: 28, lineHeight: 1.5,
        }}>{q.sub}</div>

        {/* 选项卡片 */}
        {q.dim === 'PLAT' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {q.options.map((opt, oi) => {
              const sel = selectedIdx === oi;
              return (
                <button key={oi} onClick={() => choose(oi)} className="press"
                  style={{
                    padding: '20px 12px 18px',
                    borderRadius: 24,
                    border: sel ? '1.5px solid rgba(107,82,220,0.25)' : '1px solid rgba(255,255,255,0.75)',
                    background: sel ? 'rgba(236,229,255,0.90)' : 'rgba(255,255,255,0.88)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 10, cursor: 'pointer',
                    boxShadow: sel ? '0 8px 28px rgba(107,82,220,0.16)' : '0 4px 20px rgba(107,82,220,0.08)',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                  }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: sel ? 'rgba(107,82,220,0.14)' : 'rgba(107,82,220,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s ease',
                  }}>
                    <QuizOptionIcon name={opt.icon} active={sel} />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1240', lineHeight: 1.3, textAlign: 'center' }}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {q.options.map((opt, oi) => {
              const sel = selectedIdx === oi;
              return (
                <button key={oi} onClick={() => choose(oi)} className="press"
                style={{
                  textAlign: 'left', padding: '16px 16px 16px 18px',
                  borderRadius: 28,
                  border: sel ? '1.5px solid rgba(107,82,220,0.25)' : '1px solid rgba(255,255,255,0.75)',
                  background: sel ? 'rgba(236,229,255,0.90)' : 'rgba(255,255,255,0.88)',
                  display: 'flex', alignItems: 'center',
                  gap: 14, cursor: 'pointer',
                  boxShadow: sel ? '0 8px 28px rgba(107,82,220,0.16)' : '0 4px 20px rgba(107,82,220,0.08)',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', flex: '0 0 42px',
                    background: sel ? 'rgba(107,82,220,0.14)' : 'rgba(107,82,220,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s ease',
                  }}>
                    <QuizOptionIcon name={opt.icon} active={sel} />
                  </div>
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#1A1240', lineHeight: 1.5 }}>
                    {opt.label}
                  </span>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flex: '0 0 34px',
                    background: 'linear-gradient(135deg, #9B7FE8 0%, #6B52DC 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(107,82,220,0.40)',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>);

}

// =====================================================
// PLATFORM PICKER — 复用 Quiz 视觉
// =====================================================
function PlatformPicker({ onBack, onDone }) {
  const q = window.QUIZ_QUESTIONS.find((x) => x.dim === 'PLAT');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [typed, setTyped] = useState('最后一步，选个常用平台 ✨');
  const typing = useRef(false);
  const typer = useRef(null);

  const typeOut = (text) => {
    if (typer.current) clearInterval(typer.current);
    setTyped(''); typing.current = true;
    let i = 0;
    typer.current = setInterval(() => {
      i++; setTyped(text.slice(0, i));
      if (i >= text.length) { clearInterval(typer.current); typer.current = null; typing.current = false; }
    }, 36);
  };

  useEffect(() => () => typer.current && clearInterval(typer.current), []);

  const choose = (oi) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(oi);
    typeOut(q.options[oi].feedback);
    setTimeout(() => onDone(q.options[oi].value), 1200);
  };

  return (
    <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}>
      <StatusBar />

      {/* ── 背景装饰 ── */}
      <div style={{
        position: 'absolute', top: -30, right: -55, width: 230, height: 230,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', top: 72, right: 22, zIndex: 0, pointerEvents: 'none' }}>
        <svg width="96" height="38" viewBox="0 0 96 38" fill="none">
          <ellipse cx="48" cy="19" rx="46" ry="17" stroke="rgba(167,139,250,0.22)" strokeWidth="1.5"/>
        </svg>
      </div>
      <FourStar size={13} color="rgba(155,111,232,0.55)"
        style={{ position: 'absolute', top: 118, right: 68, zIndex: 0, pointerEvents: 'none' }} />
      <Dot size={7} color="#FFD93D"
        style={{ position: 'absolute', top: 198, right: 38, pointerEvents: 'none', opacity: 0.75 }} />
      <Sparkle size={10} color="#FFD93D"
        style={{ position: 'absolute', top: 155, right: 30, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />

      {/* ── 顶部导航 ── */}
      <TopNav title="MBTI 创作天赋报告" onBack={onBack} />

      {/* ── 机器人 + 气泡 ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '10px 22px 10px',
        display: 'flex', alignItems: 'center', gap: 16, minHeight: 210,
      }}>
        <div className="float" style={{ flex: '0 0 auto' }}>
          <img
            src={assetPath('assets/问题页ui素材/image 3418.webp')}
            alt="mascot"
            style={{
              width: 150, height: 'auto', objectFit: 'contain',
              filter: 'drop-shadow(0 16px 28px rgba(107,82,220,0.16))',
            }}
          />
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: -9, top: '50%', transform: 'translateY(-50%)',
            width: 0, height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '10px solid rgba(255,255,255,0.94)',
          }} />
          <div style={{
            padding: '14px 20px',
            borderRadius: 22,
            background: 'rgba(255,255,255,0.94)',
            boxShadow: '0 6px 24px rgba(107,82,220,0.10)',
            fontSize: 15.5, fontWeight: 600, color: '#3C3658',
            minHeight: 54,
            display: 'flex', alignItems: 'center', lineHeight: 1.5,
          }}>
            <span className={typing.current ? 'typewriter-cursor' : ''}>{typed}</span>
          </div>
        </div>
      </div>

      {/* ── 题目 + 选项 ── */}
      <div className="fade-up" style={{ padding: '4px 18px 44px', position: 'relative', zIndex: 1 }}>

        {/* 步骤胶囊 */}
        <div style={{
          display: 'inline-block', padding: '5px 16px', borderRadius: 999,
          background: 'linear-gradient(135deg, #9B7FE8 0%, #6B52DC 100%)',
          color: '#fff', fontSize: 13, fontWeight: 800,
          marginBottom: 14,
          boxShadow: '0 3px 12px rgba(107,82,220,0.28)',
        }}>最后一步</div>

        {/* 主标题 */}
        <h2 style={{
          margin: '0 0 10px',
          fontSize: 26, fontWeight: 900,
          color: '#1A1240',
          letterSpacing: '-0.3px', lineHeight: 1.3,
          fontFamily: 'inherit',
        }}>{q.title}</h2>

        {/* 副标题 */}
        <div style={{
          fontSize: 14, color: '#9088B0',
          fontWeight: 500, marginBottom: 28, lineHeight: 1.5,
        }}>{q.sub}</div>

        {/* 选项卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {q.options.map((opt, oi) => {
            const sel = selectedIdx === oi;
            return (
              <button key={oi} onClick={() => choose(oi)} className="press"
                style={{
                  padding: '20px 12px 18px',
                  borderRadius: 24,
                  border: sel ? '1.5px solid rgba(107,82,220,0.25)' : '1px solid rgba(255,255,255,0.75)',
                  background: sel ? 'rgba(236,229,255,0.90)' : 'rgba(255,255,255,0.88)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 10, cursor: 'pointer',
                  boxShadow: sel ? '0 8px 28px rgba(107,82,220,0.16)' : '0 4px 20px rgba(107,82,220,0.08)',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: sel ? 'rgba(107,82,220,0.14)' : 'rgba(107,82,220,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}>
                  <QuizOptionIcon name={opt.icon} active={sel} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1240', lineHeight: 1.3, textAlign: 'center' }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>);

}

Object.assign(window, { Home, MbtiPicker, Quiz, PlatformPicker, AuroraBG, StatusBar, TopNav, ProgressChip, Mascot, Sparkle, FourStar, Heart, Dot, Squiggle, QuizOptionIcon });

export {
  Home,
  MbtiPicker,
  Quiz,
  PlatformPicker,
  AuroraBG,
  StatusBar,
  TopNav,
  ProgressChip,
  Mascot,
  Sparkle,
  FourStar,
  Heart,
  Dot,
  Squiggle,
  QuizOptionIcon,
};
