// Report screen + sample modal — bold pink edition

import React, { useState as useStateR, useEffect as useEffectR } from 'react';
import { FourStar, Heart, Mascot, Sparkle, StatusBar, TopNav } from './screens.jsx';

function Report({ mbti, platform, onRestart, onBack }) {
  const mbtiColor = (window.MBTI_COLORS && window.MBTI_COLORS[mbti]) || { bg: '#7B5FE0', accent: '#7B5FE0', label: '#fff' };
  const pos = window.MBTI_POSITIONS[mbti] || window.MBTI_POSITIONS.INFP;
  const preset = window.REPORT_PRESETS && window.REPORT_PRESETS[`${mbti}__${platform}`];
  const directions = preset ? preset.directions : window.directionsFor(mbti);
  const plat = window.PLATFORM_TIPS[platform] || window.PLATFORM_TIPS['小红书'];
  const tmpl = preset ? preset.template : window.NEXT_CONTENT_TEMPLATE(mbti, platform);
  const creatorTag = preset ? preset.creatorType : pos.tag;
  const heroText = preset ? preset.heroSub : pos.hero;
  const conclusion = preset ? preset.conclusion : pos.line;
  const platformTips = preset ? preset.platformTips : plat.tips;

  const [loading, setLoading] = useStateR(true);
  const [progress, setProgress] = useStateR(0);
  const [revealed, setRevealed] = useStateR(0);
  const [toast, setToast] = useStateR(null);

  useEffectR(() => {
    let p = 0;
    const t = setInterval(() => {
      p += 1.2 + Math.random()*1.5;
      if (p >= 100) { p = 100; clearInterval(t); setTimeout(() => setLoading(false), 280); }
      setProgress(p);
    }, 80);
    return () => clearInterval(t);
  }, []);

  useEffectR(() => {
    if (loading) return;
    let i = 0;
    const t = setInterval(() => { i++; setRevealed(i); if (i >= 6) clearInterval(t); }, 260);
    return () => clearInterval(t);
  }, [loading]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1800); };

  if (loading) {
    return (
      <div style={{
        position:'relative', zIndex:2, textAlign:'center', overflow:'hidden',
        minHeight:'100vh',
        background:'linear-gradient(180deg, #FFFFFF 0%, #F3EEFF 45%, #EBE3FF 100%)',
        padding:'0 22px 40px',
      }}>
        <StatusBar />
        {/* 柔和光晕 */}
        <div style={{
          position:'absolute', top:'4%', left:'50%', transform:'translateX(-50%)',
          width:320, height:320, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(155,111,232,0.18) 0%, transparent 68%)',
          pointerEvents:'none',
        }}/>

        {/* 装饰元素：紫/黄/粉，轻量分布 */}
        <FourStar size={16} color="#9B6FE8" style={{position:'absolute', top:88, left:28, opacity:0.75}}/>
        <Sparkle  size={14} color="#FFD93D" style={{position:'absolute', top:72, right:38, opacity:0.9, transform:'rotate(10deg)'}}/>
        <Heart    size={13} color="#FF6BAE" style={{position:'absolute', top:148, right:24, opacity:0.7}}/>
        <FourStar size={9}  color="#9B6FE8" style={{position:'absolute', top:210, left:18, opacity:0.45}}/>
        <Sparkle  size={10} color="#FFD93D" style={{position:'absolute', top:230, right:30, opacity:0.4, transform:'rotate(-15deg)'}}/>

        {/* 机器人：放大居中，无浮动动画 */}
        <div style={{display:'inline-block', position:'relative', zIndex:2}}>
          <Mascot size={192} style={{filter:'drop-shadow(0 22px 36px rgba(107,82,220,0.20))'}}/>
        </div>

        {/* 标题 */}
        <h2 style={{
          margin:'2px 0 7px', lineHeight:1.22,
          fontSize:28, fontWeight:900, letterSpacing:'-0.025em',
          color:'#1A1530',
          fontFamily:'Plus Jakarta Sans, PingFang SC, system-ui',
        }}>
          正在生成<br/>
          你的<span style={{
            background:'linear-gradient(130deg, #7B5FE0 0%, #5B9BF5 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text', display:'inline-block',
          }}>创作画像</span>
        </h2>

        {/* 副标题 */}
        <div style={{fontSize:12.5, color:'#9B91C0', fontWeight:500, letterSpacing:'0.01em'}}>
          结合人格 × 内容习惯 × 审美倾向…
        </div>

        {/* 进度条 + 百分比胶囊 */}
        <div style={{marginTop:28, display:'flex', alignItems:'center', gap:10}}>
          <div style={{
            flex:1, height:7, borderRadius:999,
            background:'rgba(123,95,224,0.12)', overflow:'hidden',
          }}>
            <div style={{
              width: progress + '%', height:'100%',
              background:'linear-gradient(90deg, #7B5FE0 0%, #A78BF7 100%)',
              borderRadius:999, transition:'width 0.18s linear',
              boxShadow:'0 0 10px rgba(123,95,224,0.38)',
            }}/>
          </div>
          <div style={{
            padding:'5px 11px', borderRadius:999,
            background:'#fff', color:'#7B5FE0',
            fontWeight:800, fontSize:12.5, letterSpacing:'0.03em',
            boxShadow:'0 2px 10px rgba(123,95,224,0.16)',
            flex:'0 0 auto',
          }}>
            {Math.floor(progress)}%
          </div>
        </div>

        {/* 任务卡片 */}
        <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:10, textAlign:'left'}}>
          <SkeletonLine progress={progress} delay={0}  text="解析能量来源 & 注意力焦点" />
          <SkeletonLine progress={progress} delay={20} text="生成定位标签 & 核心优势" />
          <SkeletonLine progress={progress} delay={45} text={`为「${platform}」生成发布建议`} />
          <SkeletonLine progress={progress} delay={70} text="撰写你的下一条内容模板" />
        </div>
      </div>
    );
  }

  return (
    <div style={{position:'relative', zIndex:2, '--pink': mbtiColor.accent, '--pink-deep': mbtiColor.accent, '--pink-soft': mbtiColor.bg, '--pink-faint': mbtiColor.bg + 'aa', background:'linear-gradient(180deg, #FFFFFF 0%, #F5F2FF 100%)', minHeight:'100vh'}}>
      <StatusBar />
      <TopNav title="创作人格报告" onBack={onBack}
        right={
          <button onClick={() => showToast('已生成分享图 ✨')} className="press" style={{
            width:36, height:36, borderRadius:'50%', border:'1px solid var(--border)',
            background:'rgba(255,255,255,0.95)',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M16 6l-4-4-4 4M12 2v14" stroke="#2A0A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        }
      />

      <div style={{padding:'4px 18px 100px'}}>

        {/* 大卡片：头部 MBTI 与报告内容共用一张卡片 */}
        {revealed >= 1 && (
          <section className="markdown-chat fade-up" style={{borderRadius:20}}>
          {/* HERO */}
          <div style={{
            position:'relative', overflow:'hidden',
            padding:'24px 20px 20px',
            background: `linear-gradient(145deg, ${mbtiColor.bg} 0%, #ffffff 72%)`,
            minHeight: 210,
          }}>
            <FourStar size={20} color={mbtiColor.accent} style={{position:'absolute', top:18, right:18, transform:'rotate(15deg)', opacity:0.5}}/>
            <Sparkle size={14} color={mbtiColor.accent} style={{position:'absolute', top:46, right:48, transform:'rotate(-15deg)', opacity:0.4}}/>
            <Heart size={12} color={mbtiColor.accent} style={{position:'absolute', top:172, left:136, opacity:0.25}}/>

            <div style={{position:'relative', zIndex:2, maxWidth:195}}>
              <div style={{fontSize:10.5, fontWeight:800, color:mbtiColor.accent, letterSpacing:'0.18em', textTransform:'uppercase'}}>
                ✦ Your creator persona
              </div>
              <h1 style={{margin:'4px 0 0', fontSize:19, fontWeight:900, color:mbtiColor.label, letterSpacing:'-0.02em', lineHeight:1.15}}>
                {preset ? '你的内容主场' : '你的创作人格'}
              </h1>
              <div style={{
                fontSize:64, fontWeight:900, letterSpacing:'0.04em',
                color:mbtiColor.label, lineHeight:0.92, marginTop:4, marginBottom:8,
                fontFamily:'-apple-system, SF Pro Display, system-ui',
              }}>{mbti}</div>
              <div style={{fontSize:13, color:mbtiColor.label, fontWeight:600, marginTop:6, marginBottom:14, lineHeight:1.5, opacity:0.85}}>
                {heroText}
              </div>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:6,
                padding:'7px 14px', borderRadius:999,
                background:mbtiColor.accent, color:'#fff',
                fontWeight:800, fontSize:12, letterSpacing:'0.02em',
              }}>
                <Sparkle size={11} color="rgba(255,255,255,0.85)"/>
                定位 · {creatorTag}
              </div>
            </div>
            <div style={{position:'absolute', right:-10, bottom:-8, zIndex:3}}>
              <Mascot size={172} mbti={mbti} style={{filter:`drop-shadow(0 12px 26px ${mbtiColor.accent}38)`}} />
            </div>
          </div>

          {revealed >= 2 && (
            <MarkdownReport
              mbti={mbti}
              platform={platform}
              creatorTag={creatorTag}
              conclusion={conclusion}
              preset={preset}
              pos={pos}
              directions={directions}
              platformTips={platformTips}
              tmpl={tmpl}
              onRestart={onRestart}
              onShare={() => showToast('已生成分享图 ✨')}
            />
          )}
          </section>
        )}
      </div>

      {toast && (
        <div style={{
          position:'absolute', left:'50%', bottom:60, transform:'translateX(-50%)',
          padding:'10px 18px', borderRadius:999, background:'var(--ink)',
          color:'#FFD93D', fontSize:13, fontWeight:800, zIndex:30,
        }} className="scale-in">{toast}</div>
      )}
    </div>
  );
}

