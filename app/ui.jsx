// ui.jsx — Le Grand UI primitives (dark + gold house style; tokens via CSS vars)

const ICONMAP = {
  fire: IcFire, therm: IcTherm, steam: IcSteam, waves: IcWaves,
  drop: IcDrop, leaf: IcLeaf, spark: IcSpark, gift: IcGift,
  music: IcMusic, flame: IcFlame, bag: IcBag, coffee: IcCoffee, broom: IcBroom
};

// Tinted icon medallion used across cards
function ServiceIcon({ name, size = 46, tone = 'gold' }) {
  const Cmp = ICONMAP[name] || IcSpark;
  const tones = {
    gold:  { bg: 'var(--gold-glow)', fg: 'var(--gold)', ring: '1px solid var(--gold-line)' },
    panel: { bg: 'var(--panel-2)', fg: 'var(--gold)', ring: '1px solid var(--hair)' },
    cream: { bg: 'rgba(243,238,228,0.08)', fg: 'var(--cream)', ring: '1px solid var(--hair)' },
  };
  const t = tones[tone] || tones.gold;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3, flexShrink: 0,
      background: t.bg, color: t.fg, border: t.ring,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Cmp size={size * 0.48} sw={1.6} />
    </div>
  );
}

function Btn({ children, variant = 'primary', size = 'md', full, onClick, style, leftIcon, rightIcon, disabled }) {
  const sizes = {
    sm: { padding: '0 16px', height: 38, fontSize: 13.5 },
    md: { padding: '0 22px', height: 50, fontSize: 15 },
    lg: { padding: '0 26px', height: 56, fontSize: 16 },
  };
  const variants = {
    primary: { background: 'var(--gold-grad)', color: '#1c1505', border: 'none', fontWeight: 700, boxShadow: '0 6px 22px -8px var(--gold-shadow)' },
    dark:    { background: 'var(--panel-3)', color: 'var(--cream)', border: '1px solid var(--hair-strong)' },
    outline: { background: 'transparent', color: 'var(--gold)', border: '1px solid var(--gold-line)' },
    ghost:   { background: 'transparent', color: 'var(--gold)', border: '1px solid transparent' },
    cream:   { background: 'var(--cream)', color: '#1a1813', border: 'none', fontWeight: 700 },
    glass:   { background: 'rgba(255,255,255,0.10)', color: 'var(--cream)', border: '1px solid rgba(255,255,255,0.20)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' },
  };
  return (
    <button className="lg-press" onClick={onClick} disabled={disabled} style={{
      ...sizes[size], ...variants[variant],
      width: full ? '100%' : undefined,
      borderRadius: 'var(--r-pill)', fontFamily: 'var(--font-body)', fontWeight: variants[variant].fontWeight || 600,
      letterSpacing: 0.2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 9, cursor: 'pointer', opacity: disabled ? 0.4 : 1,
      transition: 'transform .12s ease, filter .12s ease', ...style,
    }}>
      {leftIcon}{children}{rightIcon}
    </button>
  );
}

function Tag({ children, tone = 'gold', style }) {
  const tones = {
    gold:  { background: 'var(--gold-glow)', color: 'var(--gold)', boxShadow: 'inset 0 0 0 1px var(--gold-line)' },
    panel: { background: 'var(--panel-3)', color: 'var(--cream-dim)', boxShadow: 'inset 0 0 0 1px var(--hair)' },
    live:  { background: '#ffffff', color: '#56A06D', boxShadow: 'none' },
    glass: { background: 'rgba(255,255,255,0.12)', color: 'var(--cream)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' },
    solid: { background: 'var(--gold)', color: '#1c1505' },
  };
  return (
    <span style={{
      ...tones[tone], display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 11px', borderRadius: 'var(--r-pill)', fontSize: 11.5, fontWeight: 600,
      fontFamily: 'var(--font-body)', letterSpacing: 0.3, lineHeight: 1.2, ...style,
    }}>{children}</span>
  );
}

function LiveDot({ color = '#56A06D' }) {
  return <span className="lg-livedot" style={{ background: color }} />;
}

function SectionHead({ title, action, onAction, eyebrow }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14, gap: 12 }}>
      <div>
        {eyebrow && <div className="lg-eyebrow">{eyebrow}</div>}
        <h2 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 25, letterSpacing: 0.2, color: 'var(--cream)', lineHeight: 1.1 }}>{title}</h2>
      </div>
      {action && (
        <button className="lg-press" onClick={onAction} style={{
          background: 'none', border: 'none', padding: 0, color: 'var(--gold)',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap',
        }}>{action}<IcChevR size={15} /></button>
      )}
    </div>
  );
}

function Stars({ n = 5, size = 13, color = 'var(--gold)' }) {
  return (
    <div style={{ display: 'inline-flex', gap: 1.5, color }}>
      {Array.from({ length: n }).map((_, i) => <IcStar key={i} size={size} />)}
    </div>
  );
}

function Card({ children, style, onClick, pad = 16 }) {
  return (
    <div className={onClick ? 'lg-press lg-card' : 'lg-card'} onClick={onClick} style={{
      background: 'var(--panel)', borderRadius: 'var(--r-lg)', padding: pad,
      border: '1px solid var(--hair)', cursor: onClick ? 'pointer' : undefined, ...style,
    }}>{children}</div>
  );
}

// flag emoji-free language chip
function LangChips({ talen }) {
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {talen.map((l) => (
        <span key={l} style={{
          fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6,
          color: 'var(--cream-dim)', border: '1px solid var(--hair)', borderRadius: 5,
          padding: '2px 6px', lineHeight: 1.3,
        }}>{l}</span>
      ))}
    </div>
  );
}

function TabSpacer() { return <div style={{ height: 108 }} />; }

// Sticky header for drill-down / overlay screens: back chevron + title + optional right slot
function OverlayHeader({ title, onBack, right, topInset = 56 }) {
  return (
    <div className="lg-ovh" style={{ paddingTop: (topInset + 4) }}>
      <button className="lg-press" onClick={onBack} style={{ background: 'var(--panel)', border: '1px solid var(--hair)', borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', cursor: 'pointer', flexShrink: 0 }}>
        <IcChevL size={18} />
      </button>
      <span style={{ flex: 1, fontFamily: 'var(--font-head)', fontSize: 19, fontWeight: 600, color: 'var(--cream)', textAlign: 'center', letterSpacing: 0.2 }}>{title}</span>
      <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{right}</div>
    </div>
  );
}

// Drop-in user-filled photo (image-slot web component). Always give a unique id.
function Photo({ id, style, shape = 'rounded', radius = 16, placeholder = 'Foto', src, fit = 'cover', className }) {
  return React.createElement('image-slot', {
    id, shape, radius: String(radius), placeholder, fit,
    src, className: 'lg-slot ' + (className || ''), style,
  });
}

Object.assign(window, { ServiceIcon, Btn, Tag, LiveDot, SectionHead, Stars, Card, LangChips, TabSpacer, OverlayHeader, Photo, ICONMAP });