function Row({ label, v }) {
  return (
    <div style={{marginTop:4, display:'flex', gap:6}}>
      <span style={{color:'var(--ink-mute)', flex:'0 0 auto', fontWeight:700}}>{label} ·</span>
      <span style={{flex:1}}>{v}</span>
    </div>
  );
}

function MarkdownReport({ mbti, platform, creatorTag, conclusion, preset, pos, directions, platformTips, tmpl, onRestart, onShare }) {
  const copy = buildMarkdownCopy({ mbti, platform, creatorTag, conclusion, preset, pos, directions, platformTips, tmpl });

  return (
    <>
      <article className="md-body fade-up">
        <h2>{copy.title}</h2>
        <p>{copy.opening}</p>
        <blockquote>{copy.quote}</blockquote>

        <h3>为什么你适合这个定位</h3>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {copy.reasons.map((item) => {
            return (
              <div key={item.title} style={{
                display:'flex', alignItems:'center', gap:12,
                padding:'12px 14px', borderRadius:14,
                background:'var(--white)',
                border:'1px solid rgba(26,21,48,0.06)',
                boxShadow:'0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  width:38, height:38, borderRadius:'50%', flex:'0 0 auto',
                  background: 'var(--pink-faint)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" stroke="var(--pink)" strokeWidth="2"/>
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14, fontWeight:800, color:'var(--ink)', marginBottom:2}}>{item.title}</div>
                  <div style={{fontSize:12.5, color:'var(--ink-3)', lineHeight:1.55, fontWeight:500}}>{item.text}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{flex:'0 0 auto', opacity:0.25}}>
                  <path d="M9 6l6 6-6 6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            );
          })}
        </div>

        <h3>内容方向建议</h3>
        <div className="md-cards">
          {copy.directions.map((item) => (
            <div className="md-card" key={item.key}>
              <div className="md-card-title">{item.key}</div>
              <p>{item.core}</p>
              <small>{item.tips}</small>
            </div>
          ))}
        </div>

        <h3>{platform} 发布策略</h3>
        <ol>
          {copy.platformPlan.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ol>

        <h3>下一条内容可以这样写</h3>
        <div className="md-code">
          <div>{copy.scriptTitle}</div>
          {copy.scriptParts.map((item) => (
            <p key={item.tag}><strong>{item.tag}</strong>{item.value}</p>
          ))}
        </div>

        <p className="md-note">{copy.note}</p>
      </article>

      <div className="md-actions">
        <button onClick={onRestart} className="btn-soft press">重新测试</button>
        <button onClick={onShare} className="btn-pink press">保存 / 分享</button>
      </div>
    </>
  );
}

function buildMarkdownCopy({ mbti, platform, creatorTag, conclusion, preset, pos, directions, platformTips, tmpl }) {
  const letters = mbti.split('');
  const [ei, ns, tf, jp] = letters;
  const primaryStrengths = (preset ? preset.strengths.map((s) => s.title) : pos.strengths).slice(0, 3);
  const readableStrengths = primaryStrengths.join('、');
  const platformCopy = platformPlaybook(platform);

  const reasons = [
    {
      title: dimensionReason(ei).title,
      text: dimensionReason(ei).text,
    },
    {
      title: dimensionReason(ns).title,
      text: dimensionReason(ns).text,
    },
    {
      title: dimensionReason(tf).title,
      text: dimensionReason(tf).text,
    },
    {
      title: dimensionReason(jp).title,
      text: dimensionReason(jp).text,
    },
  ];

  const directionList = directions.slice(0, 3).map((item, index) => ({
    key: `${index + 1}. ${item.key}`,
    core: item.core,
    tips: item.tips,
  }));

  const planFromData = platformTips.slice(0, 2).map(([title, text]) => ({ title, text }));
  const platformPlan = [
    ...platformCopy.plan,
    ...planFromData,
  ].slice(0, 4);

  return {
    title: `${mbti} 的内容定位：${creatorTag}`,
    opening: preset?.heroTitle || `你的优势不是“什么都拍”，而是把 ${readableStrengths} 变成稳定的内容辨识度。${conclusion}`,
    quote: `更准确的定位是：你不是在经营一个泛泛的生活账号，而是在用 ${mbti} 的观察方式，持续输出一种可被记住的内容气质。`,
    reasons,
    directions: directionList,
    platformPlan,
    scriptTitle: tmpl.title || platformCopy.scriptTitle,
    scriptParts: (tmpl.parts || platformCopy.scriptParts).map((item) => ({
      tag: `${item.tag}：`,
      value: item.value,
    })),
    note: platformCopy.note,
  };
}

function dimensionReason(letter) {
  const map = {
    I: { title: '低干扰表达', text: '你不需要靠夸张表演获得注意力，更适合用旁白、画面和细节慢慢建立信任。' },
    E: { title: '现场能量强', text: '你的内容适合保留互动感和临场感，观众会更容易被你的状态带进去。' },
    N: { title: '主题感优先', text: '你不是只拍“发生了什么”，而是会自然提炼出一个情绪、观点或隐喻。' },
    S: { title: '细节可信度高', text: '你适合把步骤、对比、参数、前后变化讲清楚，让内容更像可复用的方法。' },
    T: { title: '判断逻辑清楚', text: '你擅长解释“为什么这样选”，适合做测评、拆解、避坑和决策型内容。' },
    F: { title: '情绪识别敏锐', text: '你能捕捉到观众说不出口的感受，适合做共鸣型文案和氛围叙事。' },
    J: { title: '栏目化能力强', text: '你适合把内容做成固定系列，例如每周一个主题、固定封面和固定结尾。' },
    P: { title: '灵感捕捉快', text: '你更适合轻量更新，把即时看到的画面、句子和小发现快速发布。' },
  };
  return map[letter] || { title: '内容辨识度', text: '你的内容适合从个人观察出发，形成稳定且容易被记住的表达方式。' };
}

function platformPlaybook(platform) {
  const map = {
    '小红书': {
      plan: [
        { title: '封面先给结果', text: '首图不要只放氛围照，建议加一句具体承诺，例如“3 个动作让周末照片更像电影截图”。' },
        { title: '正文做成可收藏结构', text: '用“观察 - 方法 - 示例”三段式，减少空泛鸡汤，让用户看完知道下一步怎么做。' },
      ],
      scriptTitle: '下一篇小红书图文：把一个普通周末拍出人格感',
      note: '建议先做 7 天轻量测试：每天只发一个小观察，比一次性憋大稿更容易找到真实反馈。',
    },
    '抖音': {
      plan: [
        { title: '前 2 秒给冲突', text: '开头直接抛出反差：“为什么你拍得很认真，但别人看起来像随手一拍？”' },
        { title: '镜头节奏更短', text: '每 2-3 秒换一个信息点，保留字幕钩子，不要让观众等你进入主题。' },
      ],
      scriptTitle: '下一条短视频：为什么你的照片没有记忆点',
      note: '抖音优先测试开头，不要先追求完整报告感；一个强钩子比三段完整解释更重要。',
    },
    '朋友圈': {
      plan: [
        { title: '像发给熟人一样写', text: '朋友圈不需要强标题党，适合用“今天突然发现...”这种低压力开场。' },
        { title: '保留真实生活痕迹', text: '不要修得太满，留一点环境、人声或小瑕疵，反而更像你本人。' },
      ],
      scriptTitle: '下一条朋友圈：今天让我停下来的一帧',
      note: '朋友圈的价值不是涨粉，而是让别人更准确地记住你的生活审美。',
    },
    'B站': {
      plan: [
        { title: '做成系列入口', text: 'B站更吃结构，建议把单条内容变成“人格拍摄实验”系列的第一集。' },
        { title: '给观众一个完整推演', text: '可以慢一点，但每一段都要有信息推进：问题、观察、尝试、复盘。' },
      ],
      scriptTitle: '下一支 B站视频：用 MBTI 设计一套个人影像风格',
      note: 'B站观众愿意停留，但前提是你真的在推进一个问题，而不是只堆氛围素材。',
    },
  };

  return map[platform] || map['小红书'];
}

function SkeletonLine({ progress, delay, text }) {
  const done   = progress > delay + 15;
  const active = progress > delay && !done;
  const pending = !done && !active;
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:12,
      padding:'14px 16px', borderRadius:22,
      background: active ? 'rgba(123,95,224,0.05)' : '#fff',
      border: active
        ? '1.5px solid rgba(123,95,224,0.28)'
        : '1.5px solid rgba(123,95,224,0.07)',
      boxShadow:'0 2px 12px rgba(107,82,220,0.06)',
      transition:'all 0.4s ease',
    }}>
      {/* 状态图标 */}
      <div style={{
        width:26, height:26, borderRadius:'50%', flex:'0 0 auto',
        background: done
          ? 'linear-gradient(135deg, #7B5FE0 0%, #9B6FE8 100%)'
          : 'transparent',
        border: done ? 'none'
          : active ? '2.5px solid transparent'
          : '2px solid rgba(123,95,224,0.18)',
        borderTopColor: active ? '#7B5FE0' : undefined,
        borderRightColor: active ? 'rgba(123,95,224,0.3)' : undefined,
        borderBottomColor: active ? 'rgba(123,95,224,0.3)' : undefined,
        borderLeftColor: active ? 'rgba(123,95,224,0.3)' : undefined,
        animation: active ? 'spinSlow 0.9s linear infinite' : 'none',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow: done ? '0 2px 8px rgba(123,95,224,0.32)' : 'none',
        transition:'all 0.3s ease',
      }}>
        {done && (
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      {/* 文字 */}
      <div style={{
        fontSize:13.5, fontWeight:600,
        color: pending ? 'rgba(123,95,224,0.32)' : '#2D2050',
        transition:'color 0.4s ease',
      }}>{text}</div>
    </div>
  );
}

function Module({ title, badge, badgeColor, darkBadgeText, children }) {
  return (
    <div className="fade-up" style={{
      padding:'16px 16px', borderRadius:18,
      background:'var(--white)',
      border:'2px solid var(--ink)',
      boxShadow:'3px 4px 0 var(--ink)',
    }}>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:12}}>
        {badge && (
          <span style={{
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            minWidth:28, height:24, padding:'0 8px', borderRadius:8,
            background: badgeColor || 'var(--pink)',
            color: darkBadgeText ? 'var(--ink)' : '#fff',
            fontWeight:900, fontSize:11, letterSpacing:'0.04em',
          }}>{badge}</span>
        )}
        <h3 className="display-cn" style={{margin:0, fontSize:16, color:'var(--ink)'}}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// =====================================================
// SAMPLE REPORT MODAL (INTJ + 小红书)
// =====================================================
function SampleSheet({ open, onClose }) {
  const [closing, setClosing] = useStateR(false);
  const [toast, setToast] = useStateR(null);
  if (!open && !closing) return null;
  const close = () => { setClosing(true); setTimeout(() => { setClosing(false); onClose(); }, 280); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1800); };

  const mbti = 'INTJ';
  const platform = '小红书';
  const mbtiColor = (window.MBTI_COLORS && window.MBTI_COLORS[mbti]) || { bg: '#7B5FE0', accent: '#7B5FE0', label: '#fff' };
  const pos = window.MBTI_POSITIONS[mbti] || window.MBTI_POSITIONS.INFP;
  const preset = window.REPORT_PRESETS && window.REPORT_PRESETS[`${mbti}__${platform}`];
  const directions = preset ? preset.directions : window.directionsFor(mbti);
  const plat = window.PLATFORM_TIPS[platform] || window.PLATFORM_TIPS['小红书'];
  const tmpl = preset ? preset.template : window.NEXT_CONTENT_TEMPLATE(mbti, platform);
  const creatorTag = preset ? preset.creatorType : pos.tag;
  const heroText = preset ? preset.heroSub : pos.hero;
  const conclusion = preset ? preset.conclusion : pos.line;
  const platformTips = preset ? preset.platformTips : plat.tips;

  return (
    <div style={{
      position:'absolute', inset:0, zIndex:50,
      display:'flex', alignItems:'flex-end',
      background: closing ? 'rgba(0,0,0,0)' : 'rgba(42, 10, 31, 0.55)',
      transition:'background 0.28s ease',
      backdropFilter:'blur(2px)',
    }} onClick={close}>
      <div onClick={(e) => e.stopPropagation()} className={closing ? '' : 'sheet-enter'}
        style={{
          width:'100%', maxHeight:'90%', overflow:'auto',
          background:'linear-gradient(180deg, #FFFFFF 0%, #F5F2FF 100%)',
          borderRadius:'24px 24px 0 0', position:'relative',
          borderTop:'1px solid rgba(26,21,48,0.08)',
          '--pink': mbtiColor.accent,
          '--pink-deep': mbtiColor.accent,
          '--pink-soft': mbtiColor.bg,
          '--pink-faint': mbtiColor.bg + 'aa',
        }}>
        <div style={{display:'flex', justifyContent:'center', paddingTop:10}}>
          <div style={{width:42, height:4, borderRadius:999, background:'rgba(42,10,31,0.2)'}}/>
        </div>
        <button onClick={close} className="press" style={{
          position:'absolute', top:14, right:14, zIndex:5,
          width:30, height:30, borderRadius:'50%', border:'none',
          background:'var(--ink)', color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6l-12 12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
        </button>

        <div style={{padding:'18px 18px 80px', position:'relative'}}>
          <section className="markdown-chat" style={{borderRadius:20}}>
            <div style={{
              position:'relative', overflow:'hidden',
              padding:'24px 20px 20px',
              background: `linear-gradient(145deg, ${mbtiColor.bg} 0%, #ffffff 72%)`,
              minHeight: 210,
            }}>
              <FourStar size={20} color={mbtiColor.accent} style={{position:'absolute', top:18, right:18, transform:'rotate(15deg)', opacity:0.5}}/>
              <Sparkle size={14} color={mbtiColor.accent} style={{position:'absolute', top:46, right:48, transform:'rotate(-15deg)', opacity:0.4}}/>
              <Heart size={12} color={mbtiColor.accent} style={{position:'absolute', top:172, left:136, opacity:0.25}}/>

              <div style={{position:'relative', zIndex:2, maxWidth:195}}>
                <div style={{fontSize:10.5, fontWeight:800, color:mbtiColor.accent, letterSpacing:'0.18em', textTransform:'uppercase'}}>
                  ✦ Your creator persona
                </div>
                <h1 style={{margin:'4px 0 0', fontSize:19, fontWeight:900, color:mbtiColor.label, letterSpacing:'-0.02em', lineHeight:1.15}}>
                  {preset ? '你的内容主场' : '你的创作人格'}
                </h1>
                <div style={{
                  fontSize:64, fontWeight:900, letterSpacing:'0.04em',
                  color:mbtiColor.label, lineHeight:0.92, marginTop:4, marginBottom:8,
                  fontFamily:'-apple-system, SF Pro Display, system-ui',
                }}>{mbti}</div>
                <div style={{fontSize:13, color:mbtiColor.label, fontWeight:600, marginTop:6, marginBottom:14, lineHeight:1.5, opacity:0.85}}>
                  {heroText}
                </div>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  padding:'7px 14px', borderRadius:999,
                  background:mbtiColor.accent, color:'#fff',
                  fontWeight:800, fontSize:12, letterSpacing:'0.02em',
                }}>
                  <Sparkle size={11} color="rgba(255,255,255,0.85)"/>
                  定位 · {creatorTag}
                </div>
              </div>
              <div style={{position:'absolute', right:-10, bottom:-8, zIndex:3}}>
                <Mascot size={172} mbti={mbti} style={{filter:`drop-shadow(0 12px 26px ${mbtiColor.accent}38)`}} />
              </div>
            </div>

            <MarkdownReport
              mbti={mbti}
              platform={platform}
              creatorTag={creatorTag}
              conclusion={conclusion}
              preset={preset}
              pos={pos}
              directions={directions}
              platformTips={platformTips}
              tmpl={tmpl}
              onRestart={close}
              onShare={() => showToast('已生成分享图 ✨')}
            />
          </section>

          <div style={{
            marginTop:12, padding:'10px 12px', borderRadius:12, background:'rgba(26,21,48,0.05)',
            textAlign:'center', fontSize:11.5, color:'var(--ink-3)', fontWeight:700,
          }}>
            这是示例报告 · 你的报告会根据 MBTI 和平台实时生成
          </div>
        </div>

        {toast && (
          <div style={{
            position:'absolute', left:'50%', bottom:22, transform:'translateX(-50%)',
            padding:'10px 18px', borderRadius:999, background:'var(--ink)',
            color:'#FFD93D', fontSize:13, fontWeight:800, zIndex:30,
          }} className="scale-in">{toast}</div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Report, SampleSheet, Module });

export { Report, SampleSheet, Module };
